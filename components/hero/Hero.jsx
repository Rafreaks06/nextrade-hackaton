"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function HeroContent() {
  const ref = useRef(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 0);

    return () => clearTimeout(t);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.25], [0, -150]);

  return (
    <section ref={ref} className="relative h-[150vh]"> 
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center">
        
        <motion.h1
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={isReady ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{ opacity, y: translateY }}
          className="text-[10vw] font-black leading-none font-sans tracking-tight"
        >
          NEXTRADE
        </motion.h1>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={isReady ? { width: "60%", opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ opacity }}
          className="h-[3px] bg-white mt-4 mb-4"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isReady ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ opacity }}
          className="text-lg text-white/70 tracking-wide"
        >
          AI Export Analyzer
        </motion.p>

      </div>
    </section>
  );
}
