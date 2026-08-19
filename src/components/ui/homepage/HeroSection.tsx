"use client";

import Image from "next/image";
import Link from "next/link";
import { PlaneTakeoff, Search, Calendar, Users } from "lucide-react";
import { buildWhatsAppUrl } from "./utils";

interface TenantMeta {
  name: string;
  logo_url?: string | null;
  description?: string | null;
  whatsapp_number?: string | null;
  primary_color?: string;
  secondary_color?: string;
}

interface HeroSectionProps {
  tenant: TenantMeta;
}

const PRIMARY = "var(--primary, #0D9488)";
const SECONDARY = "var(--secondary, #F59E0B)";

function LogoMark({ tenantName }: { tenantName: string }) {
  const initial = (tenantName || "T").trim().charAt(0).toUpperCase();
  return (
    <span
      aria-hidden="true"
      className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 shadow-sm backdrop-blur-sm text-2xl font-bold text-white ring-1 ring-white/20"
    >
      {initial}
    </span>
  );
}

export function HeroSection({ tenant }: HeroSectionProps) {
  const waUrl = tenant.whatsapp_number
    ? buildWhatsAppUrl(tenant.whatsapp_number)
    : "#";

  const tagline =
    tenant.description ||
    "Travel umroh terpercaya dengan fasilitas terbaik dan bimbingan sesuai sunnah.";

  return (
    <section className="relative overflow-hidden bg-slate-50 py-18 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(1200px 600px at 15% 10%, ${PRIMARY}22 0%, transparent 60%),
            radial-gradient(900px 500px at 85% 15%, ${SECONDARY}22 0%, transparent 60%),
            radial-gradient(700px 500px at 50% 100%, ${PRIMARY}18 0%, transparent 70%),
            linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)
          `,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #CBD5E1 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: PRIMARY, opacity: 0.14 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -bottom-40 h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{ background: SECONDARY, opacity: 0.14 }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            {tenant.logo_url ? (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-100">
                <Image
                  src={tenant.logo_url}
                  alt={tenant.name}
                  width={48}
                  height={48}
                  className="rounded-full object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <LogoMark tenantName={tenant.name || "Travel Umroh"} />
            )}
          </div>

          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <PlaneTakeoff size={16} aria-hidden="true" />
            Perjalanan Suci Menuju Baitullah
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Wujudkan Rindu Ke{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">Tanah Suci</span>
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 z-0 h-3 w-full rounded bg-primary/20"
              />
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {tagline}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/paket"
              className="flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 active:scale-95"
            >
              Lihat Paket Umroh
              <PlaneTakeoff size={16} />
            </Link>
            <Link
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-slate-50 hover:text-primary"
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full"
                style={{ backgroundColor: PRIMARY }}
              >
                <span aria-hidden="true" className="text-[10px] font-bold text-white">
                  W
                </span>
              </span>
              Konsultasi Gratis
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <div className="rounded-2xl border border-slate-100 bg-white/90 p-5 shadow-2xl backdrop-blur-lg md:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-3">
              <div className="flex flex-1 flex-col gap-1.5 md:flex-nowrap md:flex-row md:gap-3">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 transition-colors hover:border-primary/40">
                  <Search size={18} className="shrink-0 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari paket umroh..."
                    className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                    aria-label="Cari paket umroh"
                    disabled
                  />
                </div>

                <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 transition-colors hover:border-primary/40 md:flex-[0.7]">
                  <Calendar size={18} className="shrink-0 text-slate-400" />
                  <select
                    aria-label="Periode keberangkatan"
                    disabled
                    className="w-full bg-transparent text-sm text-slate-700 focus:outline-none md:text-xs"
                  >
                    <option>Periode Keberangkatan</option>
                    <option>Januari 2025</option>
                    <option>Februari 2025</option>
                    <option>Maret 2025</option>
                    <option>Ramadhan 1447</option>
                  </select>
                </div>

                <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 transition-colors hover:border-primary/40 md:flex-[0.7]">
                  <Users size={18} className="shrink-0 text-slate-400" />
                  <select
                    aria-label="Kategori paket"
                    disabled
                    className="w-full bg-transparent text-sm text-slate-700 focus:outline-none md:text-xs"
                  >
                    <option>Semua Kategori</option>
                    <option>Reguler</option>
                    <option>VIP</option>
                    <option>Ramadhan</option>
                  </select>
                </div>
              </div>

              <Link
                href="/paket"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-95 md:px-8"
              >
                <Search size={16} />
                Cari
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
