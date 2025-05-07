
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  to,
  className,
  variant = 'default'
}) => {
  return (
    <Card className={cn(
      "card-hover overflow-hidden border",
      variant === 'primary' && "border-primary/20 bg-primary/5",
      variant === 'secondary' && "border-secondary/20 bg-secondary/5",
      variant === 'outline' && "border-muted-foreground/20",
      className
    )}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className={cn(
          "rounded-full p-2",
          variant === 'primary' && "bg-primary/20 text-primary",
          variant === 'secondary' && "bg-secondary/20 text-secondary", 
          variant === 'default' && "bg-muted text-muted-foreground",
          variant === 'outline' && "bg-muted/50 text-muted-foreground"
        )}>
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="ghost" className="ml-auto" asChild>
          <Link to={to} className="flex items-center gap-1">
            Acessar <ChevronRight size={16} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
