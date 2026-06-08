import { useEffect, useRef, useState } from 'react';

export function useInViewMount<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { rootMargin: '200px 0px', threshold: 0 }
) {
  const ref = useRef<T | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) setActive(e.isIntersecting);
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, [options.rootMargin, options.threshold]);

  return { ref, active };
}
