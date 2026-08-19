import {
  Globe,
  Award,
  Heart,
  Clock,
  Users,
  Building2,
  ShieldCheck,
  Star,
  Plane,
  Hotel,
  MessageCircle,
  BadgeCheck,
  CheckCircle2,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import type { FeatureProps, TravelFeaturesProps } from "./types";

type IconComponent = React.ComponentType<
  { size?: number | string } & React.SVGProps<SVGSVGElement>
>;

const ICON_REGISTRY: Record<string, IconComponent> = {
  ShieldCheck,
  Globe,
  Award,
  Heart,
  Clock,
  Users,
  Building2,
  Star,
  Plane,
  Hotel,
  MessageCircle,
  BadgeCheck,
  CheckCircle2,
  Sparkles,
  GraduationCap,
};

function resolveIcon(name: string): IconComponent {
  return ICON_REGISTRY[name] ?? CheckCircle2;
}

/* ------------------------ Card fitur keunggulan ------------------------ */
function FeatureCard({
  item,
  index,
}: {
  item: FeatureProps;
  index: number;
}) {
  const Icon = resolveIcon(item.iconName);

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
      aria-labelledby={`feature-title-${item.id}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 opacity-70 blur-2xl transition-colors group-hover:bg-primary/10"
      />

      <div className="relative">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon size={26} aria-hidden="true" />
        </div>
        <span
          aria-hidden="true"
          className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400"
        >
          Fitur {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3
        id={`feature-title-${item.id}`}
        className="mt-2 text-base font-bold leading-tight text-slate-900 sm:text-lg"
      >
        {item.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
        {item.description}
      </p>
    </div>
  );
}

const DEFAULT_FEATURES: FeatureProps[] = [
  {
    id: "df-1",
    iconName: "ShieldCheck",
    title: "Travel Resmi Berizin Kemenag",
    description:
      "Berizin resmi PPIU Kementerian Agama, dana jamaah aman &amp; terlindungi oleh regulasi pemerintah.",
  },
  {
    id: "df-2",
    iconName: "Globe",
    title: "Hotel Dekat Masjidil Haram",
    description:
      "Pilihan hotel bintang 4-5 dengan jarak dekat, mendukung ibadah nyaman &amp; hemat waktu.",
  },
  {
    id: "df-3",
    iconName: "GraduationCap",
    title: "Muthawif &amp; Ustadz Pengawas",
    description:
      "Pendamping berijazah resmi membimbing tata cara ibadah sesuai sunnah dan memberikan penjelasan selama perjalanan.",
  },
  {
    id: "df-4",
    iconName: "Plane",
    title: "Maskapai Penerbangan Resmi",
    description:
      "Kerjasama maskapai terpercaya dengan jadwal fleksibel dan pelayanan onboard yang nyaman.",
  },
  {
    id: "df-5",
    iconName: "MessageCircle",
    title: "Customer Service 24 Jam",
    description:
      "Tim support responsif membantu konsultasi, booking, dan pendampingan dari awal hingga kepulangan.",
  },
  {
    id: "df-6",
    iconName: "Award",
    title: "Harga Transparan &amp; Kompetitif",
    description:
      "Biaya sudah termasuk fasilitas sesuai paket, tanpa biaya tersembunyi di tengah perjalanan.",
  },
];

export function TravelFeatures({
  title = "Mengapa Memilih Kami?",
  subtitle = "Keunggulan layanan yang menjadikan perjalanan ibadah Anda lebih nyaman, aman, dan berkesan.",
  features = DEFAULT_FEATURES,
}: TravelFeaturesProps) {
  if (features.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-500 sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, idx) => (
            <FeatureCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
