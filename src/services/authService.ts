import { User, UserProfile } from '../types';

// Mock de usuários
let users: User[] = [
  { email: 'admin@nutri.com', profile: 'admin' },
  { email: 'paciente1@exemplo.com', profile: 'paciente' },
];
const passwords: Record<string, string> = {
  'admin@nutri.com': 'admin123',
  'paciente1@exemplo.com': 'paciente123',
};

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    const user = users.find(u => u.email === email);
    if (user && passwords[email] === password) {
      return user;
    }
    throw new Error('E-mail ou senha inválidos');
  },
  loginWithSocial: async (provider: 'google' | 'facebook'): Promise<User> => {
    // Simula login social sempre como paciente
    return { email: provider + '@social.com', profile: 'paciente' };
  },
  register: async (email: string, password: string, profile: UserProfile = 'paciente'): Promise<User> => {
    if (users.some(u => u.email === email)) {
      throw new Error('E-mail já cadastrado');
    }
    const newUser: User = { email, profile };
    users.push(newUser);
    passwords[email] = password;
    return newUser;
  },
  forgotPassword: async (email: string): Promise<void> => {
    if (!users.some(u => u.email === email)) {
      throw new Error('E-mail não encontrado');
    }
    // Simula envio de e-mail
    return;
  },
}; 