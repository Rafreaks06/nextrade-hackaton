"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Apa itu NexTrade?",
      a: "NexTrade adalah platform analisis ekspor berbasis AI yang membantu pelaku usaha menemukan negara tujuan terbaik, membaca permintaan global, menghitung potensi profit, dan menyusun strategi ekspor yang lebih terarah."
    },
    {
      q: "Bagaimana cara NexTrade bekerja?",
      a: "Anda cukup memasukkan nama produk dan (opsional) harga jual. AI akan mendeteksi HS Code, menganalisis data perdagangan global, membaca permintaan negara, membandingkan harga internasional, dan memberi rekomendasi strategi ekspor."
    },
    {
      q: "Apakah saya perlu mengetahui HS Code sendiri?",
      a: "Tidak perlu. NexTrade memiliki AI yang otomatis mengidentifikasi HS Code paling relevan berdasarkan deskripsi produk Anda."
    },
    {
      q: "Apakah data yang digunakan akurat?",
      a: "Ya. NexTrade menggunakan data global tepercaya seperti UN Comtrade, ITC Trade Map, WTO Trade Data, serta kurasi internal untuk tren harga internasional."
    },
    {
      q: "Apa manfaat Mode Kalkulasi Profit?",
      a: "Mode ini menghitung potensi margin, daya saing harga, dan status profit (High / Moderate / Risky) untuk setiap negara. Cocok untuk eksportir yang ingin memastikan harga tetap kompetitif."
    },
    {
      q: "Apakah NexTrade dapat membuat email penawaran?",
      a: "Bisa. NexTrade menyediakan draft email profesional yang siap dikirim ke importir dari negara tujuan."
    },
    {
      q: "Apakah NexTrade gratis?",
      a: "Versi demo dapat digunakan secara gratis. Fitur premium seperti penyimpanan laporan, ekspor PDF, dan riwayat analisis akan tersedia pada versi lanjutan."
    }
  ];

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="w-full py-40 bg-black text-white" id="faq">
      <div className="max-w-4xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold mb-16 text-center"
        >
          Pertanyaan yang Sering Diajukan
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((item, i) => {
            const open = openIndex === i;

            return (
              <motion.div
                key={i}
                onClick={() => toggleFAQ(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
                className="
                  bg-[#121212]
                  border border-white/10
                  rounded-2xl
                  p-6 cursor-pointer select-none
                  transition-all duration-300
                  hover:border-white/20
                "
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-white/90">{item.q}</h3>

                  <motion.span
                    initial={false}
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/60 text-xl"
                  >
                    ▼
                  </motion.span>
                </div>

                <AnimatePresence>
                  {open && (
                    <motion.p
                      key="content"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-white/50 leading-relaxed"
                    >
                      {item.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
