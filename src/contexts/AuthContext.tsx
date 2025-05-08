import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User, UserProfile } from '../types';
import { authService } from '../services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email: string, password: string, profile?: UserProfile) => {
    const loggedUser = await authService.login(email, password);
    setUser(loggedUser);
    localStorage.setItem('user', JSON.stringify(loggedUser));
  };

  const loginWithSocial = async (provider: 'google' | 'facebook') => {
    const loggedUser = await authService.loginWithSocial(provider);
    setUser(loggedUser);
    localStorage.setItem('user', JSON.stringify(loggedUser));
  };

  const register = async (email: string, password: string) => {
    const newUser = await authService.register(email, password);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const forgotPassword = async (email: string) => {
    await authService.forgotPassword(email);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithSocial, register, forgotPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}; 