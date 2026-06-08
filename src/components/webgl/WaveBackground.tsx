import { useEffect, useRef } from 'react';
import { useDeviceTier } from '../../hooks/useDeviceTier';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function WaveBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useRef(true);
  const tier = useDeviceTier();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    
    const pixelRatioScale = tier === 'low' ? 1 : tier === 'medium' ? 1.25 : 1.5;
    const dpr = Math.min(window.devicePixelRatio || 1, pixelRatioScale);
    let w = 0, h = 0;
    let t = 0;
    
    // Lower tiers have fewer wave points
    const step = tier === 'low' ? 16 : tier === 'medium' ? 12 : 8;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
    }, { rootMargin: '100px' });
    io.observe(canvas);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!inView.current) return;

      t += 0.004;
      ctx.clearRect(0, 0, w, h);

      const layers = [
        { amp: 60, freq: 0.0035, speed: 1.0, y: h * 0.55, color: 'rgba(0, 229, 255, 0.18)' },
        { amp: 80, freq: 0.0028, speed: 0.7, y: h * 0.65, color: 'rgba(56, 189, 248, 0.14)' },
        { amp: 110, freq: 0.0022, speed: 0.4, y: h * 0.78, color: 'rgba(34, 211, 238, 0.10)' },
      ];
      for (const l of layers) {
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += step) {
          const y = l.y
            + Math.sin(x * l.freq + t * l.speed) * l.amp
            + Math.sin(x * l.freq * 2.1 + t * l.speed * 1.4) * l.amp * 0.35;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        const grd = ctx.createLinearGradient(0, l.y - l.amp, 0, h);
        grd.addColorStop(0, l.color);
        grd.addColorStop(1, 'rgba(10, 12, 16, 0)');
        ctx.fillStyle = grd;
        ctx.fill();
      }
    };
    tick();
    
    return () => { 
      cancelAnimationFrame(raf); 
      ro.disconnect(); 
      io.disconnect();
    };
  }, [tier, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
