
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Book, Calendar, ChevronLeft, ChevronRight, 
  Dumbbell, FileText, Gift, ListCheck, 
  Star, Users, Utensils, Video,
  Bell, Settings
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}

const NavItem = ({ to, label, icon, active }: NavItemProps) => (
  <Link to={to} className={cn("nav-link", active ? "active" : "")}>
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

interface MembersLayoutProps {
  children: React.ReactNode;
}

const MembersLayout: React.FC<MembersLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Auto-collapse sidebar on mobile
  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const navigation = [
    { to: "/dashboard", label: "Início", icon: <Video size={20} /> },
    { to: "/plano-alimentar", label: "Plano Alimentar", icon: <Utensils size={20} /> },
    { to: "/treino", label: "Orientações de Treino", icon: <Dumbbell size={20} /> },
    { to: "/substituicoes", label: "Substituição de Alimentos", icon: <FileText size={20} /> },
    { to: "/check-in", label: "Check-in", icon: <ListCheck size={20} /> },
    { to: "/mentorias", label: "Mentorias em Grupo", icon: <Users size={20} /> },
    { to: "/suplementos", label: "Suplementos", icon: <Star size={20} /> },
    { to: "/aplicativos", label: "Aplicativos", icon: <Calendar size={20} /> },
    { to: "/ebooks", label: "E-books e Materiais", icon: <Book size={20} /> },
    { to: "/incentivos", label: "Programa de Incentivo", icon: <Gift size={20} /> },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar fixed inset-y-0 left-0 z-40 flex flex-col transition-all duration-300",
          sidebarOpen ? "w-64" : "w-[70px]"
        )}
      >
        {/* Logo and toggle */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {sidebarOpen && (
            <span className="text-xl font-semibold text-sidebar-foreground">
              ÁREA DE MEMBROS FM TEAM
            </span>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </Button>
        </div>

        {/* User profile */}
        <div className={cn(
          "border-b border-sidebar-border p-4 transition-all",
          sidebarOpen ? "flex items-center gap-3" : "flex flex-col items-center py-4"
        )}>
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {sidebarOpen && (
            <div>
              <p className="font-medium text-sm text-sidebar-foreground">Cliente Nutrição</p>
              <p className="text-xs text-sidebar-foreground opacity-75">Plano: Premium</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="flex flex-col gap-1">
            {navigation.map((item) => (
              <li key={item.to} className="relative group">
                <NavItem 
                  to={item.to} 
                  label={item.label} 
                  icon={item.icon} 
                  active={location.pathname === item.to} 
                />
                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {item.label}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <Button 
            variant="outline" 
            className={cn(
              "w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/80",
              !sidebarOpen && "p-2"
            )}
            onClick={() => window.location.href = "/"}
          >
            {sidebarOpen ? "Sair" : <ChevronLeft size={16} />}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        sidebarOpen ? "ml-64" : "ml-[70px]"
      )}>
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur h-16 border-b px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">ÁREA DE MEMBROS FM TEAM</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings size={20} />
            </Button>
          </div>
        </header>
        <div className="container py-6 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MembersLayout;
