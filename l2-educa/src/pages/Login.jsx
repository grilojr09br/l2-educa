import React from 'react';
import EnhancedSeamlessLoginForm from '../components/auth/EnhancedSeamlessLoginForm';
// import EmailVerificationNotice from '../components/auth/EmailVerificationNotice'; // ⚠️ DEACTIVATED - Email verification disabled
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
          {/* <EmailVerificationNotice /> */} {/* ⚠️ DEACTIVATED - Email verification disabled */}
          <EnhancedSeamlessLoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;

