import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import AuroraBackground from '../components/AuroraBackground';
import './AuthPages.css';

const Register = () => {
  return (
    <div className="auth-page">
      <AuroraBackground />
      
      <div className="auth-page-content">
        <div className="auth-page-logo">
          <h1 className="logo-text">L2 EDUCA</h1>
          <p className="logo-subtitle">Plataforma Educacional</p>
        </div>

        <div className="auth-card">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;

