/* ------------------------------------------------------------------ */
/*  Package Content — Deskripsi Paket (Overview Tab).                    */
/* ------------------------------------------------------------------ */

interface PackageContentProps {
  packageDetail: { name: string; description: string | null };
}

export default function PackageContent({ packageDetail }: PackageContentProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Gambaran Umum</h2>
      <p className="text-slate-600 leading-relaxed whitespace-pre-line">
        {packageDetail.description || "Deskripsi belum tersedia. Silakan hubungi kami untuk informasi lebih lanjut."}
      </p>
    </div>
  );
}
