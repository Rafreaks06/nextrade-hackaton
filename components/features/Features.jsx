"use client";

import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      title: "AI PRODUCT INTELLIGENCE",
      desc: "AI otomatis mengenali produk Anda, menentukan HS Code yang tepat, dan menganalisis peluang ekspor berbasis data perdagangan global."
    },
    {
      title: "MARKET FINDER",
      desc: "Temukan negara dengan permintaan tertinggi—AI menunjukkan pasar terbaik berdasarkan tren ekspor, volume dagang, dan potensi masuk pasar."
    },
    {
      title: "GLOBAL PRICE INSIGHT",
      desc: "Bandingkan harga internasional dengan harga lokal Anda untuk menilai potensi margin dan menentukan strategi harga yang kompetitif."
    },
    {
      title: "SMART EXPORT EMAIL",
      desc: "AI menyusun email penawaran profesional yang siap dikirimkan kepada importir dari negara tujuan—tanpa perlu menulis dari awal."
    },
  ];

  return (
    <section id="features" className="w-full py-40 bg-black text-white scroll-mt-0">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION IDENTITY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white/90">
            Fitur Utama NexTrade
          </h2>

          <p className="text-lg text-white/40 max-w-2xl leading-relaxed">
            Dirancang khusus untuk membantu eksportir Indonesia memahami peluang
            pasar global, menghitung profit, dan berkomunikasi profesional dengan pembeli internasional.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial="initial"
              whileHover="hover"
              className="
                relative h-[260px] bg-[#161616] border border-white/5
                overflow-hidden cursor-pointer select-none
              "
            >

              {/* TITLE WRAPPER */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center px-8"
                variants={{
                  initial: { opacity: 1, y: 0, filter: "blur(0px)" },
                  hover: {
                    opacity: 0,
                    y: -25,
                    filter: "blur(10px)",
                    transition: { duration: 0.4, ease: "easeOut" },
                  },
                }}
              >
                <h3 className="text-2xl font-semibold text-white/90 text-center">
                  {item.title}
                </h3>
              </motion.div>

              {/* DESC WRAPPER */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center px-8"
                variants={{
                  initial: { opacity: 0, y: 25, filter: "blur(10px)" },
                  hover: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.45, ease: "easeOut" },
                  },
                }}
              >
                <p className="text-base text-white/70 text-center leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>

              {/* LINE WIPE */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-white/20"
                variants={{
                  initial: { width: 0 },
                  hover: {
                    width: "100%",
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
