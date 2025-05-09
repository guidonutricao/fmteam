import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/types';

type PermissionCheckResult = {
  isAdmin: boolean;
  isPaciente: boolean;
  hasPermission: (requiredProfile: UserProfile | UserProfile[]) => boolean;
};

export const usePermissions = (): PermissionCheckResult => {
  const { user } = useAuth();
  
  const isAdmin = user?.profile === 'admin';
  const isPaciente = user?.profile === 'paciente';
  
  const hasPermission = (requiredProfile: UserProfile | UserProfile[]): boolean => {
    if (!user) return false;
    
    return Array.isArray(requiredProfile)
      ? requiredProfile.includes(user.profile)
      : user.profile === requiredProfile;
  };
  
  return {
    isAdmin,
    isPaciente,
    hasPermission
  };
}; 