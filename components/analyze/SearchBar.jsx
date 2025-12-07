"use client";
import { useState } from "react";
import { Search, Scale, DollarSign } from "lucide-react";

export default function SearchBar({ onAnalyze, loading }) {
  const [form, setForm] = useState({ product: "", price: "", unit: "kg" });
  const [isPriceEnabled, setIsPriceEnabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.product.trim()) return;
    onAnalyze({
      product: form.product,
      price: isPriceEnabled ? form.price : null,
      unit: form.unit
    });
  };

  return (
    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 w-full max-w-4xl px-4">

      {/* === Main Glass Card === */}
      <div className="
        bg-black/60 backdrop-blur-xl rounded-3xl 
        border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.45)]
        p-6 space-y-5
      ">

        {/* ======================
              SEARCH BAR
        ======================= */}
        <div className="flex gap-3 items-center">

          {/* Input Box */}
          <div className="
            flex items-center flex-grow 
            bg-white/5 backdrop-blur-md
            border border-white/10 
            rounded-2xl px-5 py-3 
            hover:border-white/20
            transition
          ">
            <Search size={20} className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Cari produk (contoh: Kopi Gayo, Rotan, Cabai)..."
              className="
                bg-transparent text-white w-full 
                placeholder-gray-500 
                outline-none font-medium
              "
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
            />
          </div>

          {/* BUTTON ANALISA */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              bg-gradient-to-r from-blue-600 to-blue-500
              hover:from-blue-500 hover:to-blue-400
              text-white font-semibold
              px-8 py-3 rounded-2xl
              shadow-lg transition 
              disabled:opacity-40 disabled:cursor-not-allowed
            "
          >
            {loading ? "Scanning..." : "Analisa"}
          </button>
        </div>

        {/* ======================
            PRICING TOGGLE ROW
        ======================= */}
        <div className="flex items-center gap-6">

          {/* Toggle Switch */}
          <div
            onClick={() => setIsPriceEnabled(!isPriceEnabled)}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div
              className={`
                w-12 h-7 rounded-full p-1 
                flex items-center 
                transition-all duration-300
                ${isPriceEnabled ? "bg-green-500" : "bg-gray-600"}
              `}
            >
              <div
                className={`
                  w-5 h-5 bg-white rounded-full shadow-md transform 
                  transition-all duration-300
                  ${isPriceEnabled ? "translate-x-5" : ""}
                `}
              ></div>
            </div>

            <span
              className={`
                font-medium text-sm transition
                ${isPriceEnabled ? "text-green-400" : "text-gray-400"}
              `}
            >
              {isPriceEnabled
                ? "Mode Kalkulasi Profit"
                : "Mode Riset Pasar (Tanpa Harga)"}
            </span>
          </div>

          {/* Harga + Satuan */}
          {isPriceEnabled && (
            <div
              className="
                flex items-center gap-4 
                bg-white/5 border border-white/10 backdrop-blur-md
                px-4 py-2.5 rounded-xl 
                animate-in fade-in slide-in-from-left-4 duration-300
              "
            >
              {/* Harga */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-s font-semibold">
                  Rp
                </span>

                <input
                  type="number"
                  placeholder="Harga"
                  className="
                    bg-transparent text-white pl-9 pr-3 py-1.5 
                    border border-white/10 rounded-lg w-36 outline-none
                    focus:border-green-400 transition
                  "
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>


              <span className="text-gray-500">/</span>

              {/* Unit */}
              <div className="relative">
              <Scale size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />

              <select
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className="
                  bg-[#0d0d0d]/90 text-white 
                  pl-8 pr-6 py-2 
                  rounded-lg border border-gray-700
                  outline-none
                  appearance-none
                  focus:border-green-500
                  cursor-pointer
                "
              >
                <option className="bg-[#0d0d0d] text-white" value="kg">Kg</option>
              </select>

              {/* CUSTOM CARET ▼ */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="12" className="text-gray-400">
                  <path
                    d="M2 4L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
