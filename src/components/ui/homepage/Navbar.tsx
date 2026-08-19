"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { buildWhatsAppUrl } from "./utils";

interface TenantMeta {
  name: string;
  logo_url?: string | null;
  whatsapp_number?: string | null;
  primary_color?: string;
}

interface NavbarProps {
  tenant: TenantMeta;
}

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/paket", label: "Paket Umroh" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/kontak", label: "Kontak" },
] as const;

const BRAND_PRIMARY = "var(--primary, #0D9488)";
const BRAND_SECONDARY = "var(--secondary, #F59E0B)";

function LogoFallback({ tenantName }: { tenantName: string }) {
  const initial = (tenantName || "T").trim().charAt(0).toUpperCase();
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ring-1 ring-white/20"
      style={{
        background: `linear-gradient(135deg, ${BRAND_PRIMARY} 0%, ${BRAND_SECONDARY} 130%)`,
      }}
    >
      {initial}
    </span>
  );
}

function BrandLogo({ tenant }: { tenant: TenantMeta }) {
  return tenant.logo_url ? (
    <Image
      src={tenant.logo_url}
      alt={tenant.name}
      width={40}
      height={40}
      className="h-9 w-9 rounded-full object-contain shadow-sm ring-1 ring-black/5"
      unoptimized
    />
  ) : (
    <LogoFallback tenantName={tenant.name || "Travel Umroh"} />
  );
}

export function Navbar({ tenant }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const waUrl = tenant.whatsapp_number
    ? buildWhatsAppUrl(tenant.whatsapp_number)
    : "#";

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${BRAND_PRIMARY} 0%, ${BRAND_SECONDARY} 100%)`,
        }}
      />

      <nav
        className="w-full backdrop-blur-md bg-white/80 border-b border-slate-100 shadow-sm"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Kembali ke beranda"
            >
              <BrandLogo tenant={tenant} />
              <span className="text-base font-extrabold tracking-tight text-slate-800 group-hover:text-primary transition-colors duration-200">
                {tenant.name || "Travel Umroh"}
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-7">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="relative text-sm font-medium text-slate-600 hover:text-primary transition-all duration-200 after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95"
                style={{ backgroundColor: BRAND_PRIMARY }}
              >
                <Phone size={15} strokeWidth={2.2} />
                Hubungi Kami
              </a>
            </div>

            <button
              type="button"
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-primary"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-[60vh]" : "max-h-0"}`}
        >
          <div className="px-4 pb-5 pt-3 border-t border-slate-100 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50 hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-[1.02] active:scale-98"
                style={{ backgroundColor: BRAND_PRIMARY }}
                onClick={() => setMobileOpen(false)}
              >
                <Phone size={15} strokeWidth={2.2} />
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

