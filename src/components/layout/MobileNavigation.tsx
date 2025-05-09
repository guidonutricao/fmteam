import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Book, Calendar, ChevronLeft, Dumbbell, FileText, Gift, 
  ListCheck, Home, Star, Users, Utensils, Video
} from 'lucide-react';

interface MobileNavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}

const MobileNavItem = ({ to, label, icon, active }: MobileNavItemProps) => (
  <Link 
    to={to}
    className={cn(
      "flex flex-col items-center justify-center text-xs px-1",
      "transition-colors duration-200 ease-in-out",
      active 
        ? "text-primary" 
        : "text-muted-foreground hover:text-primary/80"
    )}
  >
    <div className={cn(
      "flex items-center justify-center w-10 h-10 rounded-full mb-1",
      active ? "bg-primary/10" : "bg-transparent"
    )}>
      {icon}
    </div>
    <span className="text-[10px] font-medium truncate max-w-[60px] text-center">
      {label}
    </span>
  </Link>
);

const MobileNavigation = () => {
  const location = useLocation();

  const mainNav = [
    { to: "/dashboard", label: "Início", icon: <Home size={20} /> },
    { to: "/plano-alimentar", label: "Plano", icon: <Utensils size={20} /> },
    { to: "/treino", label: "Treinos", icon: <Dumbbell size={20} /> },
    { to: "/substituicoes", label: "Alimentos", icon: <FileText size={20} /> },
    { to: "/check-in", label: "Check-in", icon: <ListCheck size={20} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border z-50 flex items-center justify-around px-1 md:hidden">
      {mainNav.map((item) => (
        <MobileNavItem
          key={item.to}
          to={item.to}
          label={item.label}
          icon={item.icon}
          active={location.pathname === item.to}
        />
      ))}
    </div>
  );
};

export default MobileNavigation; 