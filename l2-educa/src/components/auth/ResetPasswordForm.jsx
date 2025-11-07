import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthForms.css';

const resetPasswordSchema = z.object({
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

const ResetPasswordForm = () => {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    setApiError(null);
    setIsLoading(true);

    try {
      await updatePassword(data.password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setApiError(error.message || 'Erro ao redefinir senha');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-form-container">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Senha redefinida!</h2>
          <p>Sua senha foi alterada com sucesso. Redirecionando para o login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-form-container">
      <div className="auth-form-header">
        <h2 className="auth-form-title">Nova senha</h2>
        <p className="auth-form-subtitle">
          Digite sua nova senha
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Nova Senha
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            disabled={isLoading}
            className={`form-input ${errors.password ? 'form-input-error' : ''}`}
            placeholder="••••••••"
          />
          {errors.password && (
            <span className="form-error">{errors.password.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirmar Nova Senha
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            disabled={isLoading}
            className={`form-input ${errors.confirmPassword ? 'form-input-error' : ''}`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <span className="form-error">{errors.confirmPassword.message}</span>
          )}
        </div>

        {apiError && <div className="api-error">{apiError}</div>}

        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? (
            <span className="button-loading">
              <span className="spinner"></span>
              Redefinindo...
            </span>
          ) : (
            'Redefinir senha'
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;

