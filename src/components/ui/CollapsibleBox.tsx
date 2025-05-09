import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleBoxProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

const CollapsibleBox = ({ 
  title, 
  children, 
  icon, 
  className,
  defaultOpen = false
}: CollapsibleBoxProps) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "w-full border rounded-lg overflow-hidden mb-4 bg-card shadow-sm",
        className
      )}
    >
      <CollapsibleTrigger className="w-full flex items-center justify-between p-4 hover:bg-accent/25 transition-colors">
        <div className="flex items-center gap-2 text-base font-medium">
          {icon && <div className="text-primary">{icon}</div>}
          {title}
        </div>
        <ChevronDown
          size={18}
          className={cn(
            "text-muted-foreground transition-transform duration-200",
            isOpen && "transform rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4 pt-2 animate-collapsible-down">
        <div className="border-t pt-2 mt-1">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleBox; 