import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import PasswordStrengthMeter from './PasswordStrengthMeter';
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
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');

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

    try {
      const result = await registerUser(data.email, data.password, data.username);
      setUserEmail(data.email);
      setSuccess(true);
      
      // Store email verification pending flag
      localStorage.setItem('emailVerificationPending', 'true');
      localStorage.setItem('emailVerificationEmail', data.email);
    } catch (error) {
      let errorMessage = 'Erro ao criar conta';
      
      if (error.message?.includes('already registered')) {
        errorMessage = 'Este email já está cadastrado';
      } else if (error.message?.includes('Username already exists')) {
        errorMessage = 'Este username já está em uso';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-redirect after success
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

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

