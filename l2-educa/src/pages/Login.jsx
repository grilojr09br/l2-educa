import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import EmailVerificationNotice from '../components/auth/EmailVerificationNotice';
import AuroraBackground from '../components/AuroraBackground';
import './AuthPages.css';

const Login = () => {
  return (
    <div className="auth-page">
      <AuroraBackground />
      
      <div className="auth-page-content">
        <div className="auth-page-logo">
          <h1 className="logo-text">L2 EDUCA</h1>
          <p className="logo-subtitle">Plataforma Educacional</p>
        </div>

        <div className="auth-card">
          <EmailVerificationNotice />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;

