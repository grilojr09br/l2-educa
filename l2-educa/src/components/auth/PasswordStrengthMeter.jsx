import React from 'react';
import { calculatePasswordStrength } from '../../utils/securityUtils';
import './PasswordStrengthMeter.css';

const PasswordStrengthMeter = ({ password }) => {
  // Verificar se password existe ANTES de tentar usar
  if (!password || password.length === 0) return null;
  
  const strength = calculatePasswordStrength(password);
  
  const requirements = [
    { label: 'Mínimo 8 caracteres', met: password.length >= 8 },
    { label: 'Letra maiúscula', met: /[A-Z]/.test(password) },
    { label: 'Letra minúscula', met: /[a-z]/.test(password) },
    { label: 'Número', met: /[0-9]/.test(password) },
    { label: 'Caractere especial', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  return (
    <div className="password-strength-meter">
      <div className="strength-bar-container">
        <div 
          className="strength-bar"
          style={{
            width: `${(strength.score / 10) * 100}%`,
            backgroundColor: strength.color
          }}
        />
      </div>
      
      <p className="strength-label" style={{ color: strength.color }}>
        Força da senha: {strength.label}
      </p>

      <div className="requirements-list">
        {requirements.map((req, index) => (
          <div 
            key={index} 
            className={`requirement-item ${req.met ? 'met' : ''}`}
          >
            <span className="requirement-icon">
              {req.met ? '✓' : '○'}
            </span>
            <span className="requirement-label">{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;


