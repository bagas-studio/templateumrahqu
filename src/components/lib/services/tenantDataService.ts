import type { Tenant, Package, Article } from "@/types/database";
import { getSupabaseClient } from "../supabase/server";

/* ------------------------------------------------------------------ */
/*  Tenant slug yang dipakai homepage (read-only, satu tenant/template).*/
/* ------------------------------------------------------------------ */
const TENANT_SLUG = "batik-travel";

const PRIMARY_FALLBACK = "#0D9488";
const SECONDARY_FALLBACK = "#F59E0B";

function maybeSingle<R>(
  resp: { data?: R | R[] | null; error?: unknown }
): R | null {
  const d = resp.data;
  if (d == null) return null;
  if (Array.isArray(d)) return d.length > 0 ? d[0] : null;
  return d as R;
}

/* ------------------------------------------------------------------ */
/*  Fetches tenant by slug. If not found, falls back to `ilike name`.  */
/* ------------------------------------------------------------------ */
export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  const supabase = getSupabaseClient();

  let { data } = (await supabase.from("tenants").select("*").eq("slug", slug)) as {
    data?: Tenant | Tenant[] | null;
  };
  if (!data || (Array.isArray(data) && data.length === 0)) {
    ({ data } = (await supabase.from("tenants").select("*").ilike("name", slug)) as {
      data?: Tenant | Tenant[] | null;
    });
  }

  return maybeSingle<Tenant>({ data }) ?? null;
}

/* ------------------------------------------------------------------ */
/*  All packages for a given tenant_id — read-only, no status filter.
 *
 *  Design choice:
 *    The `packages` table stores heterogeneous status values (string,
 *    boolean, null). Filtering with `.eq("status","published")` or
 *    `.eq("is_active",true)` silently drops valid packages whose status
 *    is stored differently. We fetch EVERYTHING the tenant owns (no
 *    .limit()) and let the UI render it all.
 * ------------------------------------------------------------------ */
export async function getPackagesByTenant(tenantId: string): Promise<Package[]> {
  const supabase = getSupabaseClient();

  const { data, error } = (await supabase
    .from("packages")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("created_at", { ascending: true })) as {
    data?: Package[];
    error?: unknown;
  };

  if (error) {
    console.error("[Supabase] Error fetching packages:", error);
    return [];
  }

  const allPackages = (data as Package[]) ?? [];
  console.log(
    `Fetched packages count for tenant ${tenantId}:`,
    allPackages.length,
    allPackages.map((p) => ({ id: p.id, name: p.name, status: p.status, is_active: p.is_active }))
  );
  return allPackages;
}

/* ------------------------------------------------------------------ */
/*  Fetch the top-N published articles for the BlogHighlight section.  */
/*  Falls back to an empty array if the table does not exist.         */
/* ------------------------------------------------------------------ */
export async function getArticles(limit = 3): Promise<Article[]> {
  const supabase = getSupabaseClient();

  try {
    const { data, error } = (await supabase
      .from("articles")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(limit)) as { data?: Article[]; error?: unknown };

    if (error) return [];
    return (data as Article[]) ?? [];
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/*  Combines tenant + packages + articles in a single fetch.           */
/* ------------------------------------------------------------------ */
export async function getBatikTravelFullData() {
  const tenant = await getTenantBySlug(TENANT_SLUG);

  if (!tenant) {
    return {
      tenant: null,
      packages: [],
      articles: [],
      primaryColor: PRIMARY_FALLBACK,
      secondaryColor: SECONDARY_FALLBACK,
    };
  }

  const [packages, articles] = await Promise.all([
    getPackagesByTenant(tenant.id),
    getArticles(3),
  ]);

  return {
    tenant,
    packages,
    articles,
    primaryColor: (tenant.primary_color || tenant.brand_color) ?? PRIMARY_FALLBACK,
    secondaryColor: (tenant.secondary_color || SECONDARY_FALLBACK),
  };
}
