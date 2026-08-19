export interface PackageProps {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  currency?: string;
  duration_days: number;
  hotel_stars: number;
  quota_remaining: number;
  quota_total: number;
  departure_date: string;
  return_date?: string;
  airline_name: string;
  airline_logo?: string;
  hotel_name: string;
  hotel_location?: string;
  image_url: string;
  category: "reguler" | "vip" | "ramadhan" | string;
  features?: string[];
  is_featured?: boolean;
}

export type PackageCategory = "all" | "reguler" | "vip" | "ramadhan";

/* ------------------------------------------------------------------ */
/*  Testimonial — ulasan jamaah                                        */
/* ------------------------------------------------------------------ */
export interface TestimonialProps {
  id: string;
  /** Nama jamaah yang memberi ulasan */
  name: string;
  /** Nama paket yang diambil jamaah */
  package_name: string;
  /** Rating 1 - 5 */
  rating: number;
  /** Isi teks ulasan */
  content: string;
  /** Foto jamaah; jika kosong dipakai avatar inisial */
  avatar_url?: string;
  /** Kota asal jamaah, mis. "Surabaya" */
  city?: string;
  /** Tahun / periode keberangkatan, mis. "Maret 2026" */
  departure_period?: string;
}

/* ------------------------------------------------------------------ */
/*  Article — blog / edukasi umroh                                     */
/* ------------------------------------------------------------------ */
export interface ArticleProps {
  id: string;
  title: string;
  slug: string;
  /** Ringkasan singkat artikel */
  excerpt: string;
  /** Cover artikel; jika kosong dipakai placeholder gradient */
  image_url?: string;
  /** Kategori / tag, mis. "Panduan Ibadah" */
  category: string;
  /** ISO date string, mis. "2026-08-01" */
  published_at: string;
  /** Estimasi waktu baca dalam menit */
  read_time_minutes?: number;
}

/* ------------------------------------------------------------------ */
/*  Footer — dynamic tenant branding                                   */
/* ------------------------------------------------------------------ */
export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "twitter"
  | "whatsapp";

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

/* ------------------------------------------------------------------ */
/*  Trust / Features                                                  */
/* ------------------------------------------------------------------ */
export interface FeatureProps {
  id: string;
  /** Nama icon dari lucide-react (PascalCase), mis. "ShieldCheck" */
  iconName: string;
  title: string;
  description: string;
}

export interface TrustStatProps {
  value: string;
  label: string;
  /** Opsional: icon lucide untuk header statistik */
  iconName?: string;
}

export interface TrustPartnerProps {
  name: string;
  /** Logo partner; jika kosong dipakai placeholder inisial */
  logo_url?: string;
}

export interface TrustBannerProps {
  title?: string;
  subtitle?: string;
  /** Detail legalitas, mis. { number, authority, issued } */
  license?: {
    number: string;
    authority?: string;
    issued_at?: string;
  };
  accreditation?: string[];
  stats: TrustStatProps[];
  partners?: TrustPartnerProps[];
  partnerSectionTitle?: string;
}

export interface TravelFeaturesProps {
  title?: string;
  subtitle?: string;
  features?: FeatureProps[];
}

/* ------------------------------------------------------------------ */
/*  Footer — dynamic tenant branding                                   */
/* ------------------------------------------------------------------ */
export interface FooterConfigProps {
  brand: {
    name: string;
    logo_url?: string;
    description?: string;
    /** Alamat kantor resmi travel */
    address?: string;
    /** Nomor izin PPIU / SK Kemenag */
    license_number?: string;
  };
  /** Kolom 2 — navigasi cepat */
  quick_links: FooterLink[];
  /** Kolom 3 — kategori paket */
  package_links: FooterLink[];
  /** Kolom 4 — kontak resmi */
  contact: {
    phone?: string;
    whatsapp?: string;
    email?: string;
    /** Jam kerja, mis. "Sen - Sab, 08.00 - 17.00 WIB" */
    office_hours?: string;
  };
  socials?: SocialLink[];
  /** Default: tahun berjalan */
  copyright_year?: number;
}
