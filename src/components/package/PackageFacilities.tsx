/* ------------------------------------------------------------------ */
/*  Package Facilities — Includes & Excludes Checklist.                  */
/* ------------------------------------------------------------------ */

import { CheckCircle2, XCircle } from "lucide-react";

interface PackageFacilitiesProps {
  includes: string[] | null;
  excludes: string[] | null;
}

export default function PackageFacilities({ includes, excludes }: PackageFacilitiesProps) {
  const hasIncludes = includes && includes.length > 0;
  const hasExcludes = excludes && excludes.length > 0;

  if (!hasIncludes && !hasExcludes) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Fasilitas</h3>
        <p className="text-slate-500 text-sm">Informasi fasilitas belum tersedia.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Fasilitas Paket</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Includes */}
        {hasIncludes && (
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Sudah Termasuk
            </h3>
            <ul className="space-y-2.5">
              {includes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Excludes */}
        {hasExcludes && (
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              Tidak Termasuk
            </h3>
            <ul className="space-y-2.5">
              {excludes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
