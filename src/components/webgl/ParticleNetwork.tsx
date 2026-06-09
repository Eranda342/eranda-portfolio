import { useEffect, useRef } from 'react';
import { useDeviceTier } from '../../hooks/useDeviceTier';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type Node = { x: number; y: number; z: number; vx: number; vy: number; vz: number };

export function ParticleNetwork({ density = 0.00009, className = '' }: { density?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const running = useRef(true);
  const inView = useRef(true);
  const tier = useDeviceTier();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true })!;
    
    // Scale pixel ratio and density by tier
    const pixelRatioScale = tier === 'low' ? 1 : tier === 'medium' ? 1.25 : 1.75;
    let dpr = Math.min(window.devicePixelRatio || 1, pixelRatioScale);
    let w = 0, h = 0;
    let nodes: Node[] = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      const densityMultiplier = tier === 'low' ? 0.3 : tier === 'medium' ? 0.6 : 1;
      const count = Math.max(20, Math.min(140, Math.floor(w * h * density * densityMultiplier)));
      
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 1 + 0.2,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        vz: (Math.random() - 0.5) * 0.002,
      }));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
    }, { rootMargin: '100px' });
    io.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - r.left;
      mouse.current.y = e.clientY - r.top;
      mouse.current.active = true;
    };
    const onLeave = () => { mouse.current.active = false; mouse.current.x = -9999; mouse.current.y = -9999; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    const visibility = () => { running.current = !document.hidden; };
    document.addEventListener('visibilitychange', visibility);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!running.current || !inView.current) return;
      ctx.clearRect(0, 0, w, h);

      const mx = mouse.current.x, my = mouse.current.y, active = mouse.current.active;
      const linkDist = Math.min(160, Math.max(110, Math.sqrt(w * h) / 9));
      const mouseRadius = 180;

      for (const n of nodes) {
        if (active) {
          const dx = n.x - mx, dy = n.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < mouseRadius * mouseRadius && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / mouseRadius) * 0.6;
            n.vx += (dx / d) * f * 0.12;
            n.vy += (dy / d) * f * 0.12;
            n.z = Math.min(1.5, n.z + f * 0.02);
          } else {
            n.z = Math.max(0.2, n.z - 0.004);
          }
        } else {
          n.z = Math.max(0.2, n.z - 0.002);
        }

        n.x += n.vx; n.y += n.vy;
        n.vx *= 0.985; n.vy *= 0.985;
        if (n.vx > -0.05 && n.vx < 0.05) n.vx += (Math.random() - 0.5) * 0.01;
        if (n.vy > -0.05 && n.vy < 0.05) n.vy += (Math.random() - 0.5) * 0.01;

        if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist * linkDist) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / linkDist) * 0.4 * Math.min(a.z, b.z);
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (active) {
        for (const n of nodes) {
          const dx = n.x - mx, dy = n.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < mouseRadius * mouseRadius) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / mouseRadius) * 0.45;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const r = 1.2 + n.z * 1.4;
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        grd.addColorStop(0, `rgba(34, 211, 238, ${0.7 * n.z})`);
        grd.addColorStop(1, 'rgba(34, 211, 238, 0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(237, 233, 254, ${0.9 * n.z})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [density, tier, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
