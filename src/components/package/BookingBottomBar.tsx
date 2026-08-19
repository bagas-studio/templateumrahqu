/* ------------------------------------------------------------------ */
/*  Booking Bottom Bar — Mobile-only sticky CTA bar.                    */
/*  Rendered via `lg:hidden fixed bottom-0`.                            */
/*  Shows: compact price + WhatsApp CTA.                                */
/* ------------------------------------------------------------------ */

"use client";

import { MessageCircle, Users } from "lucide-react";
import type { PackageDetail } from "@/types/package-detail";

interface BookingBottomBarProps {
  packageDetail: PackageDetail;
}

export default function BookingBottomBar({
  packageDetail,
}: BookingBottomBarProps) {
  const { name, price, quota, remaining_quota } = packageDetail;

  const formatPrice = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);

  const isSoldOut = remaining_quota <= 0;
  const isLow     = remaining_quota > 0 && remaining_quota <= 5;
  const freeRatio = quota > 0 ? Math.max(0, remaining_quota / quota) : 0;

  const barColor = freeRatio === 0
    ? "bg-red-500"
    : freeRatio < 0.2
      ? "bg-red-500"
      : freeRatio < 0.6
        ? "bg-amber-500"
        : "bg-green-500";

  const waText =
    `Assalamu'alaikum, saya tertarik dengan paket *${name}* ` +
    `seharga ${formatPrice(price)}. Mohon info lebih lanjut.`;
  const waLink = `https://wa.me/?text=${encodeURIComponent(waText)}`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
      <div className="bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Price chip */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-0.5">
              Mulai dari
            </p>
            <p className="text-lg font-extrabold text-primary leading-tight truncate">
              {price > 0 ? formatPrice(price) : "Hubungi Kami"}
            </p>
          </div>

          {/* Quota indicator */}
          <div className="shrink-0 flex items-center gap-1.5 bg-slate-100 rounded-full px-2.5 py-1.5">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[10px] font-medium text-slate-600">
              {isSoldOut
                ? "Habis"
                : isLow
                  ? `Sisa ${remaining_quota}`
                  : "Tersedia"}
            </span>
            {quota > 0 && (
              <div className="w-10 h-1.5 bg-slate-300 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${barColor}`}
                  style={{
                    width: `${Math.min(
                      ((quota - remaining_quota) / quota) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            )}
          </div>

          {/* CTA */}
          <a
            href={isSoldOut ? "#" : waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => isSoldOut && e.preventDefault()}
            className={`
              flex items-center gap-1.5 px-4 py-2.5 rounded-xl
              font-bold text-white text-sm transition-all duration-200
              ${
                isSoldOut
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-primary hover:opacity-90 shadow-md active:scale-[0.97]"
              }
            `}
          >
            <MessageCircle className="w-4 h-4" />
            {isSoldOut ? "Habis" : "Pesan"}
          </a>
        </div>
      </div>
    </div>
  );
}
