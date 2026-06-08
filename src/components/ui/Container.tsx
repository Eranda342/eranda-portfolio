import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mx-auto max-w-7xl px-6 sm:px-10', className)}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';
