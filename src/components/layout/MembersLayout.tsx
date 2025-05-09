import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Book, Calendar, ChevronLeft, ChevronRight, 
  Dumbbell, FileText, Gift, ListCheck, 
  Star, Users, Utensils, Video, Home,
  Bell, Settings, Menu, X, LogOut
} from 'lucide-react';
import MobileNavigation from './MobileNavigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/use-permissions';

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}

const NavItem = ({ to, label, icon, active }: NavItemProps) => (
  <Link to={to} className={cn(
    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors", 
    active 
      ? "bg-primary/10 text-primary" 
      : "text-sidebar-foreground hover:bg-muted"
  )}>
    {icon}
    <span className="whitespace-nowrap">{label}</span>
  </Link>
);

interface MembersLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

const MembersLayout: React.FC<MembersLayoutProps> = ({ 
  children,
  showBackButton = false
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isAdmin } = usePermissions();
  const navigate = useNavigate();

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { to: "/dashboard", label: "Início", icon: <Home size={20} /> },
    { to: "/plano-alimentar", label: "Plano Alimentar", icon: <Utensils size={20} /> },
    { to: "/treino", label: "Treinos", icon: <Dumbbell size={20} /> },
    { to: "/substituicoes", label: "Substituição de Alimentos", icon: <FileText size={20} /> },
    { to: "/check-in", label: "Check-in", icon: <ListCheck size={20} /> },
    { to: "/mentorias", label: "Mentorias em Grupo", icon: <Users size={20} /> },
    { to: "/suplementos", label: "Suplementos", icon: <Star size={20} /> },
    { to: "/aplicativos", label: "Aplicativos", icon: <Calendar size={20} /> },
    { to: "/ebooks", label: "E-books e Materiais", icon: <Book size={20} /> },
    { to: "/incentivos", label: "Programa de Incentivo", icon: <Gift size={20} /> },
  ];

  // Itens administrativos para o menu
  const adminNavigation = isAdmin ? [
    { to: "/admin/users", label: "Usuários", icon: <Users size={20} /> },
    { to: "/admin/settings", label: "Configurações", icon: <Settings size={20} /> },
  ] : [];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const isHomePage = location.pathname === "/dashboard";
  
  // Obter as iniciais do email para o avatar
  const getInitials = (email: string) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header for Mobile */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur h-16 border-b px-4 sm:px-6 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          {!isHomePage && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
              className="md:hidden"
            >
              <ChevronLeft size={20} />
            </Button>
          )}
          
          <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu size={20} />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[80%]">
              <div className="px-4 py-3 flex justify-between items-center border-b">
                <h2 className="font-semibold text-lg">Menu</h2>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X size={18} />
                </Button>
              </div>
              <ScrollArea className="h-full p-4">
                <div className="flex items-center gap-3 mb-4 p-2 border-b pb-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{user?.email ? getInitials(user.email) : 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{user?.email || 'Usuário'}</p>
                    <p className="text-xs text-muted-foreground">
                      Perfil: {user?.profile === 'admin' ? 'Nutricionista' : 'Paciente'}
                    </p>
                  </div>
                </div>
                <nav className="space-y-1">
                  {navigation.map((item) => (
                    <NavItem 
                      key={item.to} 
                      to={item.to} 
                      label={item.label} 
                      icon={item.icon} 
                      active={location.pathname === item.to} 
                    />
                  ))}
                  
                  {/* Itens de menu apenas para admin */}
                  {isAdmin && adminNavigation.length > 0 && (
                    <>
                      <div className="pt-2 mt-2 border-t border-border/50">
                        <p className="px-3 py-1 text-xs uppercase text-muted-foreground">
                          Administração
                        </p>
                      </div>
                      {adminNavigation.map((item) => (
                        <NavItem 
                          key={item.to} 
                          to={item.to} 
                          label={item.label} 
                          icon={item.icon} 
                          active={location.pathname === item.to} 
                        />
                      ))}
                    </>
                  )}
                </nav>
                <div className="mt-8 pt-4 border-t">
                  <Button 
                    variant="default"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    Sair
                  </Button>
                </div>
              </ScrollArea>
            </DrawerContent>
          </Drawer>
          
          <h1 className="text-lg font-semibold text-primary">FM TEAM</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell size={18} />
          </Button>
          <Avatar className="h-8 w-8 md:hidden">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>{user?.email ? getInitials(user.email) : 'U'}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Desktop Sidebar - hidden on mobile */}
      <aside 
        className={cn(
          "bg-sidebar fixed inset-y-0 left-0 z-40 flex-col transition-all duration-300 hidden md:flex",
          "top-16 border-r border-border/50",
          sidebarOpen ? "w-64" : "w-[70px]"
        )}
      >
        {/* Sidebar toggle */}
        <div className="flex h-10 items-center justify-end px-3 border-b border-sidebar-border/50">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </Button>
        </div>

        {/* User info */}
        {sidebarOpen && (
          <div className="p-3 border-b border-sidebar-border/50">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{user?.email ? getInitials(user.email) : 'U'}</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="font-medium text-sm truncate">{user?.email || 'Usuário'}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.profile === 'admin' ? 'Nutricionista' : 'Paciente'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="flex flex-col gap-1">
            {navigation.map((item) => (
              <li key={item.to} className="relative group">
                <Link to={item.to} className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors", 
                  location.pathname === item.to
                    ? "bg-primary/10 text-primary" 
                    : "text-sidebar-foreground hover:bg-muted"
                )}>
                  {item.icon}
                  {sidebarOpen ? (
                    <span className="whitespace-nowrap">{item.label}</span>
                  ) : null}
                </Link>
                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {item.label}
                  </div>
                )}
              </li>
            ))}
            
            {/* Itens de menu apenas para admin */}
            {isAdmin && adminNavigation.length > 0 && (
              <>
                <li className="pt-2 mt-2 border-t border-border/50">
                  {sidebarOpen && (
                    <p className="px-3 py-1 text-xs uppercase text-muted-foreground">
                      Administração
                    </p>
                  )}
                </li>
                {adminNavigation.map((item) => (
                  <li key={item.to} className="relative group">
                    <Link to={item.to} className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors", 
                      location.pathname === item.to
                        ? "bg-primary/10 text-primary" 
                        : "text-sidebar-foreground hover:bg-muted"
                    )}>
                      {item.icon}
                      {sidebarOpen ? (
                        <span className="whitespace-nowrap">{item.label}</span>
                      ) : null}
                    </Link>
                    {!sidebarOpen && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        {item.label}
                      </div>
                    )}
                  </li>
                ))}
              </>
            )}
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="border-t border-sidebar-border/50 p-3">
          <Button 
            variant="outline" 
            className={cn(
              "w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/80",
              !sidebarOpen && "p-2"
            )}
            onClick={handleLogout}
          >
            {sidebarOpen ? "Sair" : <LogOut size={16} />}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className={cn(
        "flex-1 transition-all duration-300 md:ml-[70px]",
        sidebarOpen && "md:ml-64",
        "pb-20 md:pb-6" // Add padding to account for mobile navigation
      )}>
        {/* Page content */}
        <div className="container py-4 md:py-6 px-4 md:px-6 max-w-5xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
      
      {/* Mobile Bottom Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default MembersLayout;
