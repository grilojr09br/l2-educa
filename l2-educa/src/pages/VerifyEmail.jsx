import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';
import AuroraBackground from '../components/AuroraBackground';
import GlassCard from '../components/GlassCard';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const { user, logout, resendVerificationEmail } = useAuth();
  const navigate = useNavigate();
  const { success, error } = useNotification();
  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (countdown > 0 || isResending) return;

    setIsResending(true);
    try {
      await resendVerificationEmail();
      success('Email de verificação enviado com sucesso!');
      setCountdown(60); // 60 seconds cooldown
    } catch (err) {
      error('Erro ao enviar email. Tente novamente mais tarde.');
    } finally {
      setIsResending(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      error('Erro ao fazer logout.');
    }
  };

  return (
    <div className="verify-email-page">
      <AuroraBackground />
      
      <div className="verify-email-content">
        <GlassCard>
          <div className="verify-email-icon">📧</div>
          
          <h1 className="verify-email-title">Verifique seu email</h1>
          
          <p className="verify-email-text">
            Enviamos um link de verificação para <strong>{user?.email}</strong>
          </p>
          
          <p className="verify-email-instructions">
            Clique no link no email para confirmar sua conta e ter acesso completo à plataforma.
          </p>

          <div className="verify-email-tips">
            <p className="tips-title">Não recebeu o email?</p>
            <ul className="tips-list">
              <li>Verifique sua pasta de spam ou lixo eletrônico</li>
              <li>Aguarde alguns minutos - pode demorar um pouco</li>
              <li>Tente reenviar o email usando o botão abaixo</li>
            </ul>
          </div>

          <div className="verify-email-actions">
            <button
              className="btn-resend"
              onClick={handleResendEmail}
              disabled={countdown > 0 || isResending}
            >
              {isResending ? (
                <>
                  <span className="spinner"></span>
                  Enviando...
                </>
              ) : countdown > 0 ? (
                `Aguarde ${countdown}s para reenviar`
              ) : (
                'Reenviar email de verificação'
              )}
            </button>

            <button className="btn-logout-alt" onClick={handleLogout}>
              Usar outro email
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default VerifyEmail;


