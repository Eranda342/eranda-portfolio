import { useScroll, MotionValue } from 'motion/react';
import { RefObject } from 'react';

export function useScrollProgress(ref?: RefObject<HTMLElement | null>): MotionValue<number> {
  const options = ref ? { target: ref, offset: ['start center', 'end center'] as any } : undefined;
  const { scrollYProgress } = useScroll(options);
  return scrollYProgress;
}
