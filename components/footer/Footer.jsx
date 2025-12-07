export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* MAIN STATEMENT */}
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-16 text-white/90">
          SCROLL ENDS HERE. <br />
          OPPORTUNITIES DONT.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-24">

          {/* LEFT — MINI TAGLINE */}
          <div className="max-w-sm">
            <p className="text-white/60 text-xl leading-relaxed">
              Trade smarter. Export further.
            </p>

            <p className="mt-4 text-white/40 leading-relaxed">
              Wawasan kecil dapat membuka pasar yang besar. NexTrade membantu Anda 
              melihat langkah selanjutnya dengan lebih jelas.
            </p>
          </div>

          {/* RIGHT — DESCRIPTION */}
          <p className="text-white/50 leading-relaxed text-lg max-w-xl">
            NexTrade membantu usaha Indonesia melihat peluang ekspor dengan perspektif 
            modern — dari analisis harga global, permintaan negara, hingga strategi 
            komunikasi profesional. Satu platform, banyak insight yang berarti.
          </p>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Brand */}
          <span className="text-white/40 text-sm">
            © {new Date().getFullYear()} NexTrade. Designed for clarity.
          </span>

          {/* Footer navigation */}
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#features" className="hover:text-white/70 transition">Features</a>
            <a href="#faq" className="hover:text-white/70 transition">FAQ</a>
            <a href="/analyze" className="hover:text-white/70 transition">Analyze</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
