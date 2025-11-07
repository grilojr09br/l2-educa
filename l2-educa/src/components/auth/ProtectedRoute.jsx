import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requireEmailVerification = false }) => {
  const { isAuthenticated, isEmailVerified, loading, user, session } = useAuth();
  const location = useLocation();

  // Debug logs (can be removed in production)
  React.useEffect(() => {
    console.log('🛡️ ProtectedRoute Check:', {
      path: location.pathname,
      loading,
      isAuthenticated,
      isEmailVerified,
      hasUser: !!user,
      hasSession: !!session,
      requireEmailVerification
    });
  }, [loading, isAuthenticated, isEmailVerified, location.pathname, user, session, requireEmailVerification]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: '#fff',
        fontSize: '1.2rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(255,255,255,0.3)',
            borderTop: '3px solid #fff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Verificando autenticação...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // First check: User must be authenticated
  if (!isAuthenticated) {
    console.log('❌ Not authenticated, redirecting to login');
    // Redirect to login but save the location they were trying to visit
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Second check: Email must be verified (ONLY if explicitly required)
  if (requireEmailVerification && !isEmailVerified) {
    console.log('⚠️ Email not verified, redirecting to verify-email');
    // Redirect to email verification page
    return <Navigate to="/verify-email" replace />;
  }

  console.log('✅ Access granted to:', location.pathname);
  return children;
};

export default ProtectedRoute;

