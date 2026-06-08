import { useScroll, useTransform, MotionValue } from 'motion/react';
import { RefObject } from 'react';

export function useParallax(ref: RefObject<HTMLElement | null>, distance: number = 50): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
}
