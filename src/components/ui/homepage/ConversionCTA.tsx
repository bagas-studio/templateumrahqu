import { MessageCircle, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { buildWhatsAppUrl } from "./utils";

interface ConversionCTAProps {
  headline?: string;
  description?: string;
  /** Nomor WhatsApp CS, mis. "081234567890" atau "6281234567890" */
  whatsappNumber: string;
  /** Pesan otomatis saat jamaah membuka WhatsApp */
  whatsappMessage?: string;
  /** Label tombol utama */
  ctaLabel?: string;
  /** Nomor telepon kantor untuk tombol sekunder; sembunyi jika kosong */
  phoneNumber?: string;
  /** Badge kecil di atas headline */
  eyebrow?: string;
}

export function ConversionCTA({
  headline = "Siap Menunaikan Ibadah Umroh Bersama Kami?",
  description = "Konsultasikan rencana perjalanan Anda sekarang. Tim customer service kami siap membantu memilih paket yang paling sesuai dengan kebutuhan dan anggaran Anda.",
  whatsappNumber,
  whatsappMessage = "Assalamualaikum, saya ingin berkonsultasi mengenai paket umroh yang tersedia.",
  ctaLabel = "Hubungi CS via WhatsApp",
  phoneNumber,
  eyebrow = "Konsultasi Gratis",
}: ConversionCTAProps) {
  const waUrl = buildWhatsAppUrl(whatsappNumber, whatsappMessage);

  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/75 px-6 py-12 text-center shadow-xl ring-1 ring-white/10 sm:px-12 sm:py-16">
          {/* Dekorasi latar */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-secondary/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"
          />

          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur sm:text-sm">
              <Sparkles size={14} aria-hidden="true" />
              {eyebrow}
            </span>

            <h2 className="mt-6 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              {headline}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              {description}
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3.5 text-sm font-bold text-secondary-foreground shadow-lg transition-all hover:brightness-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary active:scale-95 sm:text-base"
              >
                <MessageCircle size={20} aria-hidden="true" />
                {ctaLabel}
              </a>

              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-base"
                >
                  <Phone size={18} aria-hidden="true" />
                  {phoneNumber}
                </a>
              )}
            </div>

            <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-white/70">
              <ShieldCheck size={14} aria-hidden="true" />
              Travel resmi berizin Kemenag · Dana jamaah aman &amp; transparan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
