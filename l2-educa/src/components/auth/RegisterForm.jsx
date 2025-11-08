import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { isEmailVerificationRequired } from '../../config/emailVerification';
import './AuthForms.css';

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username deve ter no mínimo 3 caracteres')
    .max(30, 'Username deve ter no máximo 30 caracteres')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username deve conter apenas letras, números, _ e -'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  password: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Senha deve conter pelo menos um caractere especial'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

const RegisterForm = () => {
  const { register: registerUser, login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [requiresVerification, setRequiresVerification] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    setApiError(null);
    setIsLoading(true);

    // Safety timeout - prevent infinite hang
    const safetyTimeout = setTimeout(() => {
      console.error('Registration timeout - resetting form');
      setIsLoading(false);
      setApiError('Tempo de resposta excedido. Por favor, tente novamente.');
    }, 30000);

    try {
      // Register with timeout protection
      const registerPromise = registerUser(data.email, data.password, data.username);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Registration timeout')), 20000)
      );
      
      const result = await Promise.race([registerPromise, timeoutPromise]);
      
      clearTimeout(safetyTimeout);
      setUserEmail(data.email);
      
      // Check if email verification is required
      const verificationRequired = isEmailVerificationRequired();
      setRequiresVerification(verificationRequired);
      
      if (verificationRequired) {
        // Store email verification pending flag
        localStorage.setItem('emailVerificationPending', 'true');
        localStorage.setItem('emailVerificationEmail', data.email);
        setSuccess(true); // Show verification screen
      } else {
        // Auto-login the user with timeout protection
        try {
          const loginPromise = login(data.email, data.password);
          const loginTimeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Login timeout')), 10000)
          );
          
          await Promise.race([loginPromise, loginTimeoutPromise]);
          
          // Navigate to home immediately
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 300);
        } catch (loginError) {
          console.error('Auto-login error:', loginError);
          // If auto-login fails, show success screen and redirect to login
          setSuccess(true);
        }
      }
    } catch (error) {
      clearTimeout(safetyTimeout);
      console.error('Registration error:', error);
      
      let errorMessage = 'Erro ao criar conta';
      
      if (error.message === 'Registration timeout' || error.message === 'Login timeout') {
        errorMessage = 'Tempo de resposta excedido. Por favor, tente novamente.';
      } else if (error.message?.includes('already registered')) {
        errorMessage = 'Este email já está cadastrado';
      } else if (error.message?.includes('Username already exists')) {
        errorMessage = 'Este username já está em uso';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setApiError(errorMessage);
    } finally {
      clearTimeout(safetyTimeout);
      setIsLoading(false);
    }
  };

  // Auto-redirect after success (only if verification is required)
  useEffect(() => {
    if (success && requiresVerification) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 5000);
      
      return () => clearTimeout(timer);
    } else if (success && !requiresVerification) {
      // If no verification required, redirect immediately to login
      const timer = setTimeout(() => {
        navigate('/login');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [success, requiresVerification, navigate]);

  if (success) {
    return (
      <div className="auth-form-container">
        <div className="success-modal">
          <div className="success-modal-icon">
            <span className="material-icons">check_circle</span>
          </div>
          
          <h2 className="success-modal-title">Conta criada com sucesso!</h2>
          
          <p className="success-modal-message">
            Enviamos um email de verificação para:
          </p>
          <p className="success-modal-email">{userEmail}</p>
          
          <div className="success-modal-instructions">
            <div className="instruction-item">
              <span className="material-icons">mail</span>
              <span>Verifique sua caixa de entrada</span>
            </div>
            <div className="instruction-item">
              <span className="material-icons">link</span>
              <span>Clique no link de verificação</span>
            </div>
            <div className="instruction-item">
              <span className="material-icons">login</span>
              <span>Faça login após verificar</span>
            </div>
          </div>
          
          <p className="success-modal-redirect">
            Redirecionando para login em 5 segundos...
          </p>
          
          <button
            onClick={() => navigate('/login')}
            className="btn-go-to-login"
          >
            Ir para Login Agora
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-form-container">
      <div className="auth-form-header">
        <h2 className="auth-form-title">Criar conta</h2>
        <p className="auth-form-subtitle">
          Cadastre-se para ter acesso completo
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register('username')}
            disabled={isLoading}
            className={`form-input ${errors.username ? 'form-input-error' : ''}`}
            placeholder="seu_username"
          />
          {errors.username && (
            <span className="form-error">{errors.username.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            disabled={isLoading}
            className={`form-input ${errors.email ? 'form-input-error' : ''}`}
            placeholder="seu@email.com"
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
            disabled={isLoading}
            className={`form-input ${errors.password ? 'form-input-error' : ''}`}
            placeholder="••••••••"
            autoComplete="new-password"
          />
          {errors.password && (
            <span className="form-error">{errors.password.message}</span>
          )}
          
          {/* Password Strength Meter */}
          <PasswordStrengthMeter password={password} />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirmar Senha
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            disabled={isLoading}
            className={`form-input ${errors.confirmPassword ? 'form-input-error' : ''}`}
            placeholder="••••••••"
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <span className="form-error">{errors.confirmPassword.message}</span>
          )}
        </div>

        {apiError && <div className="api-error">{apiError}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? (
            <span className="button-loading">
              <span className="spinner"></span>
              Criando conta...
            </span>
          ) : (
            'Criar conta'
          )}
        </button>

        <div className="form-footer">
          <p className="footer-text">
            Já tem uma conta?{' '}
            <Link to="/login" className="link-text">
              Entrar
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;

