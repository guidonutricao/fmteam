// Tipos globais do projeto

export type UserProfile = 'admin' | 'paciente';

export interface User {
  email: string;
  profile: UserProfile;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, profile?: UserProfile) => Promise<void>;
  loginWithSocial: (provider: 'google' | 'facebook') => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => void;
} 