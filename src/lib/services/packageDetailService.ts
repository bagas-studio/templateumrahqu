import type { PackageDetail, PackageMedia } from "@/types/package-detail";
import { getSupabaseClient } from "../supabase/server";

/* ------------------------------------------------------------------ */
/*  Fetch a single package by slug + tenant_id (read-only).            */
/*  Also fetches related media gallery from `package_media` table.     */
/*  Returns { packageDetail, mediaList } or null if not found.         */
/* ------------------------------------------------------------------ */
export async function getPackageBySlug(
  slug: string,
  tenantId: string
): Promise<{ packageDetail: PackageDetail; mediaList: PackageMedia[] } | null> {
  const supabase = getSupabaseClient();

  // Query 1: Fetch single package record
  const { data: packageData, error: packageError } = (await supabase
    .from("packages")
    .select("*")
    .eq("slug", slug)
    .eq("tenant_id", tenantId)
    .single()) as { data?: Record<string, unknown> | null; error?: unknown };

  if (packageError || !packageData) {
    return null;
  }

  const raw = packageData;

  const packageDetail: PackageDetail = {
    id: String(raw.id),
    tenant_id: String(raw.tenant_id),
    name: String(raw.name),
    slug: String(raw.slug),
    type: String(raw.type),
    price: Number(raw.price),
    status: String(raw.status),
    is_active: Boolean(raw.is_active),
    departure_date: (raw.departure_date as string | null) ?? null,
    duration_days: Number(raw.duration_days),
    quota: Number(raw.quota),
    remaining_quota: (raw.remaining_quota as number | undefined) ?? Number(raw.quota),
    hotel_makkah: (raw.hotel_makkah as string | null) ?? null,
    hotel_makkah_star: (raw.hotel_makkah_star as number | null) ?? null,
    hotel_madinah: (raw.hotel_madinah as string | null) ?? null,
    hotel_madinah_star: (raw.hotel_madinah_star as number | null) ?? null,
    airline: (raw.airline as string | null) ?? null,
    image_url: (raw.image_url as string | null) ?? null,
    description: (raw.description as string | null) ?? null,
    includes: parseJsonStringArray(raw.includes),
    excludes: parseJsonStringArray(raw.excludes),
    itinerary: parseJsonArray(raw.itinerary),
    terms_conditions: (raw.terms_conditions as string | null) ?? null,
    visa_type: (raw.visa_type as string | null) ?? null,
    visa_price: (raw.visa_price as number | null) ?? null,
    visa_processing_days: (raw.visa_processing_days as number | null) ?? null,
    created_at: String(raw.created_at),
    updated_at: String(raw.updated_at),
  };

  // Query 2: Fetch media gallery for this package
  const { data: mediaData } = (await supabase
    .from("package_media")
    .select("*")
    .eq("package_id", packageDetail.id)
    .order("created_at", { ascending: true })) as { data?: Record<string, unknown>[] | null };

  const mediaList: PackageMedia[] =
    mediaData?.map((m) => ({
      id: String(m.id),
      package_id: String(m.package_id),
      media_url: String(m.media_url),
      media_type: String(m.media_type),
      caption: (m.caption as string | null) ?? null,
      created_at: String(m.created_at),
    })) ?? [];

  return { packageDetail, mediaList };
}

/* ------------------------------------------------------------------ */
/*  Helper: parse JSON string or pass-through array (preserves types).
 *  Used for `itinerary` — items may be objects like { day, title, ... }
 *  so we MUST NOT force String() coercion.                            */
function parseJsonArray(value: unknown): unknown[] | null {
  if (value == null) return null;
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  Helper: parse JSON string array for fields that are always strings
 *  (includes / excludes). Forces String() coercion so no objects leak.*/
/* ------------------------------------------------------------------ */
function parseJsonStringArray(value: unknown): string[] | null {
  if (value == null) return null;
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map(String) : null;
    } catch {
      return null;
    }
  }
  return null;
}
