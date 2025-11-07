import React from 'react';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import AuroraBackground from '../components/AuroraBackground';
import './AuthPages.css';

const ForgotPassword = () => {
  return (
    <div className="auth-page">
      <AuroraBackground />
      
      <div className="auth-page-content">
        <div className="auth-page-logo">
          <h1 className="logo-text">L2 EDUCA</h1>
          <p className="logo-subtitle">Plataforma Educacional</p>
        </div>

        <div className="auth-card">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

