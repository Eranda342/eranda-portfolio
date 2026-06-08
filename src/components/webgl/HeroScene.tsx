import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

export function HeroScene() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const rx = useTransform(sy, [-1, 1], [12, -12]);
  const ry = useTransform(sx, [-1, 1], [-12, 12]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <div className="relative h-full w-full" style={{ perspective: 1200 }}>
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full flex items-center justify-center"
      >
        {/* Outer halo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute h-[78%] w-[78%] rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(0,229,255,0.0), rgba(0,229,255,0.55), rgba(0,229,255,0.45), rgba(56,189,248,0.55), rgba(0,229,255,0.0))',
            filter: 'blur(40px)',
            opacity: 0.7,
          }}
        />

        {/* Orbit ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
          className="absolute h-[72%] w-[72%] rounded-full border border-white/10"
          style={{ transform: 'rotateX(70deg)' }}
        >
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-[#00E5FF]" style={{ boxShadow: '0 0 24px #00E5FF' }} />
        </motion.div>
        {/* Orbit ring 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute h-[88%] w-[88%] rounded-full border border-white/[0.06]"
          style={{ transform: 'rotateX(60deg) rotateZ(20deg)' }}
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-[#22D3EE]" style={{ boxShadow: '0 0 18px #22D3EE' }} />
        </motion.div>
        {/* Orbit ring 3 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="absolute h-[58%] w-[58%] rounded-full border border-white/10"
          style={{ transform: 'rotateX(75deg) rotateY(15deg)' }}
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-[#38BDF8]" style={{ boxShadow: '0 0 18px #38BDF8' }} />
        </motion.div>

        {/* Core orb */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative h-[44%] w-[44%] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85) 0%, rgba(56,189,248,0.6) 20%, rgba(0,229,255,0.35) 45%, rgba(20,30,50,0.9) 80%)',
            boxShadow:
              '0 0 80px rgba(0,229,255,0.45), inset 0 0 60px rgba(0,229,255,0.35), inset 0 -20px 60px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Highlight */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 28% 22%, rgba(255,255,255,0.7) 0%, transparent 30%)',
            }}
          />
          {/* Inner ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[12%] rounded-full border border-white/20"
            style={{ borderStyle: 'dashed' }}
          />
        </motion.div>

        {/* Floating particles */}
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2;
          const r = 38 + (i % 3) * 6;
          return (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{
                left: `calc(50% + ${Math.cos(angle) * r}%)`,
                top: `calc(50% + ${Math.sin(angle) * r}%)`,
                background: i % 2 ? '#22D3EE' : '#38BDF8',
                boxShadow: `0 0 10px ${i % 2 ? '#22D3EE' : '#38BDF8'}`,
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.2, 0.6] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
