"use client";

import { useState } from "react";
import axios from "axios";

import Navbar from "@/components/navbar/Navbar";
import MapViz from "@/components/analyze/MapViz";
import SearchBar from "@/components/analyze/SearchBar";
import InsightPanel from "@/components/analyze/InsightPanel";
import EmailModal from "@/components/analyze/EmailModal";

export default function AnalyzePage() {

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [emailData, setEmailData] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // 🔍 ANALYZE FUNCTION
  const handleAnalyze = async (formData) => {
    setLoading(true);
    setResult(null);

    try {
      const priceToSend = formData.price ? parseFloat(formData.price) : null;

      const response = await axios.post(
        "http://localhost:8000/api/analyze",
        {
          product_name: formData.product,
          price_idr: priceToSend,
          unit: formData.unit
        }
      );

      setResult(response.data);
      setIsPanelOpen(true);

    } catch (error) {
      alert("Gagal mengambil data: " + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  // 📧 EMAIL GENERATOR
  const handleGenerateEmail = async (countryCode) => {
    if (!result) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/email/draft",
        {
          product_name: result.meta.product,
          target_country_code: countryCode
        }
      );

      setEmailData(response.data.data);

    } catch (error) {
      alert("Gagal membuat email: " + error.message);
    }
  };

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden font-sans">
        <Navbar />

      {/* BACKGROUND MAP */}
      <div className="absolute inset-0 z-0">
        <MapViz data={result ? result.map_data : []} />
      </div>

      {/* SEARCH BAR */}
      <SearchBar onAnalyze={handleAnalyze} loading={loading} />

      {/* ANALYSIS PANEL */}
      {isPanelOpen && result && (
        <InsightPanel 
          data={result.map_data}
          meta={result.meta}
          aiText={result.ai_insight}
          onGenerateEmail={handleGenerateEmail}
          onClose={() => setIsPanelOpen(false)}
        />
      )}

      {/* EMAIL MODAL */}
      <EmailModal 
        isOpen={!!emailData}
        onClose={() => setEmailData(null)}
        content={emailData}
      />

    </main>
  );
}
