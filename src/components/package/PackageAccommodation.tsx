/* ------------------------------------------------------------------ */
/*  Package Accommodation — Hotel & Maskapai Details.                    */
/* ------------------------------------------------------------------ */

import { Plane, Hotel, Star, MapPin, Building2 } from "lucide-react";

interface PackageAccommodationProps {
  hotelMakkah: string | null;
  hotelMakkahStar: number | null;
  hotelMadinah: string | null;
  hotelMadinahStar: number | null;
  airline: string | null;
  departureCity?: string | null;
}

export default function PackageAccommodation({
  hotelMakkah,
  hotelMakkahStar,
  hotelMadinah,
  hotelMadinahStar,
  airline,
  departureCity,
}: PackageAccommodationProps) {
  const hasHotel = hotelMakkah || hotelMadinah;
  const hasAirline = !!airline;

  if (!hasHotel && !hasAirline) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <Hotel className="w-7 h-7 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Akomodasi & Transportasi</h3>
        <p className="text-slate-500 text-sm">Informasi hotel dan maskapai belum tersedia.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Hotel & Maskapai</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hotel Makkah */}
        {hotelMakkah && (
          <HotelCard
            city="Makkah"
            name={hotelMakkah}
            stars={hotelMakkahStar}
            landmark="Masjidil Haram"
          />
        )}

        {/* Hotel Madinah */}
        {hotelMadinah && (
          <HotelCard
            city="Madinah"
            name={hotelMadinah}
            stars={hotelMadinahStar}
            landmark="Masjid Nabawi"
          />
        )}

        {/* Airline */}
        {airline && (
          <div className="md:col-span-2">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5 border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Plane className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-slate-900">{airline}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Direct Flight</span>
                </div>
                {departureCity && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs text-slate-500">Keberangkatan: {departureCity}</span>
                  </div>
                )}
                <p className="text-xs text-slate-400 mt-1.5">Penerbangan langsung tanpa transit untuk kenyamanan jamaah</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HotelCard({ city, name, stars, landmark }: {
  city: string;
  name: string;
  stars: number | null;
  landmark: string;
}) {
  const icons = {
    Makkah: <Building2 className="w-5 h-5" />,
    Madinah: <Hotel className="w-5 h-5" />,
  };

  return (
    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <div className="text-primary">
          {icons[city as keyof typeof icons] || <Hotel className="w-5 h-5" />}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{city}</span>
          {stars && (
            <div className="flex items-center gap-0.5">
              {[...Array(Math.min(stars, 5))].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-secondary fill-secondary" />
              ))}
            </div>
          )}
        </div>
        <p className="text-sm font-bold text-slate-900 truncate">{name}</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-500">Dekat {landmark}</span>
        </div>
      </div>
    </div>
  );
}
