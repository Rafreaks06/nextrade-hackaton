"use client";

import { motion } from "framer-motion";

export default function ToolsShowcase() {
  return (
    <section className="w-full py-40 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        
        {/* LEFT — IMAGE (BIGGER DISPLAY) */}
<motion.div
  initial={{ opacity: 0, x: -40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true }}
  className="relative"
>

  {/* FRAME BORDER */}
  <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />

  {/* IMAGE WRAPPER (BIGGER HEIGHT) */}
  <div className="
    relative rounded-3xl overflow-hidden 
    bg-[#0d0d0d] border border-white/10 shadow-2xl 
    w-full h-[420px] md:h-[480px] lg:h-[520px]
  ">
    <img
      src="/demo-image.png"
      alt="Demo NexTrade"
      className="w-full h-full object-cover scale-[1.03]"
    />
  </div>
</motion.div>


        {/* RIGHT — TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6 text-white">
            Lihat Bagaimana NexTrade<br /> Menganalisis Pasar Anda
          </h2>

          <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-xl">
            Dari deteksi HS Code otomatis hingga pembacaan permintaan global serta 
            perhitungan potensi profit, semua analisis dilakukan secara instan 
            melalui AI NexTrade. Tanpa riset manual, tanpa tumpukan data—cukup masukkan produk Anda.
          </p>

        </motion.div>

      </div>
    </section>
  );
}
