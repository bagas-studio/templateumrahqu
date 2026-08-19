import Link from "next/link";
import { Package, Home, ArrowLeft } from "lucide-react";

export default function PackageNotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <Package className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Paket Tidak Ditemukan</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Maaf, paket umroh yang Anda cari tidak tersedia atau mungkin sudah tidak aktif.
          Silakan cek kembali daftar paket kami yang tersedia.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-95"
          >
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <Link
            href="/packages"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold bg-white hover:bg-slate-50 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Lihat Semua Paket
          </Link>
        </div>
      </div>
    </main>
  );
}
