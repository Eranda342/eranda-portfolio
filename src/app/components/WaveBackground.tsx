import { useEffect, useRef } from 'react';

export function WaveBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0;
    let t = 0;
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

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.004;
      ctx.clearRect(0, 0, w, h);

      const layers = [
        { amp: 60, freq: 0.0035, speed: 1.0, y: h * 0.55, color: 'rgba(167, 139, 250, 0.18)' },
        { amp: 80, freq: 0.0028, speed: 0.7, y: h * 0.65, color: 'rgba(129, 140, 248, 0.14)' },
        { amp: 110, freq: 0.0022, speed: 0.4, y: h * 0.78, color: 'rgba(196, 181, 253, 0.10)' },
      ];
      for (const l of layers) {
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 8) {
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
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
