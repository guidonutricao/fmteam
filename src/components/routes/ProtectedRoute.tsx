import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredProfile?: UserProfile | UserProfile[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredProfile
}) => {
  const { user } = useAuth();
  const location = useLocation();

  // Se o usuário não estiver autenticado, redirecionar para login
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Se o perfil requerido estiver especificado, verificar as permissões
  if (requiredProfile) {
    const hasPermission = Array.isArray(requiredProfile)
      ? requiredProfile.includes(user.profile)
      : user.profile === requiredProfile;

    if (!hasPermission) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Usuário autenticado e com permissões corretas
  return <>{children}</>;
};

export default ProtectedRoute; 