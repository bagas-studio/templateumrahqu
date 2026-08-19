import Image from "next/image";
import {
  ShieldCheck,
  BadgeCheck,
  Sparkles,
  Users,
  Heart,
  Star,
  Clock,
  Plane,
  Building2,
  Award,
  Globe,
} from "lucide-react";
import type { TrustBannerProps, TrustPartnerProps } from "./types";
import { formatDateID, getInitials } from "./utils";

type IconComponent = React.ComponentType<
  { size?: number | string } & React.SVGProps<SVGSVGElement>
>;

const STAT_ICON_MAP: Record<string, IconComponent> = {
  Users,
  Heart,
  Star,
  Clock,
  ShieldCheck,
  Award,
  Sparkles,
  Globe,
  Plane,
  Building2,
};

const DEFAULT_STATS: TrustBannerProps["stats"] = [
  { value: "12.000+", label: "Jamaah Terlayani", iconName: "Users" },
  { value: "15", label: "Tahun Pengalaman", iconName: "Clock" },
  { value: "4.9/5", label: "Rating Kepuasan", iconName: "Star" },
  { value: "100%", label: "Visa Sukses", iconName: "ShieldCheck" },
];

const DEFAULT_PARTNERS: TrustBannerProps["partners"] = [
  { name: "Kemenag RI" },
  { name: "Saudia Airlines" },
  { name: "Garuda Indonesia" },
  { name: "Etihad Airways" },
  { name: "Bank BTN" },
  { name: "BSI Syariah" },
];

const DEFAULT_ACCREDITATION: string[] = [
  "PPIU Kemenag RI",
  "Asosiasi Haji & Umroh Indonesia",
  "Partner Saudi Tourism Authority",
];

function PartnerBadge({ partner }: { partner: TrustPartnerProps }) {
  if (partner.logo_url) {
    return (
      <div
        className="flex h-18 w-full items-center justify-center rounded-xl border border-slate-100 bg-white px-3 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md"
        aria-label={partner.name}
        title={partner.name}
      >
        <Image
          src={partner.logo_url}
          alt={partner.name}
          fill
          sizes="120px"
          className="h-auto max-h-full w-auto max-w-full object-contain p-2"
        />
      </div>
    );
  }
  return (
    <div
      className="flex h-18 flex-col items-center justify-center gap-1 rounded-xl border border-slate-100 bg-slate-50 px-2 text-center shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-white hover:shadow-md"
      aria-label={partner.name}
      title={partner.name}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
        {getInitials(partner.name)}
      </span>
      <span className="text-[11px] font-medium leading-tight text-slate-600">
        {partner.name}
      </span>
    </div>
  );
}

function StatCell({ stat }: { stat: TrustBannerProps["stats"][number] }) {
  const Icon = STAT_ICON_MAP[stat.iconName ?? ""] ?? Sparkles;
  return (
    <div className="flex flex-col items-start gap-1.5 px-1">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon size={16} aria-hidden="true" />
        </div>
        <span className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {stat.value}
        </span>
      </div>
      <span className="text-sm text-slate-500">{stat.label}</span>
    </div>
  );
}

export function TrustBanner({
  title = "Legalitas & Kepercayaan Jamaah",
  subtitle = "Travel kami berizin resmi dan telah dipercaya ribuan jamaah dalam mewujudkan ibadah umroh yang aman dan menyenangkan.",
  license,
  accreditation = DEFAULT_ACCREDITATION,
  stats = DEFAULT_STATS,
  partners = DEFAULT_PARTNERS,
  partnerSectionTitle = "Partner Resmi & Maskapai Kerjasama",
}: TrustBannerProps) {
  return (
    <section className="bg-gray-50 py-16 sm:py-20" aria-labelledby="trust-banner-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 id="trust-banner-title" className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-500 sm:text-base">
            {subtitle}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white shadow-xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="col-span-1 relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-primary to-primary/90 p-6 text-white lg:col-span-2 lg:rounded-l-3xl lg:rounded-tr-none">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/10 blur-2xl"
              />

              <div className="relative">
                <div className="flex items-start gap-3">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/25">
                    <ShieldCheck size={24} aria-hidden="true" />
                    <span
                      aria-hidden="true"
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-primary shadow-sm"
                    >
                      <BadgeCheck size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/80">
                      Terverifikasi Resmi
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white">
                      {license?.authority ?? "Kementerian Agama RI"}
                    </p>
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-bold text-white sm:text-2xl">
                  Izin Resmi PPIU
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">
                  Travel perjalanan ibadah kami terdaftar dan diawasi langsung oleh Kementerian Agama Republik Indonesia.
                </p>

                <div className="mt-5 rounded-xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/70">
                    Nomor Izin Resmi
                  </p>
                  <p className="mt-1 font-mono text-base font-bold text-white">
                    {license?.number ?? "\u2014"}
                  </p>
                  {license?.issued_at && (
                    <p className="mt-1 text-xs text-white/65">
                      Diterbitkan {formatDateID(license.issued_at)}
                    </p>
                  )}
                </div>

                {accreditation && accreditation.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {accreditation.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/90">
                        <BadgeCheck size={14} className="mt-0.5 shrink-0 text-white" aria-hidden="true" />
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="col-span-1 flex flex-1 flex-col gap-8 p-6 lg:col-span-3 lg:rounded-r-3xl">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-gray-500">
                  Kepercayaan Jamaah
                </p>
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
                  {stats.slice(0, 4).map((stat, i) => (
                    <StatCell key={stat.label + "-" + i} stat={stat} />
                  ))}
                </div>
              </div>
              {partners && partners.length > 0 && (
                <div className="mt-2 flex-1">
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-500">
                    {partnerSectionTitle}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {partners.map((partner) => (
                      <PartnerBadge key={partner.name} partner={partner} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

