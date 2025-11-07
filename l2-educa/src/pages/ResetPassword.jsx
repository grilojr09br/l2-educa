import React from 'react';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import AuroraBackground from '../components/AuroraBackground';
import './AuthPages.css';

const ResetPassword = () => {
  return (
    <div className="auth-page">
      <AuroraBackground />
      
      <div className="auth-page-content">
        <div className="auth-page-logo">
          <h1 className="logo-text">L2 EDUCA</h1>
          <p className="logo-subtitle">Plataforma Educacional</p>
        </div>

        <div className="auth-card">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

