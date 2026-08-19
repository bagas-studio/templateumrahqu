import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import type { FooterConfigProps, SocialPlatform } from "./types";
import { buildWhatsAppUrl } from "./utils";

interface FooterProps {
  config: FooterConfigProps;
  /** Kredit builder di bottom bar. Default "UmrohQ" */
  poweredBy?: string;
  poweredByUrl?: string;
}

/* ------------------------------------------------------------------ */
/*  Social icons — lucide-react v1 tidak lagi menyediakan brand icon,  */
/*  jadi dipakai inline SVG (currentColor agar ikut warna parent).     */
/* ------------------------------------------------------------------ */
const SOCIAL_META: Record<SocialPlatform, { label: string; path: string }> = {
  facebook: {
    label: "Facebook",
    path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.45-4.92 8.45-9.94Z",
  },
  instagram: {
    label: "Instagram",
    path: "M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.47.66.25 1.22.6 1.77 1.15.55.55.89 1.11 1.15 1.77.25.64.42 1.36.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77c-.55.55-1.11.89-1.77 1.15-.64.25-1.36.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77.55-.55 1.11-.89 1.77-1.15.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.92.04-1.42.2-1.75.33-.44.17-.75.37-1.08.7-.33.33-.53.64-.7 1.08-.13.33-.29.83-.33 1.75-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.92.2 1.42.33 1.75.17.44.37.75.7 1.08.33.33.64.53 1.08.7.33.13.83.29 1.75.33 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.92-.04 1.42-.2 1.75-.33.44-.17.75-.37 1.08-.7.33-.33.53-.64.7-1.08.13-.33.29-.83.33-1.75.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.92-.2-1.42-.33-1.75a2.9 2.9 0 0 0-.7-1.08 2.9 2.9 0 0 0-1.08-.7c-.33-.13-.83-.29-1.75-.33-1.05-.05-1.37-.06-4.04-.06Zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28Zm0 1.8a3.34 3.34 0 1 0 0 6.68 3.34 3.34 0 0 0 0-6.68Zm5.34-3.25a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z",
  },
  youtube: {
    label: "YouTube",
    path: "M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.51 2.51 0 0 0 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81ZM10 15.5v-7l6 3.5-6 3.5Z",
  },
  tiktok: {
    label: "TikTok",
    path: "M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-1.85-2.48V9.78a5.7 5.7 0 1 0 4.94 5.64V9.01a7.35 7.35 0 0 0 4.31 1.38V7.3a4.29 4.29 0 0 1-3.25-1.48Z",
  },
  twitter: {
    label: "X (Twitter)",
    path: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.64l-5.2-6.8-5.96 6.8H1.7l7.49-8.55L1.04 2.25h6.81l4.87 6.44 5.52-6.44Zm-1.16 17.52h1.83L7.03 4.13H5.06l12.02 15.64Z",
  },
  whatsapp: {
    label: "WhatsApp",
    path: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.01c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.03.24-3.47-.72-2.94-1.16-4.79-4.19-4.94-4.39-.14-.19-1.17-1.56-1.17-2.97s.74-2.11 1-2.4c.26-.29.57-.36.76-.36l.55.01c.17 0 .41-.07.64.48.24.58.8 1.96.87 2.1.07.14.12.31.02.5-.09.19-.19.31-.38.53-.19.22-.29.29-.43.53-.14.24-.03.45.07.65.1.19.62 1.06 1.34 1.72.92.85 1.68 1.11 1.92 1.23.24.12.38.1.52-.06.14-.17.6-.7.76-.94.17-.24.33-.19.55-.12.22.08 1.4.66 1.64.78.24.12.4.19.46.29.06.1.06.6-.18 1.28Z",
  },
};

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d={SOCIAL_META[platform].path} />
    </svg>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-200">
      {children}
    </h3>
  );
}

function LinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {links.map((link) => (
        <li key={`${link.href}-${link.label}`}>
          <Link
            href={link.href}
            className="text-sm text-slate-400 transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer({
  config,
  poweredBy = "UmrohQ",
  poweredByUrl,
}: FooterProps) {
  const { brand, quick_links, package_links, contact, socials } = config;
  const year = config.copyright_year ?? new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Kolom 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              {brand.logo_url ? (
                <Image
                  src={brand.logo_url}
                  alt={brand.name}
                  width={40}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-base font-bold text-white"
                >
                  {brand.name.charAt(0).toUpperCase()}
                </span>
              )}
              <span className="text-lg font-bold text-white">{brand.name}</span>
            </Link>

            {brand.description && (
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {brand.description}
              </p>
            )}

            {brand.address && (
              <address className="mt-5 flex items-start gap-2.5 not-italic">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-slate-400"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-slate-400">
                  {brand.address}
                </span>
              </address>
            )}

            {brand.license_number && (
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-400 ring-1 ring-white/5">
                <ShieldCheck
                  size={13}
                  className="shrink-0 text-slate-400"
                  aria-hidden="true"
                />
                {brand.license_number}
              </p>
            )}
          </div>

          {/* Kolom 2 — Quick Links */}
          <nav aria-label="Navigasi cepat">
            <FooterHeading>Navigasi</FooterHeading>
            <LinkList links={quick_links} />
          </nav>

          {/* Kolom 3 — Kategori Paket */}
          <nav aria-label="Kategori paket">
            <FooterHeading>Kategori Paket</FooterHeading>
            <LinkList links={package_links} />
          </nav>

          {/* Kolom 4 — Kontak & Sosial */}
          <div>
            <FooterHeading>Hubungi Kami</FooterHeading>
            <ul className="mt-4 space-y-3">
              {contact.phone && (
                <li className="flex items-start gap-2.5">
                  <Phone
                    size={16}
                    className="mt-0.5 shrink-0 text-slate-400"
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}

              {contact.whatsapp && (
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 shrink-0 text-slate-400">
                    <SocialIcon platform="whatsapp" />
                  </span>
                  <a
                    href={buildWhatsAppUrl(contact.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {contact.whatsapp}
                  </a>
                </li>
              )}

              {contact.email && (
                <li className="flex items-start gap-2.5">
                  <Mail
                    size={16}
                    className="mt-0.5 shrink-0 text-slate-400"
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${contact.email}`}
                    className="break-all text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {contact.email}
                  </a>
                </li>
              )}

              {contact.office_hours && (
                <li className="flex items-start gap-2.5">
                  <Clock
                    size={16}
                    className="mt-0.5 shrink-0 text-slate-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed text-slate-400">
                    {contact.office_hours}
                  </span>
                </li>
              )}
            </ul>

            {socials && socials.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Ikuti Kami
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={SOCIAL_META[social.platform].label}
                      title={SOCIAL_META[social.platform].label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 ring-1 ring-white/5 transition-all hover:bg-primary hover:text-white hover:ring-primary"
                    >
                      <SocialIcon platform={social.platform} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-xs text-slate-500">
            &copy; {year} {brand.name}. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-xs text-slate-500">
            Powered by{" "}
            {poweredByUrl ? (
              <a
                href={poweredByUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-400 transition-colors hover:text-white"
              >
                {poweredBy}
              </a>
            ) : (
              <span className="font-semibold text-slate-400">{poweredBy}</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}

