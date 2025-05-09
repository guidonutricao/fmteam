import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackButtonProps {
  label?: string;
  className?: string;
  to?: string;
}

const BackButton = ({ label = "Voltar", className, to }: BackButtonProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "mb-4 gap-1 pl-0 hover:pl-1 transition-all",
        className
      )}
      onClick={handleClick}
    >
      <ChevronLeft size={18} />
      {label}
    </Button>
  );
};

export default BackButton; 