"use client";
import { motion } from "framer-motion";
import { Send, FileText, X, TrendingUp } from "lucide-react";

export default function InsightPanel({ data, meta, aiText, onGenerateEmail, onClose }) {
  if (!data) return null;

  // Cek mode pricing
  const isPricingMode = meta.mode === "pricing";

  // 🔍 Parser: pecah AI text jadi card-card
  function parseAnalysis(text) {
    if (!text) return [];

    const lines = text.split(/\n+/).filter(Boolean);

    return lines
      .map((line) => {
        const match = line.match(/\*\*(.+?):\*\*\s*(.*)/);
        if (!match) return null;
        return {
          title: match[1].trim(),
          content: match[2].trim(),
        };
      })
      .filter(Boolean);
  }

  const parsedCards = parseAnalysis(aiText);

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="absolute top-0 right-0 h-full w-[450px] bg-black/95 backdrop-blur-xl border-l border-gray-800 p-6 text-white overflow-y-auto z-60 shadow-2xl"
    >
      {/* Close Button */}
      <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition">
        <X size={24} />
      </button>

      {/* Header Produk */}
      <div className="mb-6 mt-2">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 uppercase tracking-wide">
          {meta.product}
        </h2>

        <div className="flex flex-wrap gap-3 mt-2 items-center text-sm">
          {/* === HS CODE BADGE WITH INFO TOOLTIP === */}
          <div className="relative group flex items-center gap-2 cursor-pointer">

            {/* BADGE */}
            <span className="bg-gray-800 px-2 py-1 rounded text-gray-300 font-mono border border-gray-700 flex items-center gap-1">
              HS: {meta.hs_code_detected}
            </span>


            {/* TOOLTIP BOX */}
            <div
              className="
                absolute left-0 top-9
                hidden group-hover:flex 
                flex-col
                w-72
                bg-black/70 
                text-white/90 
                p-4 
                rounded-xl 
                border border-blue-500/20
                shadow-[0_0_20px_rgba(0,170,255,0.25)]
                backdrop-blur-xl
                z-50
                scale-95 opacity-0
                group-hover:scale-100 
                group-hover:opacity-100
                transition-all duration-200 ease-out
              "
            >
              {/* TITLE */}
              <p className="font-semibold text-blue-300 text-sm mb-1">
                Apa itu HS Code?
              </p>

              {/* CONTENT */}
              <p className="text-xs text-white/70 leading-relaxed">
                HS (Harmonized System) adalah kode internasional untuk
                mengklasifikasikan barang dalam perdagangan global. Dipakai
                bea cukai & analisis ekspor di seluruh dunia.
              </p>

              {/* BLUE GLOW LINE */}
              <div className="mt-3 h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent"></div>

              {/* ARROW */}
              <div className="absolute -top-2 left-4 w-0 h-0 
                border-l-8 border-r-8 border-b-8 
                border-transparent border-b-blue-500/20"></div>
            </div>
          </div>


          {/* Harga user (pricing mode) */}
          {isPricingMode && meta.user_price_usd > 0 && (
            <span className="flex items-center gap-1 bg-green-900/30 text-green-400 px-2 py-1 rounded border border-green-800/50">
              <TrendingUp size={14} />
              Your Price: <b>${meta.user_price_usd}</b> / {meta.unit || "kg"}
            </span>
          )}
        </div>
      </div>

      {/* =======================
          AI ANALYSIS CARDS
      ========================== */}
      <div className="mb-10">
        <h3 className="flex items-center gap-2 font-semibold text-white/90 text-lg mb-3">
          <FileText size={18} className="text-blue-400" />
          {isPricingMode ? "Analisis Profitabilitas" : "Analisis Peluang Pasar"}
        </h3>

        {parsedCards.length === 0 ? (
          <p className="text-white/50 text-sm italic">Sedang memuat analisis...</p>
        ) : (
          <div className="space-y-4">
            {parsedCards.map((card, idx) => (
              <div
                key={idx}
                className="
                  bg-[#0f0f0f]/80 
                  backdrop-blur-xl 
                  p-4 
                  rounded-xl 
                  border border-white/5
                  shadow-[0_0_25px_rgba(0,0,0,0.25)]
                  hover:shadow-[0_0_30px_rgba(0,0,0,0.35)]
                  transition-all
                "
              >
                {/* TITLE */}
                <h4 className="text-white font-semibold text-[15px] mb-1 tracking-wide">
                  {card.title}
                </h4>

                {/* CONTENT */}
                <p className="text-white/65 text-sm leading-relaxed">
                  {card.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

            {/* Leaderboard Table */}
      <div className="flex justify-between items-end mb-4">
        <h3 className="font-bold text-lg text-white/90">Top Export Destinations</h3>
        <span className="text-xs text-gray-500">Source: UN Comtrade</span>
      </div>

      <div className="space-y-4 pb-28">
        {data.length === 0 ? (
          <div className="text-center text-gray-500 py-10 italic">
            Data pasar spesifik tidak ditemukan.
          </div>
        ) : (
          data.map((item, idx) => (
            <div
              key={idx}
              className="
                group relative 
                bg-[#0f0f0f]/70 
                rounded-2xl 
                border border-white/5 
                p-5 
                shadow-[0_0_20px_rgba(0,0,0,0.35)] 
                hover:shadow-[0_0_28px_rgba(0,0,0,0.5)]
                transition-all duration-300
              "
            >
              {/* TOP ROW */}
              <div className="flex justify-between items-start mb-3">
                
                {/* Country + Flag */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getFlagEmoji(item.iso_code)}</span>
                    <h4 className="text-white text-lg font-semibold tracking-wide">
                      {item.country_name}
                    </h4>
                  </div>

                  <div className="mt-2 space-y-1 text-sm text-white/60">
                    <p>
                      Volume:{" "}
                      <span className="text-white font-medium">
                        ${formatCurrency(item.volume)}
                      </span>
                    </p>
                    <p>
                      Market Price:{" "}
                      <span className="text-blue-300 font-mono">
                        ${item.market_price.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>

                {/* STATUS BADGE */}
                {isPricingMode ? (
                  <div
                    className={`
                      text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider
                      border 
                      ${
                        item.profit_analysis.status === "HIGH_PROFIT"
                          ? "bg-green-900/40 text-green-300 border-green-800/40"
                          : item.profit_analysis.status === "MODERATE"
                          ? "bg-yellow-900/40 text-yellow-300 border-yellow-800/40"
                          : "bg-red-900/40 text-red-300 border-red-800/40"
                      }
                    `}
                  >
                    {item.profit_analysis.status.replace("_", " ")}
                  </div>
                ) : (
                  <div className="text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider bg-blue-900/40 text-blue-300 border border-blue-800/40">
                    High Demand
                  </div>
                )}
              </div>

              {/* BUTTON */}
              <button
                onClick={() => onGenerateEmail(item.iso_code)}
                className="
                  mt-3 w-full py-2 
                  bg-gray-800/60 
                  hover:bg-blue-600 hover:text-white 
                  text-gray-400 
                  rounded-xl 
                  text-xs font-bold uppercase tracking-wider 
                  flex items-center justify-center gap-2 
                  transition-all duration-300
                "
              >
                <Send size={14} /> Draft Email Penawaran
              </button>
            </div>
          ))
        )}
      </div>

    </motion.div>
  );
}

/* FORMAT ANGGKA */
function formatCurrency(num) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  return (num / 1000).toFixed(0) + "K";
}

/* FLAG EMOJI */
function getFlagEmoji(countryCode) {
  if (!countryCode) return "🌍";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
