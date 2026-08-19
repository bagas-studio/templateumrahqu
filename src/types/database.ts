/* ------------------------------------------------------------------ */
/*  Database schema — matches Supabase tables exactly (read-only).     */
/*  Probed via REST API; do NOT rename columns here without re-verifying.*/
/* ------------------------------------------------------------------ */

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  brand_color: string;
  primary_color?: string;
  secondary_color?: string;
  whatsapp_number: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  tenant_id: string;
  name: string;
  type: "umroh" | "haji" | string;
  price: number;
  status: "published" | "draft" | string;
  is_active: boolean;
  departure_date: string | null;
  duration_days: number;
  quota: number;
  quota_taken: number;
  available: number;
  hotel_makkah: string | null;
  hotel_madinah: string | null;
  airline: string | null;
  image_url: string | null;
  description: string | null;
  includes: string | null;
  excludes: string | null;
  visa_type: string | null;
  visa_price: number | null;
  visa_processing_days: number | null;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  category: string | null;
  image_url: string | null;
  author: string | null;
  read_time: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
