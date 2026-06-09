import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useTransform } from 'motion/react';

const steps = [
  { 
    id: 1, 
    title: 'Problem Discovery', 
    desc: 'Understanding requirements, researching user needs, and defining project goals.', 
    tech: ['Requirements Gathering', 'User Research', 'Figma'],
    image: '/projects/process_step_1.png'
  },
  { 
    id: 2, 
    title: 'System Design', 
    desc: 'Designing database structures, APIs, workflows, and system architecture.', 
    tech: ['Architecture', 'UML', 'Database Design'],
    image: '/projects/process_step_2.png'
  },
  { 
    id: 3, 
    title: 'Development', 
    desc: 'Building frontend and backend systems using modern web technologies.', 
    tech: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    image: '/projects/process_step_3.png'
  },
  { 
    id: 4, 
    title: 'Testing & Optimization', 
    desc: 'Debugging, improving performance, responsiveness, and security.', 
    tech: ['Lighthouse', 'Jest', 'Performance Profiling'],
    image: '/projects/process_step_4.png'
  },
  { 
    id: 5, 
    title: 'Deployment & Continuous Learning', 
    desc: 'Deploying applications to cloud environments and continuously improving them.', 
    tech: ['Docker', 'Azure', 'CI/CD'],
    image: '/projects/process_step_5.png'
  },
];

export function EngineeringProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.2) setActiveStep(0);
    else if (latest < 0.4) setActiveStep(1);
    else if (latest < 0.6) setActiveStep(2);
    else if (latest < 0.8) setActiveStep(3);
    else setActiveStep(4);
  });

  const step = steps[activeStep];
  
  // Continuous live animations based on scroll
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#02040a] lg:h-[220vh]">
      
      {/* --- DESKTOP SCROLL-DRIVEN LAYOUT --- */}
      <div className="hidden lg:flex sticky top-0 h-[100dvh] w-full overflow-hidden flex-row">
        
        {/* LEFT: EXACTLY 50% Image Area */}
        <div className="relative w-1/2 h-[100dvh] shrink-0 overflow-hidden bg-[#02040a]">
           <AnimatePresence mode="wait">
             <motion.div 
               key={`img-${step.id}`}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.6, ease: "easeInOut" }}
               className="absolute inset-0 w-full h-full origin-center"
             >
               <motion.img 
                 src={step.image} 
                 alt={step.title} 
                 style={{ scale: imageScale }}
                 className="w-full h-full object-cover" 
               />
               <div className="absolute inset-0 bg-[#02040a]/30" />
               <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#02040a] to-transparent z-10" />
             </motion.div>
           </AnimatePresence>
        </div>

        {/* CENTER TIMELINE */}
        <div className="absolute left-1/2 top-[15%] bottom-[15%] w-[1px] bg-white/10 -translate-x-1/2 z-20 flex flex-col justify-between items-center">
             <motion.div 
               className="absolute top-0 left-0 w-full h-full bg-[#00E5FF] origin-top shadow-[0_0_15px_rgba(0,229,255,0.8)] z-0"
               style={{ scaleY: scrollYProgress }}
             />

             {steps.map((s, i) => {
                const isActive = i <= activeStep;
                return (
                  <div 
                    key={s.id} 
                    className={`relative z-10 w-12 h-12 rounded-full border flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all duration-300 ${
                      isActive ? 'bg-[#00E5FF] border-[#00E5FF] text-[#02040a] scale-110' : 'bg-[#02040a] border-white/20 text-slate-400 scale-100'
                    }`}
                  >
                    {s.id}
                  </div>
                );
             })}
        </div>

        {/* RIGHT: EXACTLY 50% Content Area */}
        <div className="relative w-1/2 h-[100dvh] bg-[#02040a] overflow-hidden">
             <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-xl left-24 pr-0">
               <AnimatePresence mode="wait">
                 <motion.div 
                   key={`text-${step.id}`}
                   initial={{ opacity: 0, y: 15 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -15 }}
                   transition={{ duration: 0.4, ease: "easeOut" }}
                   className="flex flex-col"
                 >
                      <div className="text-sm text-slate-400 mb-4 font-mono tracking-widest uppercase">
                          0{step.id} / 05 &nbsp;&nbsp;&nbsp; Engineering Process
                      </div>
                      <h3 className="text-5xl font-bold text-white mb-6 tracking-tight">
                          {step.title}
                      </h3>
                      <p className="text-slate-300 text-lg leading-relaxed mb-8">
                          {step.desc}
                      </p>
                      
                      {step.tech && (
                        <div className="flex flex-wrap gap-3">
                          {step.tech.map(t => (
                            <span key={t} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[#00E5FF]">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                 </motion.div>
               </AnimatePresence>
             </div>
        </div>
      </div>

      {/* --- MOBILE STACKED TIMELINE LAYOUT --- */}
      <div className="flex lg:hidden flex-col px-6 py-20 bg-[#02040a]">
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Engineering Process</h2>
            <div className="h-1 w-16 bg-[#00E5FF] rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
        </div>

        <div className="relative border-l border-white/10 ml-4 pl-8 pb-4 flex flex-col gap-16">
          {steps.map((s) => (
            <div key={s.id} className="relative flex flex-col gap-5">
               {/* Timeline Node exactly on the border line */}
               <div className="absolute -left-12 top-0 w-8 h-8 rounded-full border border-[#00E5FF] bg-[#02040a] flex items-center justify-center font-bold text-xs text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.3)] z-10">
                  {s.id}
               </div>
               
               <h3 className="text-2xl font-bold text-white tracking-tight leading-tight mt-0.5">
                   {s.title}
               </h3>
               
               <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/10 shadow-lg mt-2">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#02040a]/20" />
               </div>

               <p className="text-slate-300 text-[15px] leading-relaxed">
                   {s.desc}
               </p>
               
               {s.tech && (
                 <div className="flex flex-wrap gap-2 mt-1">
                   {s.tech.map(t => (
                     <span key={t} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-[#00E5FF]">
                       {t}
                     </span>
                   ))}
                 </div>
               )}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
