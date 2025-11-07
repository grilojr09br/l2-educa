import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { checkRateLimit, recordFailedAttempt } from '../../utils/securityUtils';
import './AuthForms.css';

const identifierSchema = z.object({
  identifier: z.string().min(1, 'Email ou username é obrigatório'),
});

const loginSchema = z.object({
  identifier: z.string().min(1, 'Email ou username é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

const registerSchema = z.object({
  identifier: z.string().email('Email inválido'),
  username: z.string()
    .min(3, 'Username deve ter no mínimo 3 caracteres')
    .max(20, 'Username deve ter no máximo 20 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Apenas letras, números e underscore'),
  password: z.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Deve conter ao menos uma letra maiúscula')
    .regex(/[a-z]/, 'Deve conter ao menos uma letra minúscula')
    .regex(/[0-9]/, 'Deve conter ao menos um número'),
  confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

const SeamlessLoginForm = () => {
  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [step, setStep] = useState('identifier'); // 'identifier', 'login', 'register'
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [userExists, setUserExists] = useState(null);
  const [identifierType, setIdentifierType] = useState(null);
  const [rateLimit, setRateLimit] = useState({ allowed: true, minutesLeft: 0 });

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(
      step === 'identifier' ? identifierSchema :
      step === 'login' ? loginSchema :
      registerSchema
    ),
  });

  const identifier = watch('identifier');

  // Detect identifier type (email vs username)
  const detectIdentifierType = (value) => {
    if (!value) return null;
    return value.includes('@') ? 'email' : 'username';
  };

  // Check rate limit when identifier changes
  useEffect(() => {
    if (identifier) {
      const limit = checkRateLimit(identifier);
      setRateLimit(limit);
    }
  }, [identifier]);

  // Auto-detect identifier type
  useEffect(() => {
    const type = detectIdentifierType(identifier);
    setIdentifierType(type);
  }, [identifier]);

  // Check if user exists
  const checkUserExists = async (identifierValue) => {
    setIsCheckingUser(true);
    setApiError(null);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/auth/check-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier: identifierValue }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUserExists(data.data.exists);
        
        if (data.data.exists) {
          // User exists, go to login step
          setStep('login');
        } else {
          // User doesn't exist, go to register step
          // For registration, identifier must be email
          if (!identifierValue.includes('@')) {
            setApiError('Para criar uma conta, use um endereço de email válido');
            return;
          }
          setStep('register');
        }
      } else {
        setApiError(data.error || 'Erro ao verificar usuário');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setApiError('Erro de conexão. Tente novamente.');
    } finally {
      setIsCheckingUser(false);
    }
  };

  // Handle identifier submission (Step 1)
  const onIdentifierSubmit = async (data) => {
    // Check rate limit
    const limit = checkRateLimit(data.identifier);
    if (!limit.allowed) {
      setApiError(`Muitas tentativas. Aguarde ${limit.minutesLeft} minutos.`);
      return;
    }

    await checkUserExists(data.identifier);
  };

  // Handle login submission (Step 2a)
  const onLoginSubmit = async (data) => {
    // Check rate limit
    const limit = checkRateLimit(data.identifier);
    if (!limit.allowed) {
      setApiError(`Muitas tentativas. Aguarde ${limit.minutesLeft} minutos.`);
      return;
    }

    setApiError(null);
    setIsLoading(true);

    try {
      console.log('🔐 Attempting login...');
      const result = await login(data.identifier, data.password);
      console.log('✅ Login successful:', result);
      
      // Check if email is verified
      if (!result.emailVerified) {
        console.log('⚠️ Email not verified');
        setApiError('Por favor, verifique seu email antes de fazer login.');
        
        localStorage.setItem('emailVerificationPending', 'true');
        localStorage.setItem('emailVerificationEmail', data.identifier);
        
        setIsLoading(false);
        return;
      }
      
      // Email is verified, clear any pending flags
      localStorage.removeItem('emailVerificationPending');
      localStorage.removeItem('emailVerificationEmail');
      
      // Wait a bit to ensure auth state is updated
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Redirect to intended page or home
      const from = location.state?.from?.pathname || '/';
      console.log('🚀 Redirecting to:', from);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('❌ Login error:', error);
      
      // Record failed attempt
      recordFailedAttempt(data.identifier);
      
      // Handle EMAIL_NOT_CONFIRMED specially
      if (error.message === 'EMAIL_NOT_CONFIRMED') {
        setApiError('Por favor, verifique seu email antes de fazer login.');
        localStorage.setItem('emailVerificationPending', 'true');
        localStorage.setItem('emailVerificationEmail', data.identifier);
      } else {
        setApiError(error.message || 'Erro ao fazer login');
      }
      
      // Update rate limit
      const newLimit = checkRateLimit(data.identifier);
      setRateLimit(newLimit);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle registration submission (Step 2b)
  const onRegisterSubmit = async (data) => {
    setApiError(null);
    setIsLoading(true);

    try {
      console.log('📝 Attempting registration...');
      const result = await registerUser(data.identifier, data.password, data.username);
      console.log('✅ Registration successful:', result);
      
      // Store email for verification notice
      localStorage.setItem('emailVerificationPending', 'true');
      localStorage.setItem('emailVerificationEmail', data.identifier);
      
      // Show success message
      setApiError(null);
      setStep('verification');
    } catch (error) {
      console.error('❌ Registration error:', error);
      setApiError(error.message || 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back button
  const handleBack = () => {
    setStep('identifier');
    setUserExists(null);
    setApiError(null);
  };

  // Get placeholder text based on identifier type
  const getPlaceholder = () => {
    if (identifierType === 'email') return 'seu@email.com';
    if (identifierType === 'username') return 'seu_username';
    return 'Email ou Username';
  };

  // Get icon based on identifier type
  const getIdentifierIcon = () => {
    if (identifierType === 'email') return '✉️';
    if (identifierType === 'username') return '👤';
    return '🔑';
  };

  return (
    <div className="auth-form-container">
      {/* STEP 1: Enter Email or Username */}
      {step === 'identifier' && (
        <>
          <div className="auth-form-header">
            <h2 className="auth-form-title">Bem-vindo</h2>
            <p className="auth-form-subtitle">
              Entre com seu email ou username para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit(onIdentifierSubmit)} className="auth-form">
            {!rateLimit.allowed && (
              <div className="rate-limit-warning">
                🔒 Muitas tentativas. Aguarde {rateLimit.minutesLeft} minuto(s).
              </div>
            )}

            <div className="form-group">
              <label htmlFor="identifier" className="form-label">
                <span className="identifier-icon">{getIdentifierIcon()}</span>
                Email ou Username
              </label>
              <input
                id="identifier"
                type="text"
                {...registerField('identifier')}
                disabled={isCheckingUser || !rateLimit.allowed}
                className={`form-input ${errors.identifier ? 'form-input-error' : ''}`}
                placeholder={getPlaceholder()}
                autoComplete="username"
                autoFocus
              />
              {errors.identifier && (
                <span className="form-error">{errors.identifier.message}</span>
              )}
            </div>

            {apiError && <div className="api-error">{apiError}</div>}

            <button
              type="submit"
              disabled={isCheckingUser || !rateLimit.allowed}
              className="submit-button"
            >
              {isCheckingUser ? (
                <span className="button-loading">
                  <span className="spinner"></span>
                  Verificando...
                </span>
              ) : (
                'Continuar'
              )}
            </button>
          </form>
        </>
      )}

      {/* STEP 2A: Login (User Exists) */}
      {step === 'login' && (
        <>
          <div className="auth-form-header">
            <h2 className="auth-form-title">Bem-vindo de volta!</h2>
            <p className="auth-form-subtitle">
              Entrando como: <strong>{identifier}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit(onLoginSubmit)} className="auth-form">
            <input type="hidden" {...registerField('identifier')} value={identifier} />

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <input
                id="password"
                type="password"
                {...registerField('password')}
                disabled={isLoading}
                className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                placeholder="••••••••"
                autoComplete="current-password"
                autoFocus
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>

            <div className="form-footer-link">
              <Link to="/forgot-password" className="link-text">
                Esqueceu sua senha?
              </Link>
            </div>

            {apiError && <div className="api-error">{apiError}</div>}

            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? (
                <span className="button-loading">
                  <span className="spinner"></span>
                  Entrando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>

            <button
              type="button"
              onClick={handleBack}
              className="back-button"
            >
              ← Voltar
            </button>
          </form>
        </>
      )}

      {/* STEP 2B: Register (New User) */}
      {step === 'register' && (
        <>
          <div className="auth-form-header">
            <h2 className="auth-form-title">Criar Nova Conta</h2>
            <p className="auth-form-subtitle">
              Cadastrando: <strong>{identifier}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit(onRegisterSubmit)} className="auth-form">
            <input type="hidden" {...registerField('identifier')} value={identifier} />

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                {...registerField('username')}
                disabled={isLoading}
                className={`form-input ${errors.username ? 'form-input-error' : ''}`}
                placeholder="seu_username"
                autoComplete="username"
                autoFocus
              />
              {errors.username && (
                <span className="form-error">{errors.username.message}</span>
              )}
              <span className="form-hint">3-20 caracteres. Apenas letras, números e underscore.</span>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <input
                id="password"
                type="password"
                {...registerField('password')}
                disabled={isLoading}
                className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
              <span className="form-hint">Mínimo 8 caracteres, com maiúscula, minúscula e número.</span>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...registerField('confirmPassword')}
                disabled={isLoading}
                className={`form-input ${errors.confirmPassword ? 'form-input-error' : ''}`}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <span className="form-error">{errors.confirmPassword.message}</span>
              )}
            </div>

            {apiError && <div className="api-error">{apiError}</div>}

            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? (
                <span className="button-loading">
                  <span className="spinner"></span>
                  Criando conta...
                </span>
              ) : (
                'Criar Conta'
              )}
            </button>

            <button
              type="button"
              onClick={handleBack}
              className="back-button"
            >
              ← Voltar
            </button>
          </form>
        </>
      )}

      {/* STEP 3: Verification Message */}
      {step === 'verification' && (
        <div className="auth-form-header">
          <h2 className="auth-form-title">✅ Conta Criada!</h2>
          <p className="auth-form-subtitle">
            Enviamos um email de verificação para <strong>{identifier}</strong>.
          </p>
          <p className="auth-form-subtitle">
            Por favor, verifique sua caixa de entrada e clique no link para ativar sua conta.
          </p>
          <div className="form-footer" style={{ marginTop: '2rem' }}>
            <Link to="/login" className="link-text" onClick={() => window.location.reload()}>
              Voltar para o login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeamlessLoginForm;

