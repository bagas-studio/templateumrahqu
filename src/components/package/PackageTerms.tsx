/* ------------------------------------------------------------------ */
/*  Package Terms — Syarat & Ketentuan Pembayaran & Pembatalan.          */
/* ------------------------------------------------------------------ */

import { FileText, AlertCircle } from "lucide-react";

interface PackageTermsProps {
  termsConditions: string | null;
}

export default function PackageTerms({ termsConditions }: PackageTermsProps) {
  if (!termsConditions) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <FileText className="w-7 h-7 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Syarat & Ketentuan</h3>
        <p className="text-slate-500 text-sm">Syarat dan ketentuan belum tersedia.</p>
      </div>
    );
  }

  // Parse terms: split by newlines, filter empty lines
  const lines = termsConditions
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Syarat & Ketentuan</h2>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Penting untuk Diketahui</p>
          <p className="text-xs text-amber-700 mt-1">Mohon baca syarat & ketentuan berikut dengan saksama sebelum melakukan pemesanan.</p>
        </div>
      </div>

      <ul className="space-y-3">
        {lines.map((line, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
            <span className="text-sm text-slate-700 leading-relaxed">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
