import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import './EmailVerificationBanner.css';

const EmailVerificationBanner = () => {
  const { user, session, resendVerificationEmail, loading } = useAuth();
  const { success, error } = useNotification();
  
  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  // Hooks must be called before any conditional returns
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Don't show while loading or if no user
  if (loading || !user || !session) return null;

  // Check if email is not confirmed
  const isEmailUnverified = session.user && !session.user.email_confirmed_at;

  const handleResendEmail = async () => {
    if (countdown > 0 || isResending) return;

    setIsResending(true);
    try {
      await resendVerificationEmail();
      success('Email de verificação enviado! Verifique sua caixa de entrada.');
      setCountdown(60); // 60 seconds cooldown
    } catch (err) {
      error('Erro ao enviar email. Tente novamente mais tarde.');
    } finally {
      setIsResending(false);
    }
  };

  if (!isEmailUnverified) return null;

  return (
    <div className="email-verification-banner">
      <div className="banner-content">
        <div className="banner-icon">⚠</div>
        <div className="banner-text">
          <strong>Verifique seu email</strong>
          <span>Para ter acesso completo, confirme seu endereço de email.</span>
        </div>
        <button
          className="resend-button"
          onClick={handleResendEmail}
          disabled={countdown > 0 || isResending}
        >
          {isResending ? 'Enviando...' : countdown > 0 ? `Aguarde ${countdown}s` : 'Reenviar email'}
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationBanner;


