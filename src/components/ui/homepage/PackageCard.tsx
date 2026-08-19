"use client";

import Image from "next/image";
import Link from "next/link";
import { PackageProps } from "./types";
import {
  Plane,
  Hotel,
  Users,
  Star,
  CalendarDays,
  Clock,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";

const PRIMARY = "var(--primary, #0D9488)";
const SECONDARY = "var(--secondary, #F59E0B)";

interface PackageCardProps {
  pkg: PackageProps;
}

function formatPrice(price: number, currency = "IDR"): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function getCategoryLabel(category: string): string {
  const map: Record<string, string> = {
    reguler: "Reguler",
    vip: "VIP",
    ramadhan: "Ramadhan",
  };
  return map[category] || category;
}

function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    reguler: "bg-blue-100 text-blue-700",
    vip: "bg-amber-100 text-amber-700",
    ramadhan: "bg-emerald-100 text-emerald-700",
  };
  return map[category] || "bg-slate-100 text-slate-700";
}

/* --------------------------- Card UI --------------------------- */

function generateSlug(pkg: PackageProps): string {
  if (pkg.slug) return pkg.slug;
  return pkg.id;
}

export function PackageCard({ pkg }: PackageCardProps) {
  const isLowQuota = pkg.quota_remaining <= 5 && pkg.quota_remaining > 0;
  const isSoldOut = pkg.quota_remaining <= 0;
  const quotaPercent =
    pkg.quota_total > 0
      ? Math.round(
          ((pkg.quota_total - pkg.quota_remaining) / pkg.quota_total) * 100
        )
      : 0;

  const departureFormatted = new Date(pkg.departure_date).toLocaleDateString(
    "id-ID",
    { day: "numeric", month: "short", year: "numeric" }
  );

  return (
    <article
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl"
      aria-labelledby={`pkg-title-${pkg.id}`}
    >
      {/* ------------------------ Hero image 16:9 ------------------------ */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-200">
        <Image
          src={pkg.image_url}
          alt={pkg.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
        />
        {/* ---------- Floating badges on image (glassmorphism) ---------- */}
        {/* Left-top: category + featured */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${getCategoryColor(pkg.category)}`}
          >
            {getCategoryLabel(pkg.category)}
          </span>
          {pkg.is_featured && (
            <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground shadow-sm">
              <Star size={12} fill="currentColor" />
              Unggulan
            </span>
          )}
        </div>
        {/* Right-bottom of image: duration + quota glassmorphic */}
        <div className="absolute right-3 bottom-3 flex flex-row-reverse gap-1.5 sm:flex-col sm:items-end">
          <span
            aria-hidden="true"
            className="flex items-center gap-1 rounded-full backdrop-blur-md bg-black/40 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/20"
          >
            <Clock size={12} />
            {pkg.duration_days} Hari
          </span>
          <span
            aria-hidden="true"
            className={`flex items-center gap-1 rounded-full backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/20 ${
              isSoldOut
                ? "bg-red-600/70"
                : isLowQuota
                  ? "bg-amber-500/70"
                  : "bg-black/40"
            }`}
          >
            <Users size={12} />
            {isSoldOut
              ? "Habis!"
              : `Sisa ${pkg.quota_remaining}`}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3
          id={`pkg-title-${pkg.id}`}
          className="text-xl font-bold leading-tight text-slate-800 line-clamp-2"
        >
          {pkg.name}
        </h3>
        {pkg.description && (
          <p className="mt-1.5 text-sm text-slate-500 line-clamp-2">
            {pkg.description}
          </p>
        )}

        {/* Departure date — subtle row under title */}
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <CalendarDays size={14} className="shrink-0 text-slate-400" />
          <span>{departureFormatted}</span>
        </div>

        {/* Divider */}
        <div className="mt-4 border-t border-slate-100" />

        {/* Micro-badges: Hotel + Airline, bg-slate-50 */}
        <div className="mt-4 flex flex-wrap gap-2">
          {(pkg.hotel_name || pkg.hotel_stars > 0) && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700">
              <Hotel size={13} className="text-slate-400" />
              {pkg.hotel_stars > 0 && (
                <span
                  className="font-medium"
                  style={{ color: SECONDARY }}
                >
                  {"★".repeat(Math.min(pkg.hotel_stars, 5))}
                </span>
              )}
              <span className="max-w-[120px] truncate sm:max-w-[180px]">
                {pkg.hotel_name || ""}
              </span>
            </span>
          )}
          {pkg.airline_name && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700">
              <Plane size={13} className="text-slate-400" />
              <span className="max-w-[140px] truncate sm:max-w-[220px]">
                {pkg.airline_name}
              </span>
              {pkg.airline_logo && (
                <BadgeCheck size={12} className="text-primary" />
              )}
            </span>
          )}
        </div>

        {/* Divider before price/CTA */}
        <div className="mt-4 border-t border-slate-100" />

        {/* Price + CTA */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Mulai dari
            </span>
            <span className="text-2xl font-extrabold leading-tight text-primary">
              {formatPrice(pkg.price)}
            </span>
          </div>
          <Link
            href={`/package/${generateSlug(pkg)}`}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:shadow-md hover:shadow-primary/30 active:scale-95"
          >
            Detail
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Quota progress bar */}
        {quotaPercent > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Terisi</span>
              <span>{quotaPercent}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${quotaPercent}%`,
                  backgroundColor:
                    quotaPercent > 80
                      ? "#EF4444"
                      : quotaPercent > 50
                        ? "#F59E0B"
                        : PRIMARY,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
