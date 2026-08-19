/* ------------------------------------------------------------------ */
/*  Booking Sidebar — Single sticky floating card desktop (lg+).       */
/*  Features:                                                          */
/*    • sticky top-24 shadow-xl rounded-3xl bg-white border p-6       */
/*    • Price text-3xl font-extrabold text-primary                     */
/*    • Hotel quick-info row w/ star rating (Makkah / Madinah)        */
/*    • Departure date pill                                            */
/*    • Quota progress bar (dynamic colour)                            */
/*    • CTA w-full rounded-2xl py-4 font-bold bg-primary text-white    */
/*    • Trust badges (compact 2-col)                                   */
/*    • WhatsApp contact link                                          */
/* ------------------------------------------------------------------ */

"use client";

import {
  Shield,
  CheckCircle,
  MessageCircle,
  Calendar,
  MapPin,
  Hotel,
  Star,
} from "lucide-react";
import type { PackageDetail } from "@/types/package-detail";

interface BookingSidebarProps {
  packageDetail: PackageDetail;
  tenant: { name: string };
}

function barColor(freeRatio: number): string {
  if (freeRatio <= 0) return "bg-red-500";
  if (freeRatio < 0.2) return "bg-red-500";
  if (freeRatio < 0.6) return "bg-amber-500";
  return "bg-green-500";
}

function MiniStars({ count, size = 10 }: { count: number; size?: number }) {
  const clamped = Math.max(0, Math.min(5, Math.round(count)));
  return (
    <span className="inline-flex items-center gap-px" aria-label={`${clamped} bintang`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i < clamped ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-100"}
        />
      ))}
    </span>
  );
}

export default function BookingSidebar({
  packageDetail,
  tenant,
}: BookingSidebarProps) {
  const {
    name,
    price,
    quota,
    remaining_quota,
    departure_date,
    hotel_makkah,
    hotel_makkah_star,
    hotel_madinah,
    hotel_madinah_star,
  } = packageDetail;

  const formatPrice = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Belum ditentukan";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const isSoldOut = remaining_quota <= 0;
  const isLow = remaining_quota > 0 && remaining_quota <= 5;
  const freeRatio = quota > 0 ? Math.max(0, Math.min(1, remaining_quota / quota)) : 0;
  const bar = barColor(freeRatio);

  const waText =
    `Assalamu'alaikum, saya tertarik dengan paket *${name}* ` +
    `seharga ${formatPrice(price)}. Mohon info lebih lanjut.`;
  const waLink = `https://wa.me/?text=${encodeURIComponent(waText)}`;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 shadow-xl rounded-3xl border border-slate-100 bg-white p-6 space-y-5">
        <div className="border-b border-slate-100 pb-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-1">Paket Umroh</p>
          <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">{name}</h3>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Harga Per Orang</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-medium text-slate-400">IDR</span>
            <span className="text-3xl font-extrabold text-primary leading-tight">
              {formatPrice(price).replace("IDR ", "")}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Termasuk <span className="font-medium text-slate-700">akomodasi, tiket pesawat & layanan umroh</span>
          </p>
        </div>

        {(hotel_makkah || hotel_madinah) && (
          <div className="grid grid-cols-2 gap-2">
            {hotel_makkah && (
              <div className="bg-amber-50 border border-amber-150 rounded-xl p-2.5">
                <p className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-amber-700 mb-1 font-semibold">
                  <Hotel className="w-3 h-3" /> Makkah
                </p>
                <p className="text-xs font-bold text-slate-800 truncate leading-tight">{hotel_makkah}</p>
                {hotel_makkah_star && <div className="mt-1"><MiniStars count={hotel_makkah_star} size={10} /></div>}
              </div>
            )}
            {hotel_madinah && (
              <div className="bg-amber-50 border border-amber-150 rounded-xl p-2.5">
                <p className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-amber-700 mb-1 font-semibold">
                  <Hotel className="w-3 h-3" /> Madinah
                </p>
                <p className="text-xs font-bold text-slate-800 truncate leading-tight">{hotel_madinah}</p>
                {hotel_madinah_star && <div className="mt-1"><MiniStars count={hotel_madinah_star} size={10} /></div>}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-2.5">
          <Calendar className="w-4 h-4 text-primary shrink-0" />
          <span className="text-xs text-slate-500">Berangkat</span>
          <span className="text-xs font-semibold text-slate-900 ml-auto">
            {formatDate(departure_date)}
          </span>
        </div>

        {quota > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-600">
                <MapPin className="w-3.5 h-3.5 inline mr-1" />
                Kuota Tersedia
              </p>
              <p className="text-xs font-bold text-slate-900">
                <span className={freeRatio < 0.2 ? "text-red-600" : ""}>{remaining_quota}</span>
                <span className="text-slate-400 font-normal ml-1">/ {quota}</span>
              </p>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${bar} transition-all duration-500`}
                style={{ width: `${freeRatio * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 text-center">
              {isSoldOut
                ? "Kuota sudah habis"
                : isLow
                  ? `Hanya tersisa ${remaining_quota} tempat!`
                  : freeRatio < 0.6
                    ? "Kuota mulai menyusut — segera daftar"
                    : "Kuota masih cukup tersedia"}
            </p>
          </div>
        )}

        <a
          href={isSoldOut ? "#" : waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => isSoldOut && e.preventDefault()}
          className={`
            flex items-center justify-center gap-2.5
            w-full rounded-2xl py-4 font-bold text-white
            transition-all duration-200
            ${isSoldOut
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-primary hover:opacity-90 hover:shadow-lg active:scale-[0.98] shadow-lg"
            }
          `}
        >
          <MessageCircle className="w-5 h-5" />
          {isSoldOut ? "Paket Habis" : "Pesan Sekarang via WhatsApp"}
        </a>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <Shield className="w-3 h-3 text-green-600" />
            </div>
            <p className="text-[11px] font-semibold text-slate-700 leading-tight">Izin Resmi PPIU</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <CheckCircle className="w-3 h-3 text-blue-600" />
            </div>
            <p className="text-[11px] font-semibold text-slate-700 leading-tight">Transaksi Aman</p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <p className="text-xs text-slate-500 text-center mb-2">Butuh bantuan?</p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl py-2.5 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Chat WhatsApp
          </a>
          <p className="text-[11px] text-center text-slate-400 mt-1.5">
            {tenant.name} — Respon cepat
          </p>
        </div>
      </div>
    </aside>
  );
}
