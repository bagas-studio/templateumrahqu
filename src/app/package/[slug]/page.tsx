import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getTenantBySlug } from "@/components/lib/services/tenantDataService";
import { getPackageBySlug } from "@/components/lib/services/packageDetailService";
import PackageHeader from "@/components/package/PackageHeader";
import PackageGallery from "@/components/package/PackageGallery";
import BookingSidebar from "@/components/package/BookingSidebar";
import BookingBottomBar from "@/components/package/BookingBottomBar";
import PackageContent from "@/components/package/PackageContent";
import PackageItinerary from "@/components/package/PackageItinerary";
import PackageAccommodation from "@/components/package/PackageAccommodation";
import PackageFacilities from "@/components/package/PackageFacilities";
import PackageTerms from "@/components/package/PackageTerms";

const TENANT_SLUG = "batik-travel";

async function fetchPackageData(slug: string) {
  const tenant = await getTenantBySlug(TENANT_SLUG);
  if (!tenant) notFound();
  const data = await getPackageBySlug(slug, tenant.id);
  if (!data) notFound();
  return { tenant, ...data };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { tenant, packageDetail } = await fetchPackageData(slug);
    return {
      title: `${packageDetail.name} — ${tenant.name}`,
      description:
        packageDetail.description ||
        `Paket umroh ${packageDetail.name} dari ${tenant.name}`,
    };
  } catch {
    return {
      title: "Paket Tidak Ditemukan",
      description: "Paket umroh yang Anda cari tidak tersedia.",
    };
  }
}

function PackageDetailSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20 lg:pb-12 animate-pulse">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-4 w-40 bg-slate-200 rounded mb-4" />
          <div className="h-8 w-3/4 bg-slate-200 rounded mb-4 max-w-xl" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-32 bg-slate-200 rounded-full" />
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full aspect-[16/9] max-h-[480px] bg-slate-200 rounded-2xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3"
              >
                <div className="h-6 w-48 bg-slate-200 rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-slate-200 rounded" />
                  <div className="h-4 w-5/6 bg-slate-200 rounded" />
                  <div className="h-4 w-4/6 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl border border-slate-100 shadow-xl p-6 space-y-4">
              <div className="h-4 w-24 bg-slate-200 rounded" />
              <div className="h-10 w-full bg-slate-200 rounded" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-20 bg-slate-200 rounded-xl" />
                <div className="h-20 bg-slate-200 rounded-xl" />
              </div>
              <div className="h-10 w-full bg-slate-200 rounded" />
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-14 w-full bg-slate-300 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function PackageErrorState() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Paket Tidak Ditemukan
        </h1>
        <p className="text-slate-600">
          Maaf, paket umroh yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <a
          href="/packages"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          ← Kembali ke Daftar Paket
        </a>
      </div>
    </main>
  );
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let data;
  try {
    data = await fetchPackageData(slug);
  } catch {
    return <PackageErrorState />;
  }

  const { tenant, packageDetail, mediaList } = data;

  const primaryColor =
    tenant.primary_color || tenant.brand_color || "#0D9488";
  const secondaryColor = tenant.secondary_color || "#F59E0B";

  const allImages: string[] = [];
  if (packageDetail.image_url) allImages.push(packageDetail.image_url);
  if (mediaList) {
    mediaList.forEach((m) => {
      if (m.media_type === "image" && m.media_url) {
        allImages.push(m.media_url);
      }
    });
  }

  return (
    <Suspense fallback={<PackageDetailSkeleton />}>
      <main
        className="min-h-screen bg-gray-50 pb-20 lg:pb-12"
        style={{
          "--primary": primaryColor,
          "--primary-foreground": "#FFFFFF",
          "--secondary": secondaryColor,
          "--secondary-foreground": "#FFFFFF",
        } as React.CSSProperties}
      >
        <PackageHeader
          tenant={tenant}
          packageDetail={packageDetail}
        />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <PackageGallery
            images={allImages}
            mediaList={mediaList}
            packageName={packageDetail.name}
          />
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <PackageContent packageDetail={packageDetail} />
              <PackageItinerary itinerary={packageDetail.itinerary} />
              <PackageAccommodation
                hotelMakkah={packageDetail.hotel_makkah}
                hotelMakkahStar={packageDetail.hotel_makkah_star}
                hotelMadinah={packageDetail.hotel_madinah}
                hotelMadinahStar={packageDetail.hotel_madinah_star}
                airline={packageDetail.airline}
                departureCity={
                  packageDetail.departure_date ? "Indonesia" : null
                }
              />
              <PackageFacilities
                includes={packageDetail.includes}
                excludes={packageDetail.excludes}
              />
              <PackageTerms
                termsConditions={packageDetail.terms_conditions}
              />
            </div>

            <div className="lg:col-span-1">
              <BookingSidebar
                packageDetail={packageDetail}
                tenant={{ name: tenant.name }}
              />
            </div>
          </div>
        </section>

        <BookingBottomBar packageDetail={packageDetail} />
      </main>
    </Suspense>
  );
}
