import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { checkRateLimit, recordFailedAttempt } from '../../utils/securityUtils';
import './AuthForms.css';

const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimit, setRateLimit] = useState({ allowed: true, minutesLeft: 0 });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const email = watch('email');

  // Check rate limit when email changes
  useEffect(() => {
    if (email) {
      const limit = checkRateLimit(email);
      setRateLimit(limit);
    }
  }, [email]);

  const onSubmit = async (data) => {
    // Check rate limit
    const limit = checkRateLimit(data.email);
    if (!limit.allowed) {
      setApiError(`Muitas tentativas. Aguarde ${limit.minutesLeft} minutos.`);
      return;
    }

    setApiError(null);
    setIsLoading(true);

    try {
      console.log('🔐 Attempting login...');
      const result = await login(data.email, data.password);
      console.log('✅ Login successful:', result);
      
      // Check if email is verified
      if (!result.emailVerified) {
        console.log('⚠️ Email not verified');
        setApiError('Por favor, verifique seu email antes de fazer login. Verifique sua caixa de entrada.');
        
        // Store email for verification notice
        localStorage.setItem('emailVerificationPending', 'true');
        localStorage.setItem('emailVerificationEmail', data.email);
        
        setIsLoading(false);
        return; // Don't proceed with login
      }
      
      // Email is verified, clear any pending flags
      localStorage.removeItem('emailVerificationPending');
      localStorage.removeItem('emailVerificationEmail');
      
      // Wait a bit to ensure auth state is updated
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Redirect to intended page or home
      const from = location.state?.from?.pathname || '/';
      console.log('🚀 Redirecting to:', from);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('❌ Login error:', error);
      
      // Record failed attempt
      recordFailedAttempt(data.email);
      
      // Handle EMAIL_NOT_CONFIRMED specially
      if (error.message === 'EMAIL_NOT_CONFIRMED') {
        setApiError('Por favor, verifique seu email antes de fazer login. Verifique sua caixa de entrada.');
        localStorage.setItem('emailVerificationPending', 'true');
        localStorage.setItem('emailVerificationEmail', data.email);
      } else {
        const errorMessage = 
          error.message === 'Email ou senha incorretos'
            ? error.message
            : error.message?.includes('conexão')
            ? error.message
            : error.message || 'Erro ao fazer login';
        
        setApiError(errorMessage);
      }
      
      // Update rate limit
      const newLimit = checkRateLimit(data.email);
      setRateLimit(newLimit);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-header">
        <h2 className="auth-form-title">Bem-vindo de volta</h2>
        <p className="auth-form-subtitle">
          Entre com sua conta para continuar
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        {!rateLimit.allowed && (
          <div className="rate-limit-warning">
            🔒 Muitas tentativas de login. Aguarde {rateLimit.minutesLeft} minuto(s) antes de tentar novamente.
          </div>
        )}

        {rateLimit.allowed && rateLimit.remainingAttempts <= 2 && rateLimit.remainingAttempts > 0 && (
          <div className="rate-limit-info">
            ⚠️ {rateLimit.remainingAttempts} tentativa(s) restante(s)
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            disabled={isLoading || !rateLimit.allowed}
            className={`form-input ${errors.email ? 'form-input-error' : ''}`}
            placeholder="seu@email.com"
            autoComplete="email"
          />
          {errors.email && (
            <span className="form-error">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            disabled={isLoading || !rateLimit.allowed}
            className={`form-input ${errors.password ? 'form-input-error' : ''}`}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          {errors.password && (
            <span className="form-error">{errors.password.message}</span>
          )}
        </div>

        <div className="form-footer-link">
          <Link to="/forgot-password" className="link-text">
            Esqueceu sua senha?
          </Link>
        </div>

        {apiError && <div className="api-error">{apiError}</div>}

        <button
          type="submit"
          disabled={isLoading || !rateLimit.allowed}
          className="submit-button"
        >
          {isLoading ? (
            <span className="button-loading">
              <span className="spinner"></span>
              Entrando...
            </span>
          ) : (
            'Entrar'
          )}
        </button>

        <div className="form-footer">
          <p className="footer-text">
            Não tem uma conta?{' '}
            <Link to="/register" className="link-text">
              Cadastre-se
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

