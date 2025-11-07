import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

const AdminGuard = ({ children }) => {
  // Check if running in development mode
  const isDevelopment = import.meta.env.MODE === 'development';
  
  if (!isDevelopment) {
    console.warn('🚫 Admin panel is only available in development mode');
    return <Navigate to="/" replace />;
  }

  // TODO: Add backend authentication check when implemented
  // const { isAuthenticated } = useAdmin();
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

export default AdminGuard;

