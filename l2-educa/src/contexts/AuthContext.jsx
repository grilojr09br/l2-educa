import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../config/supabase';
import { 
  setupActivityListener, 
  updateLastActivity, 
  clearSessionTimeout,
  clearRateLimit 
} from '../utils/securityUtils';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  // Handle session timeout
  const handleSessionTimeout = useCallback(async () => {
    console.log('⏱️ Session timeout - logging out');
    try {
      await logout();
    } catch (error) {
      console.error('Timeout logout error:', error);
    }
  }, []);

  // Fetch user data from database
  const fetchUserData = useCallback(async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, username, created_at, avatar_url')
        .eq('id', userId)
        .single();

      if (!error && data) {
        return data;
      }
      
      // Fallback if users table doesn't have the record yet
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    // Initial session check
    const checkSession = async () => {
      if (!isMounted) return;
      
      try {
        console.log('🔍 Initial session check...');
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        if (sessionError) {
          console.error('❌ Session error:', sessionError);
          setSession(null);
          setUser(null);
          setLoading(false);
          setInitialCheckDone(true);
          return;
        }

        console.log('📦 Session found:', {
          hasSession: !!currentSession,
          email: currentSession?.user?.email,
          emailConfirmed: !!currentSession?.user?.email_confirmed_at,
        });

        setSession(currentSession);
        
        if (currentSession?.user) {
          const userData = await fetchUserData(currentSession.user.id);
          
          if (!isMounted) return;
          
          // Use database user data if available, otherwise create from auth data
          setUser(userData || {
            id: currentSession.user.id,
            email: currentSession.user.email,
            username: currentSession.user.email?.split('@')[0] || 'user',
            created_at: currentSession.user.created_at,
            avatar_url: null
          });
          
          updateLastActivity();
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('❌ Error checking session:', error);
        if (isMounted) {
          setSession(null);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setInitialCheckDone(true);
        }
      }
    };

    checkSession();

    // Listen for auth changes (but don't set loading state)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!isMounted || !initialCheckDone) return;
        
        console.log('🔐 Auth state changed:', event);
        
        // Don't set loading for auth state changes after initial check
        setSession(currentSession);

        if (currentSession?.user) {
          const userData = await fetchUserData(currentSession.user.id);
          
          if (isMounted) {
            setUser(userData || {
              id: currentSession.user.id,
              email: currentSession.user.email,
              username: currentSession.user.email?.split('@')[0] || 'user',
              created_at: currentSession.user.created_at,
              avatar_url: null
            });
            
            if (event === 'SIGNED_IN') {
              updateLastActivity();
            }
          }
        } else {
          if (isMounted) {
            setUser(null);
            clearSessionTimeout();
          }
        }
      }
    );

    // Setup activity listener for session timeout
    const cleanupActivityListener = setupActivityListener(handleSessionTimeout);

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
      cleanupActivityListener();
    };
  }, [handleSessionTimeout, fetchUserData, initialCheckDone]);

  /**
   * Register new user with email verification
   * Note: User profile is automatically created via database trigger
   */
  const register = async (email, password, username) => {
    try {
      // Use Supabase Auth signup with username in metadata
      // Email confirmation is required (configure in Supabase dashboard)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
          emailRedirectTo: `${window.location.origin}/#/verify-email`,
        },
      });

      if (authError) {
        // Handle specific error cases
        if (authError.message?.includes('already registered')) {
          throw new Error('Este email já está cadastrado');
        }
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Falha no registro');
      }

      // Success! User needs to verify email before accessing the platform
      return { success: true, user: authData.user, requiresEmailVerification: true };
    } catch (error) {
      console.error('❌ Registration error:', error);
      throw error;
    }
  };

  /**
   * Login user with enhanced error handling
   */
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Handle specific error cases
        if (error.message?.includes('Invalid login credentials')) {
          throw new Error('Email ou senha incorretos');
        }
        if (error.message?.includes('Email not confirmed')) {
          throw new Error('EMAIL_NOT_CONFIRMED');
        }
        if (error.message?.includes('network')) {
          throw new Error('Erro de conexão. Verifique sua internet.');
        }
        throw error;
      }

      if (!data.session) {
        throw new Error('Erro ao criar sessão');
      }

      // Clear rate limit on successful login
      clearRateLimit(email);
      updateLastActivity();

      return { 
        success: true, 
        user: data.user,
        session: data.session,
        emailVerified: !!data.session.user?.email_confirmed_at
      };
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  };


  /**
   * Logout user - ULTRA ROBUSTO
   */
  const logout = async () => {
    try {
      console.log('🚪 Iniciando logout...');
      
      // Force global signout (all sessions)
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) throw error;
      
      // Clear all local states
      setUser(null);
      setSession(null);
      
      // Clear security-related storage
      clearSessionTimeout();
      
      // Clear any cached data
      localStorage.removeItem('l2educa_last_activity');
      sessionStorage.clear();
      
      console.log('✅ Logout completo!');
      return { success: true };
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Even if there's an error, clear local state
      setUser(null);
      setSession(null);
      clearSessionTimeout();
      throw error;
    }
  };

  /**
   * Request password reset
   */
  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  /**
   * Update password
   */
  const updatePassword = async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  };

  /**
   * Update user profile
   */
  const updateProfile = async (profileData) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');

      const { error } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('user_id', user.id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  /**
   * Get user profile
   */
  const getUserProfile = async () => {
    try {
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  };

  /**
   * Resend verification email
   */
  const resendVerificationEmail = async () => {
    try {
      if (!user?.email) {
        throw new Error('Email não encontrado');
      }

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
        options: {
          emailRedirectTo: `${window.location.origin}/#/verify-email`,
        },
      });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('❌ Resend verification error:', error);
      throw error;
    }
  };

  /**
   * Check if user email is verified
   */
  const isEmailVerified = () => {
    return session?.user?.email_confirmed_at != null;
  };

  const value = {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    isEmailVerified: isEmailVerified(),
    register,
    login,
    logout,
    resetPassword,
    updatePassword,
    updateProfile,
    getUserProfile,
    resendVerificationEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

