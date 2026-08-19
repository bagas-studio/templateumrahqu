/* ------------------------------------------------------------------ */
/*  Package Detail — extended schema for single-package detail page.     */
/*  Matches Supabase `packages` table + extra fields used on detail view.*/
/* ------------------------------------------------------------------ */

export interface PackageDetail {
  id: string;
  tenant_id: string;
  name: string;
  slug: string;
  type: "umroh" | "haji" | string;
  price: number;
  status: "published" | "draft" | string;
  is_active: boolean;
  departure_date: string | null;
  duration_days: number;
  quota: number;
  remaining_quota: number;
  hotel_makkah: string | null;
  hotel_makkah_star: number | null;
  hotel_madinah: string | null;
  hotel_madinah_star: number | null;
  airline: string | null;
  image_url: string | null;
  description: string | null;
  includes: string[] | null;
  excludes: string[] | null;
  itinerary: unknown[] | null;
  terms_conditions: string | null;
  visa_type: string | null;
  visa_price: number | null;
  visa_processing_days: number | null;
  created_at: string;
  updated_at: string;
}

/* ------------------------------------------------------------------ */
/*  Package Media — galeri foto / video per paket.                       */
/*  Matches Supabase `package_media` table.                              */
/* ------------------------------------------------------------------ */

export interface PackageMedia {
  id: string;
  package_id: string;
  media_url: string;
  media_type: "image" | "video" | string;
  caption: string | null;
  created_at: string;
}
