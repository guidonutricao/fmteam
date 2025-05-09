import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/types';
import { Mail, Key, CheckCircle2, Lock } from 'lucide-react';
import ThemeToggle from '@/components/Auth/ThemeToggle';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserProfile>('paciente');
  const [registrationCode, setRegistrationCode] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register } = useAuth();

  const validatePasswordMatch = () => {
    if (password !== confirmPassword) {
      toast({
        title: 'Erro de validação',
        description: 'As senhas não coincidem.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const validateAdminCode = () => {
    if (userType === 'admin' && (!registrationCode || registrationCode !== 'NUTRITEAM2024')) {
      toast({
        title: 'Código inválido',
        description: 'O código de registro de nutricionista não é válido.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswordMatch() || !validateAdminCode()) {
      return;
    }
    
    setIsLoading(true);
    try {
      await register(email, password, userType);
      toast({ 
        title: 'Cadastro realizado com sucesso', 
        description: `Conta criada como ${userType === 'admin' ? 'Nutricionista/Admin' : 'Paciente'}!` 
      });
      navigate('/dashboard');
    } catch (err: any) {
      toast({ 
        title: 'Erro no cadastro', 
        description: err.message || 'Falha ao cadastrar usuário', 
        variant: 'destructive' 
      });
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
            <p className="text-muted-foreground">Cadastre-se na Área de Membros</p>
          </div>
          
          <Card className="border-border/60 shadow-lg animate-fade-in-up">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Criar nova conta</CardTitle>
              <CardDescription className="text-center">
                Escolha o tipo de conta para cadastro
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tipo de Conta</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className={`border rounded-md p-3 cursor-pointer transition-colors ${
                      userType === 'paciente' ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                    onClick={() => setUserType('paciente')}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">Paciente</span>
                      {userType === 'paciente' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Acesso às informações do seu plano nutricional
                    </p>
                  </div>
                  <div 
                    className={`border rounded-md p-3 cursor-pointer transition-colors ${
                      userType === 'admin' ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                    onClick={() => setUserType('admin')}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">Nutricionista</span>
                      {userType === 'admin' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Acesso administrativo ao sistema
                    </p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleRegister} className="space-y-4">
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
                  <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmar Senha</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                {userType === 'admin' && (
                  <div className="space-y-2">
                    <Label htmlFor="registrationCode" className="text-sm font-medium">
                      Código de Registro (Nutricionistas)
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="registrationCode"
                        type="password"
                        placeholder="Código de acesso exclusivo"
                        value={registrationCode}
                        onChange={(e) => setRegistrationCode(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Este código é fornecido exclusivamente para nutricionistas autorizados.
                    </p>
                  </div>
                )}
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Cadastrando...' : 'Criar Conta'}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 border-t pt-4">
              <div className="text-center w-full">
                <p className="text-sm text-muted-foreground">
                  Já possui uma conta?{' '}
                  <Link to="/" className="text-primary hover:underline">
                    Faça login
                  </Link>
                </p>
              </div>
              
              <p className="text-xs text-center text-muted-foreground px-6">
                Ao cadastrar, você concorda com nossos termos de uso e política de privacidade.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register; 