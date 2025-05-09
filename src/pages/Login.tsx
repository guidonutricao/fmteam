import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { UserProfile } from '../types';
import SocialLoginButtons from '@/components/Auth/SocialLoginButtons';
import ThemeToggle from '@/components/Auth/ThemeToggle';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { CheckCircle, Key, LockKeyhole, Mail, User, UserCog } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState<'admin' | 'paciente'>('paciente');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, loginWithSocial, register, forgotPassword } = useAuth();
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">FM Team</h1>
            <p className="text-muted-foreground">Área exclusiva de membros</p>
          </div>
          
          <Card className="border-border/60 shadow-lg animate-fade-in-up">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Acesse sua conta</CardTitle>
              <CardDescription className="text-center">
                Entre com suas credenciais ou redes sociais
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="login" className="flex gap-2 items-center">
                    <User size={16} />
                    <span>Login</span>
                  </TabsTrigger>
                  <TabsTrigger value="register" className="flex gap-2 items-center">
                    <UserCog size={16} />
                    <span>Cadastrar</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-4">
                  <SocialLoginButtons
                    onGoogle={() => handleSocial('google')}
                    onFacebook={() => handleSocial('facebook')}
                    loading={isLoading}
                  />
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu.email@exemplo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
                        <Button 
                          type="button" 
                          variant="link" 
                          className="p-0 h-auto text-xs" 
                          onClick={() => setShowForgot(true)}
                        >
                          Esqueceu a senha?
                        </Button>
                      </div>
                      <div className="relative">
                        <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Tipo de acesso</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          className={`border rounded-md p-3 cursor-pointer transition-colors ${
                            profile === 'paciente' ? 'border-primary bg-primary/5' : 'border-border'
                          }`}
                          onClick={() => setProfile('paciente')}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Paciente</span>
                            {profile === 'paciente' && <CheckCircle className="h-4 w-4 text-primary" />}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Acesso às informações do seu plano
                          </p>
                        </div>
                        <div 
                          className={`border rounded-md p-3 cursor-pointer transition-colors ${
                            profile === 'admin' ? 'border-primary bg-primary/5' : 'border-border'
                          }`}
                          onClick={() => setProfile('admin')}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Nutricionista</span>
                            {profile === 'admin' && <CheckCircle className="h-4 w-4 text-primary" />}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Acesso de administrador
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Entrando...' : 'Entrar'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register" className="space-y-4">
                  <SocialLoginButtons
                    onGoogle={() => handleSocial('google')}
                    onFacebook={() => handleSocial('facebook')}
                    loading={isLoading}
                  />
                  
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-sm font-medium">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="seu.email@exemplo.com"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-sm font-medium">Senha</Label>
                      <div className="relative">
                        <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="••••••••"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Cadastrando...' : 'Criar conta'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 border-t pt-4">
              <div className="text-center w-full">
                <p className="text-sm text-muted-foreground">
                  Não possui uma conta?{' '}
                  <Link to="/register" className="text-primary hover:underline">
                    Cadastre-se
                  </Link>
                </p>
              </div>
                
              <div className="flex items-center space-x-2">
                <div className="h-px bg-border flex-1" />
                <div className="text-xs text-muted-foreground">OU</div>
                <div className="h-px bg-border flex-1" />
              </div>
                
              <SocialLoginButtons
                onGoogle={() => handleSocial('google')}
                onFacebook={() => handleSocial('facebook')}
                loading={isLoading}
              />
            </CardFooter>
          </Card>
          
          <p className="text-center text-muted-foreground text-sm mt-6">
            Precisa de ajuda? Entre em contato com seu nutricionista
          </p>
        </div>
      </div>
      
      {/* Modal de Recuperação de Senha */}
      <Dialog open={showForgot} onOpenChange={setShowForgot}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Recuperar senha</DialogTitle>
            <DialogDescription>
              Enviaremos um link para redefinir sua senha.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleForgot} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="forgot-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Enviando...' : 'Enviar link'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
