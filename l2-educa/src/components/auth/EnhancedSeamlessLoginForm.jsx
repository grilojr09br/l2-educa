import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { checkRateLimit, recordFailedAttempt } from '../../utils/securityUtils';
import './AuthForms.css';

// ============================================================================
// VALIDATION SCHEMAS - Enterprise Level
// ============================================================================

const identifierSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Email ou username é obrigatório')
    .refine((val) => {
      // Either valid email or valid username
      if (val.includes('@')) {
        return z.string().email().safeParse(val).success;
      }
      return /^[a-zA-Z0-9_]{3,20}$/.test(val);
    }, {
      message: 'Email inválido ou username deve ter 3-20 caracteres (apenas letras, números e underscore)',
    }),
});

const loginSchema = z.object({
  identifier: z.string().min(1, 'Email ou username é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

const registerSchema = z
  .object({
    identifier: z.string().email('Email inválido'),
    username: z
      .string()
      .min(3, 'Username deve ter no mínimo 3 caracteres')
      .max(20, 'Username deve ter no máximo 20 caracteres')
      .regex(/^[a-zA-Z0-9_]+$/, 'Apenas letras, números e underscore'),
    password: z
      .string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Deve conter ao menos uma letra maiúscula')
      .regex(/[a-z]/, 'Deve conter ao menos uma letra minúscula')
      .regex(/[0-9]/, 'Deve conter ao menos um número'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

// ============================================================================
// ENHANCED SEAMLESS LOGIN FORM COMPONENT
// ============================================================================

const EnhancedSeamlessLoginForm = () => {
  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // State Management
  const [step, setStep] = useState('identifier'); // 'identifier', 'login', 'register', 'verification'
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [userExists, setUserExists] = useState(null);
  const [identifierType, setIdentifierType] = useState(null);
  const [rateLimit, setRateLimit] = useState({ allowed: true, minutesLeft: 0 });
  const [retryCount, setRetryCount] = useState(0);

  // Form Setup
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(
      step === 'identifier' ? identifierSchema : step === 'login' ? loginSchema : registerSchema
    ),
  });

  const identifier = watch('identifier');

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  // Detect identifier type (email vs username)
  const detectIdentifierType = (value) => {
    if (!value) return null;
    return value.includes('@') ? 'email' : 'username';
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

  // ============================================================================
  // EFFECTS
  // ============================================================================

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

  // ============================================================================
  // API CALLS - WITH RETRY LOGIC
  // ============================================================================

  // Check if user exists - WITH ROBUST ERROR HANDLING
  const checkUserExists = async (identifierValue, retryAttempt = 0) => {
    setIsCheckingUser(true);
    setApiError(null);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(`${backendUrl}/api/auth/check-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier: identifierValue }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Handle specific HTTP errors
        if (response.status === 429) {
          const data = await response.json();
          const retryAfter = data.retryAfter || 60;
          throw new Error(`Muitas tentativas. Aguarde ${Math.ceil(retryAfter / 60)} minuto(s) e tente novamente.`);
        }
        if (response.status === 500 || response.status === 502 || response.status === 503) {
          // Server error - retry up to 2 times
          if (retryAttempt < 2) {
            setRetryCount(retryAttempt + 1);
            await new Promise((resolve) => setTimeout(resolve, 1000 * (retryAttempt + 1))); // Exponential backoff
            return checkUserExists(identifierValue, retryAttempt + 1);
          }
          throw new Error('Servidor temporariamente indisponível. Tente novamente em alguns instantes.');
        }
        throw new Error('Erro ao verificar usuário. Tente novamente.');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Erro ao verificar usuário');
      }

      setUserExists(data.data.exists);
      setRetryCount(0); // Reset retry count on success

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
    } catch (error) {
      if (error.name === 'AbortError') {
        setApiError('Tempo de resposta excedido. Verifique sua conexão e tente novamente.');
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        setApiError('Erro de conexão. Verifique sua internet e tente novamente.');
      } else {
        setApiError(error.message || 'Erro ao verificar usuário. Tente novamente.');
      }
    } finally {
      setIsCheckingUser(false);
    }
  };

  // ============================================================================
  // FORM HANDLERS
  // ============================================================================

  // Handle identifier submission (Step 1)
  const onIdentifierSubmit = async (data) => {
    // Check rate limit
    const limit = checkRateLimit(data.identifier);
    if (!limit.allowed) {
      setApiError(`Muitas tentativas. Aguarde ${limit.minutesLeft} minuto(s).`);
      return;
    }

    await checkUserExists(data.identifier);
  };

  // Handle login submission (Step 2a)
  const onLoginSubmit = async (data) => {
    // Check rate limit
    const limit = checkRateLimit(data.identifier);
    if (!limit.allowed) {
      setApiError(`Muitas tentativas. Aguarde ${limit.minutesLeft} minuto(s).`);
      return;
    }

    setApiError(null);
    setIsLoading(true);

    try {
      const result = await login(data.identifier, data.password);

      // Check if email is verified
      if (!result.emailVerified) {
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
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Redirect to intended page or home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      // Record failed attempt
      recordFailedAttempt(data.identifier);

      // Handle EMAIL_NOT_CONFIRMED specially
      if (error.message === 'EMAIL_NOT_CONFIRMED') {
        setApiError('Por favor, verifique seu email antes de fazer login.');
        localStorage.setItem('emailVerificationPending', 'true');
        localStorage.setItem('emailVerificationEmail', data.identifier);
      } else if (error.message.includes('Invalid login credentials') || error.message.includes('incorretos')) {
        setApiError('Email/username ou senha incorretos. Verifique suas credenciais.');
      } else {
        setApiError(error.message || 'Erro ao fazer login. Tente novamente.');
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
      await registerUser(data.identifier, data.password, data.username);

      // Store email for verification notice
      localStorage.setItem('emailVerificationPending', 'true');
      localStorage.setItem('emailVerificationEmail', data.identifier);

      // Show success message
      setApiError(null);
      setStep('verification');
    } catch (error) {
      if (error.message.includes('já está em uso') || error.message.includes('already')) {
        setApiError('Este username já está em uso. Escolha outro.');
      } else if (error.message.includes('já está cadastrado') || error.message.includes('registered')) {
        setApiError('Este email já está cadastrado. Use outro ou faça login.');
      } else {
        setApiError(error.message || 'Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back button
  const handleBack = () => {
    setStep('identifier');
    setUserExists(null);
    setApiError(null);
    setRetryCount(0);
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="auth-form-container">
      {/* STEP 1: Enter Email or Username */}
      {step === 'identifier' && (
        <>
          <div className="auth-form-header">
            <h2 className="auth-form-title">Bem-vindo ao L2 EDUCA</h2>
            <p className="auth-form-subtitle">Entre com seu email ou username para continuar</p>
          </div>

          <form onSubmit={handleSubmit(onIdentifierSubmit)} className="auth-form">
            {!rateLimit.allowed && (
              <div className="rate-limit-warning">
                Muitas tentativas. Aguarde {rateLimit.minutesLeft} minuto(s).
              </div>
            )}

            {retryCount > 0 && (
              <div className="info-indicator">Tentando novamente ({retryCount}/2)...</div>
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
              {errors.identifier && <span className="form-error">{errors.identifier.message}</span>}
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
                🔒 Senha
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
              {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>

            <div className="form-footer-link">
              <Link to="/forgot-password" className="link-text">
                Esqueceu sua senha?
              </Link>
            </div>

            {apiError && <div className="api-error">{apiError}</div>}

            <button type="submit" disabled={isLoading} className="submit-button">
              {isLoading ? (
                <span className="button-loading">
                  <span className="spinner"></span>
                  Entrando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>

            <button type="button" onClick={handleBack} className="back-button">
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
                👤 Username
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
              {errors.username && <span className="form-error">{errors.username.message}</span>}
              <span className="form-hint">3-20 caracteres. Apenas letras, números e underscore.</span>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                🔒 Senha
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
              {errors.password && <span className="form-error">{errors.password.message}</span>}
              <span className="form-hint">Mínimo 8 caracteres, com maiúscula, minúscula e número.</span>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                🔒 Confirmar Senha
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
              {errors.confirmPassword && <span className="form-error">{errors.confirmPassword.message}</span>}
            </div>

            {apiError && <div className="api-error">{apiError}</div>}

            <button type="submit" disabled={isLoading} className="submit-button">
              {isLoading ? (
                <span className="button-loading">
                  <span className="spinner"></span>
                  Criando conta...
                </span>
              ) : (
                'Criar Conta'
              )}
            </button>

            <button type="button" onClick={handleBack} className="back-button">
              ← Voltar
            </button>
          </form>
        </>
      )}

      {/* STEP 3: Verification Message */}
      {step === 'verification' && (
        <div className="auth-form-header">
          <div className="success-indicator" style={{ marginBottom: '2rem' }}>
            Conta Criada com Sucesso!
          </div>
          <h2 className="auth-form-title">Verifique seu Email</h2>
          <p className="auth-form-subtitle">
            Enviamos um email de verificação para <strong>{identifier}</strong>.
          </p>
          <p className="auth-form-subtitle" style={{ marginTop: '1rem' }}>
            Por favor, verifique sua caixa de entrada e clique no link para ativar sua conta.
          </p>
          <div className="form-footer" style={{ marginTop: '2.5rem' }}>
            <Link to="/login" className="link-button" onClick={() => window.location.reload()}>
              Voltar para o login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSeamlessLoginForm;

