import { useEffect, useRef } from 'react';

export function MatrixRain({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0;
    const fontSize = 14;
    let cols = 0;
    let drops: { y: number; speed: number; z: number }[] = [];
    const chars = '0123456789ABCDEF';

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / fontSize);
      drops = Array.from({ length: cols }, () => ({
        y: Math.random() * h,
        speed: 0.5 + Math.random() * 1.4,
        z: 0.4 + Math.random() * 0.8,
      }));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      ctx.fillStyle = 'rgba(10, 12, 16, 0.18)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      for (let i = 0; i < cols; i++) {
        const d = drops[i];
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize + (1 - d.z) * 4;
        ctx.fillStyle = `rgba(196, 181, 253, ${0.18 * d.z})`;
        ctx.fillText(ch, x, d.y);
        ctx.fillStyle = `rgba(237, 233, 254, ${0.55 * d.z})`;
        ctx.fillText(ch, x, d.y - fontSize);
        d.y += d.speed * (0.8 + d.z);
        if (d.y > h + 40) { d.y = -20; d.speed = 0.5 + Math.random() * 1.4; d.z = 0.4 + Math.random() * 0.8; }
      }
    };
    tick();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
