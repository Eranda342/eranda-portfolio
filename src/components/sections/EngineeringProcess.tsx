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
    <section ref={containerRef} className="relative h-[300vh] w-full bg-[#02040a]">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col lg:flex-row">
        
        {/* LEFT: EXACTLY 50% Image Area */}
        <div className="relative w-full lg:w-1/2 h-[40dvh] lg:h-[100dvh] shrink-0 overflow-hidden bg-[#02040a]">
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
               {/* Dark overlay to ensure contrast */}
               <div className="absolute inset-0 bg-[#02040a]/30" />
               {/* Gradient blending perfectly into the right panel */}
               <div className="hidden lg:block absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#02040a] to-transparent z-10" />
               {/* Mobile gradient blending into the bottom panel */}
               <div className="lg:hidden absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#02040a] to-transparent z-10" />
             </motion.div>
           </AnimatePresence>
        </div>

        {/* CENTER TIMELINE - Desktop */}
        <div className="hidden lg:flex absolute left-1/2 top-[15%] bottom-[15%] w-[1px] bg-white/10 -translate-x-1/2 z-20 flex-col justify-between items-center">
             {/* Live Scroll Progress Line */}
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

        {/* CENTER TIMELINE - Mobile */}
        <div className="lg:hidden absolute top-[40dvh] left-6 right-6 h-[1px] bg-white/10 z-20 flex justify-between items-center -translate-y-1/2">
             {/* Live Scroll Progress Line */}
             <motion.div 
               className="absolute top-0 left-0 h-full w-full bg-[#00E5FF] origin-left shadow-[0_0_15px_rgba(0,229,255,0.8)] z-0"
               style={{ scaleX: scrollYProgress }}
             />

             {steps.map((s, i) => {
                const isActive = i <= activeStep;
                return (
                  <div 
                    key={s.id} 
                    className={`relative z-10 w-10 h-10 rounded-full border flex items-center justify-center font-bold text-base transition-all duration-300 ${
                      isActive ? 'bg-[#00E5FF] border-[#00E5FF] text-[#02040a] scale-110' : 'bg-[#02040a] border-white/20 text-slate-400 scale-100'
                    }`}
                  >
                    {s.id}
                  </div>
                );
             })}
        </div>

        {/* RIGHT: EXACTLY 50% Content Area */}
        <div className="relative w-full lg:w-1/2 h-[60dvh] lg:h-[100dvh] bg-[#02040a] overflow-hidden">
             <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-xl left-6 lg:left-24 pr-12 lg:pr-0">
               <AnimatePresence mode="wait">
                 <motion.div 
                   key={`text-${step.id}`}
                   initial={{ opacity: 0, y: 15 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -15 }}
                   transition={{ duration: 0.4, ease: "easeOut" }}
                   className="flex flex-col"
                 >
                      <div className="text-xs lg:text-sm text-slate-400 mb-3 lg:mb-4 font-mono tracking-widest uppercase">
                          0{step.id} / 05 &nbsp;&nbsp;&nbsp; Engineering Process
                      </div>
                      <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 tracking-tight">
                          {step.title}
                      </h3>
                      <p className="text-slate-300 text-base lg:text-lg leading-relaxed mb-6 lg:mb-8">
                          {step.desc}
                      </p>
                      
                      {step.tech && (
                        <div className="flex flex-wrap gap-2 lg:gap-3">
                          {step.tech.map(t => (
                            <span key={t} className="px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-white/5 border border-white/10 text-[11px] lg:text-sm text-[#00E5FF]">
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
    </section>
  );
}
