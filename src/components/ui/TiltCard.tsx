import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useEffect, useState, type ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function TiltCard({ children, className = '', intensity = 8 }: { children: ReactNode; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHoverable, setIsHoverable] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Detect if device supports hover
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsHoverable(mq.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsHoverable(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 150, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    if (!isHoverable || prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  
  const handleLeave = () => { 
    if (!isHoverable || prefersReducedMotion) return;
    x.set(0); 
    y.set(0); 
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ 
        rotateX: isHoverable && !prefersReducedMotion ? rx : 0, 
        rotateY: isHoverable && !prefersReducedMotion ? ry : 0, 
        transformStyle: 'preserve-3d', 
        perspective: 1000 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
