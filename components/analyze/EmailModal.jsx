"use client";
import { X, Copy } from "lucide-react";

export default function EmailModal({ isOpen, onClose, content }) {
  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-700 w-full max-w-2xl rounded-xl p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X />
        </button>
        
        <h3 className="text-xl font-bold text-white mb-2">Draft Surat Penawaran</h3>
        <p className="text-sm text-blue-400 mb-4">
            Kirim ke: <b>{content.target_contact?.office}</b> ({content.target_contact?.email})
        </p>

        <div className="bg-gray-800 p-4 rounded text-gray-300 text-sm whitespace-pre-wrap h-64 overflow-y-auto mb-4 font-mono">
            {content.email_draft}
        </div>

        <div className="flex justify-end gap-2">
            <button 
                onClick={() => navigator.clipboard.writeText(content.email_draft)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition"
            >
                <Copy size={16}/> Salin Teks
            </button>
            <a 
                href={`mailto:${content.target_contact?.email}?subject=Export Proposal&body=${encodeURIComponent(content.email_draft)}`}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded font-bold transition"
            >
                Buka Email App
            </a>
        </div>
      </div>
    </div>
  );
}