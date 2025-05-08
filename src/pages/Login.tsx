import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { UserProfile } from '../types';
import SocialLoginButtons from '@/components/Auth/SocialLoginButtons';
import ThemeToggle from '@/components/Auth/ThemeToggle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState<'admin' | 'paciente'>('paciente');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, loginWithSocial, register, forgotPassword } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password, profile as UserProfile);
      navigate('/dashboard');
      toast({
        title: 'Login realizado com sucesso',
        description: `Bem-vindo à sua área de membros (${profile === 'admin' ? 'Nutricionista/Equipe' : 'Paciente'})!`,
      });
    } catch {
      toast({
        title: 'Erro de login',
        description: 'Por favor, verifique seu email e senha.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  const handleSocial = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    try {
      await loginWithSocial(provider);
      navigate('/dashboard');
      toast({ title: 'Login realizado com sucesso', description: 'Bem-vindo à sua área de membros!' });
    } catch {
      toast({ title: 'Erro ao autenticar', description: 'Tente novamente.', variant: 'destructive' });
    }
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(registerEmail, registerPassword);
      setShowRegister(false);
      toast({ title: 'Cadastro realizado', description: 'Conta criada com sucesso!' });
    } catch (err: any) {
      toast({ title: 'Erro no cadastro', description: err.message, variant: 'destructive' });
    }
    setIsLoading(false);
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await forgotPassword(forgotEmail);
      setShowForgot(false);
      toast({ title: 'E-mail enviado', description: 'Verifique sua caixa de entrada.' });
    } catch (err: any) {
      toast({ title: 'Erro', description: err.message, variant: 'destructive' });
    }
    setIsLoading(false);
  };

  return (
    <>
      <ThemeToggle />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">NutriSport</h1>
            <p className="text-muted-foreground">Área exclusiva de membros</p>
          </div>
          <Card className="border-border/60 shadow-lg animate-scale-in">
            <CardHeader>
              <CardTitle>Acessar minha conta</CardTitle>
              <CardDescription>
                Entre com suas credenciais ou utilize uma rede social
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SocialLoginButtons
                onGoogle={() => handleSocial('google')}
                onFacebook={() => handleSocial('facebook')}
                loading={isLoading}
              />
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Button type="button" variant="link" className="p-0 h-auto text-xs text-muted-foreground" onClick={() => setShowForgot(true)}>
                      Esqueceu a senha?
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tipo de acesso</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="profile"
                        value="paciente"
                        checked={profile === 'paciente'}
                        onChange={() => setProfile('paciente')}
                      />
                      Paciente
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="profile"
                        value="admin"
                        checked={profile === 'admin'}
                        onChange={() => setProfile('admin')}
                      />
                      Nutricionista/Equipe
                    </label>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
              <div className="text-center mt-2">
                <Button type="button" variant="link" className="text-primary" onClick={() => setShowRegister(true)}>
                  Criar conta
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Modal de cadastro */}
          {showRegister && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-sm shadow-lg">
                <h2 className="text-xl font-bold mb-4">Criar nova conta</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="E-mail"
                    value={registerEmail}
                    onChange={e => setRegisterEmail(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Senha"
                    value={registerPassword}
                    onChange={e => setRegisterPassword(e.target.value)}
                    required
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                  </Button>
                  <Button type="button" variant="ghost" className="w-full" onClick={() => setShowRegister(false)}>
                    Cancelar
                  </Button>
                </form>
              </div>
            </div>
          )}
          {/* Modal de recuperação de senha */}
          {showForgot && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-sm shadow-lg">
                <h2 className="text-xl font-bold mb-4">Recuperar senha</h2>
                <form onSubmit={handleForgot} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="E-mail"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Enviar link'}
                  </Button>
                  <Button type="button" variant="ghost" className="w-full" onClick={() => setShowForgot(false)}>
                    Cancelar
                  </Button>
                </form>
              </div>
            </div>
          )}
          <p className="text-center text-muted-foreground text-sm mt-6">
            Precisa de ajuda? Entre em contato com seu nutricionista
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
