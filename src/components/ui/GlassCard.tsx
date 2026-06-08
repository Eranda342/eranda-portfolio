import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glowIntensity?: 'low' | 'medium' | 'high';
  accentColor?: string;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glowIntensity = 'low', accentColor, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative glass overflow-hidden rounded-[22px]',
          {
            'glow-ring hover-lift': glowIntensity === 'high',
          },
          className
        )}
        {...props}
      >
        {accentColor && (
          <div 
            className="absolute -top-16 -right-16 h-44 w-44 rounded-full blur-3xl opacity-30 transition-opacity duration-700 group-hover:opacity-70 pointer-events-none" 
            style={{ background: accentColor }} 
          />
        )}
        {children}
      </div>
    );
  }
);
GlassCard.displayName = 'GlassCard';
