import React, { Suspense } from 'react';
import ProtectedRoute from './ProtectedRoute';

const SuspendedProtectedRoute = ({ children, ...rest }) => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ProtectedRoute {...rest}>
        {children}
      </ProtectedRoute>
    </Suspense>
  );
};

export default SuspendedProtectedRoute;
