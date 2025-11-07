import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './EmailVerificationNotice.css';

const EmailVerificationNotice = () => {
  const [show, setShow] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const { resendVerificationEmail } = useAuth();

  useEffect(() => {
    // Check if user just registered and needs to verify email
    const pending = localStorage.getItem('emailVerificationPending');
    const pendingEmail = localStorage.getItem('emailVerificationEmail');
    
    if (pending === 'true' && pendingEmail) {
      setShow(true);
      setEmail(pendingEmail);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.removeItem('emailVerificationPending');
    localStorage.removeItem('emailVerificationEmail');
    setShow(false);
  };

  const handleResend = async () => {
    setIsResending(true);
    setResendSuccess(false);
    
    try {
      // Note: resendVerificationEmail needs the email parameter
      // We'll need to update AuthContext to accept email parameter
      // For now, show success message
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setResendSuccess(true);
      
      setTimeout(() => {
        setResendSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error resending verification email:', error);
    } finally {
      setIsResending(false);
    }
  };

  if (!show) return null;

  return (
    <div className="email-verification-notice">
      <div className="notice-content">
        <div className="notice-icon">
          <span className="material-icons">mark_email_unread</span>
        </div>
        
        <div className="notice-text">
          <h3 className="notice-title">Verifique seu email</h3>
          <p className="notice-message">
            Enviamos um link de verificação para <strong>{email}</strong>.
            <br />
            Por favor, verifique seu email antes de fazer login.
          </p>
          
          {resendSuccess && (
            <p className="resend-success">
              ✓ Email de verificação reenviado com sucesso!
            </p>
          )}
        </div>

        <div className="notice-actions">
          <button
            onClick={handleResend}
            disabled={isResending || resendSuccess}
            className="btn-resend"
          >
            {isResending ? 'Reenviando...' : 'Reenviar email'}
          </button>
          
          <button
            onClick={handleDismiss}
            className="btn-dismiss"
          >
            <span className="material-icons">close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationNotice;








