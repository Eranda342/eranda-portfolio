import { HTMLAttributes } from 'react';
import { Reveal } from './Reveal';
import { cn } from '../../utils/cn';

interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  title: React.ReactNode;
}

export function SectionHeading({ label, title, className, ...props }: SectionHeadingProps) {
  return (
    <div className={cn('mb-16', className)} {...props}>
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--ink-3)] mb-4">
          — {label}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-serif text-4xl sm:text-6xl leading-tight max-w-3xl text-gradient">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
