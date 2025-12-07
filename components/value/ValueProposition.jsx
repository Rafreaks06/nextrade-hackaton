"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ValueProposition() {
  const ref = useRef(null);

  // Scroll hanya untuk fade-out & slide-up
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 20%"],
  });

  const fade = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const move = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      className="h-[80vh] bg-black text-white flex items-center justify-center px-6"
    >
      {/* Wrapper yang ikut scroll */}
      <motion.div
        style={{ opacity: fade, y: move }}
        className="sticky top-0 h-screen flex items-center justify-center"
      >
        {/* Teks — blur hanya untuk animasi masuk, TIDAK terikat scroll */}
        <motion.p
          initial={{ opacity: 0, y: 25, filter: "blur(50px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.7 }}
          className="
            max-w-4xl mx-auto text-center
            text-3xl md:text-5xl
            leading-tight font-medium
            text-white
          "
        >
          NexTrade membantu bisnis menembus pasar ekspor
          dengan analisis AI yang presisi dan berbasis data tepercaya.
        </motion.p>

      </motion.div>
    </section>
  );
}
