import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BlogHighlight,
  ConversionCTA,
  Footer,
  HeroSection,
  Navbar,
  TravelFeatures,
  TrustBanner,
} from "@/components/ui/homepage";
import type { ArticleProps, FooterConfigProps } from "@/components/ui/homepage";
import { mapPackageDtoToProps } from "@/lib/services/adapters";
import { mapArticleDtoToProps } from "@/lib/services/articleAdapter";
import { getBatikTravelFullData } from "@/lib/services/tenantDataService";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Batik Travel — Paket Umroh Terpercaya",
  description: "Paket umroh terbaik dengan fasilitas lengkap dan harga terjangkau",
};

export default async function HomePage() {
  const { tenant, packages, articles, primaryColor, secondaryColor } =
    await getBatikTravelFullData();

  if (!tenant) {
    notFound();
  }

  const packageProps = packages.map(mapPackageDtoToProps);

  const articleProps: ArticleProps[] = articles
    .map(mapArticleDtoToProps)
    .filter((a): a is ArticleProps => Boolean(a.excerpt || a.title));

  const footerConfig: FooterConfigProps = {
    brand: {
      name: tenant.name,
      logo_url: tenant.logo_url || undefined,
      description: tenant.description || "Travel umroh terpercaya Indonesia.",
      address: tenant.address || undefined,
    },
    quick_links: [
      { label: "Beranda", href: "/" },
      { label: "Paket Umroh", href: "/paket" },
      { label: "Tentang Kami", href: "/tentang" },
      { label: "Kontak", href: "/kontak" },
    ],
    package_links: [
      { label: "Paket Reguler", href: "/paket?kategori=reguler" },
      { label: "Paket VIP", href: "/paket?kategori=vip" },
      { label: "Paket Ramadhan", href: "/paket?kategori=ramadhan" },
    ],
    contact: {
      phone: tenant.phone || undefined,
      whatsapp: tenant.whatsapp_number || undefined,
      email: tenant.email || undefined,
      office_hours: "Sen - Sab, 08.00 - 17.00 WIB",
    },
    socials: [],
    copyright_year: new Date().getFullYear(),
  };

  const tenantMeta = {
    name: tenant.name,
    logo_url: tenant.logo_url,
    whatsapp_number: tenant.whatsapp_number,
    description: tenant.description,
    primary_color: primaryColor,
    secondary_color: secondaryColor,
  };

  return (
    <main
      className="min-h-screen bg-gray-50"
      style={{
        "--primary": primaryColor,
        "--primary-foreground": "#FFFFFF",
        "--secondary": secondaryColor,
        "--secondary-foreground": "#FFFFFF",
      } as React.CSSProperties}
    >
      <Navbar tenant={tenantMeta} />
      <HeroSection tenant={tenantMeta} />
      <HomeClient packages={packageProps} />
      <TravelFeatures />
      <TrustBanner
        license={{
          number: "PPIU/SK 123/2024",
          authority: "Kementerian Agama RI",
        }}
        stats={[
          { value: "12.000+", label: "Jamaah Terlayani", iconName: "Users" },
          { value: "15", label: "Tahun Pengalaman", iconName: "Clock" },
          { value: "4.9/5", label: "Rating Kepuasan", iconName: "Star" },
          { value: "100%", label: "Visa Sukses", iconName: "ShieldCheck" },
        ]}
      />
      {articleProps.length > 0 && (
        <BlogHighlight
          articles={articleProps}
          basePath="/artikel"
          title="Artikel & Edukasi Umroh"
          subtitle="Baca panduan lengkap seputar ibadah dan perjalanan suci"
          viewAllHref="/artikel"
        />
      )}
      <ConversionCTA
        whatsappNumber={tenant.whatsapp_number || "6281234567890"}
        phoneNumber={tenant.phone || undefined}
      />
      <Footer config={footerConfig} poweredBy="UmrohQ" />
    </main>
  );
}
