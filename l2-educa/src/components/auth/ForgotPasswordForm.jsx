import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './AuthForms.css';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
});

const ForgotPasswordForm = () => {
  const { resetPassword } = useAuth();
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    setApiError(null);
    setIsLoading(true);

    try {
      await resetPassword(data.email);
      setSuccess(true);
    } catch (error) {
      setApiError(error.message || 'Erro ao solicitar recuperação de senha');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-form-container">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Email enviado!</h2>
          <p>
            Se o email existir em nossa base, você receberá instruções para
            redefinir sua senha.
          </p>
          <Link to="/login" className="link-button">
            Voltar para o login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-form-container">
      <div className="auth-form-header">
        <h2 className="auth-form-title">Recuperar senha</h2>
        <p className="auth-form-subtitle">
          Digite seu email para receber um link de recuperação
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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

        {apiError && <div className="api-error">{apiError}</div>}

        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? (
            <span className="button-loading">
              <span className="spinner"></span>
              Enviando...
            </span>
          ) : (
            'Enviar link de recuperação'
          )}
        </button>

        <div className="form-footer">
          <p className="footer-text">
            Lembrou sua senha?{' '}
            <Link to="/login" className="link-text">
              Voltar para o login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;

