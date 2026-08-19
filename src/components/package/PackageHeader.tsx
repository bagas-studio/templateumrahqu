/* ------------------------------------------------------------------ */
/*  Package Header — Breadcrumb + Judul Paket + Badge Fasilitas.         */
/* ------------------------------------------------------------------ */

import { Clock, Calendar, Plane, Hotel, Star } from "lucide-react";
import type { PackageDetail } from "@/types/package-detail";

interface PackageHeaderProps {
  tenant: { name: string; logo_url: string | null };
  packageDetail: PackageDetail;
}

/* ------------------------------------------------------------------ */
/*  Reusable Star Rating                                              */
/* ------------------------------------------------------------------ */

function StarRating({ count, size = 14 }: { count: number; size?: number }) {
  const clamped = Math.max(0, Math.min(5, Math.round(count)));
  return (
    <div
      className="inline-flex items-center gap-0.5"
      aria-label={`${clamped} bintang`}
      style={{ gap: "2px" }}
    >
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={
            i < clamped
              ? "text-amber-400 fill-amber-400 drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
              : "text-slate-200 fill-slate-100"
          }
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable Pill Badge                                               */
/* ------------------------------------------------------------------ */

function PillBadge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-medium whitespace-nowrap">
      {icon}
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-900 font-semibold">{value}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export default function PackageHeader({
  tenant,
  packageDetail,
}: PackageHeaderProps) {
  const {
    name,
    duration_days,
    departure_date,
    airline,
    hotel_makkah,
    hotel_madinah,
    hotel_makkah_star,
    hotel_madinah_star,
  } = packageDetail;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Belum ditentukan";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-4">
          <a
            href="/"
            className="text-slate-500 hover:text-primary transition-colors"
          >
            Beranda
          </a>
          <span className="text-slate-400">/</span>
          <a
            href="/packages"
            className="text-slate-500 hover:text-primary transition-colors"
          >
            Paket Umroh
          </a>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium truncate">{name}</span>
        </nav>

        {/* Judul Paket */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
          {name}
        </h1>

        {/* Badge Fasilitas */}
        <div className="flex flex-wrap gap-2">
          {duration_days > 0 && (
            <PillBadge
              icon={<Clock className="w-4 h-4 text-primary" />}
              label="Durasi"
              value={`${duration_days} Hari`}
            />
          )}

          <PillBadge
            icon={<Calendar className="w-4 h-4 text-primary" />}
            label="Berangkat"
            value={formatDate(departure_date)}
          />

          {airline && (
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium whitespace-nowrap shadow-sm">
              <Plane className="w-4 h-4 text-slate-600" />
              <span className="text-slate-500">Maskapai</span>
              <span className="text-slate-900 font-semibold">{airline}</span>
            </span>
          )}

          {hotel_makkah && (
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-150 text-slate-700 text-sm font-medium whitespace-nowrap shadow-sm">
              <Hotel className="w-4 h-4 text-amber-600" />
              <span className="text-slate-500">Makkah</span>
              <span className="text-slate-900 font-semibold">{hotel_makkah}</span>
              {hotel_makkah_star && (
                <span className="ml-0.5 flex items-center">
                  <StarRating count={hotel_makkah_star} size={13} />
                </span>
              )}
            </span>
          )}

          {hotel_madinah && (
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-150 text-slate-700 text-sm font-medium whitespace-nowrap shadow-sm">
              <Hotel className="w-4 h-4 text-amber-600" />
              <span className="text-slate-500">Madinah</span>
              <span className="text-slate-900 font-semibold">{hotel_madinah}</span>
              {hotel_madinah_star && (
                <span className="ml-0.5 flex items-center">
                  <StarRating count={hotel_madinah_star} size={13} />
                </span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
