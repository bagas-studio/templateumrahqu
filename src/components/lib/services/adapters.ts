import type { Package } from "@/types/database";
import type { PackageProps } from "@/components/ui/homepage/types";

/* ------------------------------------------------------------------ */
/*  Maps a DB Package DTO → PackageProps expected by the UI layer.     */
/*  - hotel_makkah / hotel_madinah   → hotel_name + hotel_location     */
/*  - airline                        → airline_name                    */
/*  - quota / available              → quota_total / quota_remaining   */
/*  - type (umroh|haji|reguler|...)   → category                       */
/* ------------------------------------------------------------------ */

function deriveHotelStars(hotelName: string | null): number {
  if (!hotelName) return 4;
  const name = hotelName.toLowerCase();
  if (/fairmont|swissotel|hilton|raffles|jw|sheraton|ritz|rolex|royal palace|grand hyatt/.test(name))
    return 5;
  if (/ibis|novotel|citibell|shaza|ibn sultan|sultan plaza/.test(name)) return 3;
  return 4;
}

function mapTypeToCategory(pkgType: string | undefined): string {
  switch (pkgType) {
    case "haji":
    case "vip":
      return "vip";
    case "ramadhan":
      return "ramadhan";
    default:
      return "reguler";
  }
}

export function mapPackageDtoToProps(pkg: Package): PackageProps {
  const hotelName = (pkg.hotel_makkah || pkg.hotel_madinah) ?? "Hotel Umroh";
  const airline = pkg.airline ?? "Maskapai Resmi";

  return {
    id: pkg.id,
    name: pkg.name,
    slug: slugify(pkg.name),
    description: pkg.description || undefined,
    price: pkg.price,
    currency: "IDR",
    duration_days: pkg.duration_days,
    hotel_stars: deriveHotelStars(hotelName),
    quota_remaining: pkg.available,
    quota_total: pkg.quota,
    departure_date: pkg.departure_date ?? "2026-09-01",
    airline_name: airline,
    hotel_name: hotelName,
    image_url: pkg.image_url ?? "/placeholder-package.webp",
    category: mapTypeToCategory(pkg.type),
    is_featured: pkg.available > 0 && pkg.available <= 10,
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
