/* ------------------------------------------------------------------ */
/*  Package Itinerary — Snake / Vertical Timeline Roadmap + Accordion.*/
/* ------------------------------------------------------------------ */

"use client";

import { useState } from "react";
import { Calendar, ChevronDown, ChevronUp, MapPin } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Internal types                                                    */
/* ------------------------------------------------------------------ */

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  location?: string;
}

/* ------------------------------------------------------------------ */
/*  Safe parser — handles every shape Supabase can send:
 *    • ["Day 1 text", "Day 2 text"]            (array of strings)
 *    • [{ day, title, activity, description }]  (array of objects)
 *    • null / undefined / []                    (empty fallback)
 *    • Mixed: some strings, some objects
 *
 *  NEVER uses `String(obj)` — that's the [object Object] bug root.
 * ------------------------------------------------------------------ */

function safeStr(v: unknown): string | undefined {
  if (v == null || typeof v === "object") return undefined;
  const s = String(v).trim();
  return s.length > 0 ? s : undefined;
}

function extractText(
  obj: Record<string, unknown>,
  keys: string[]
): string | undefined {
  for (const k of keys) {
    if (!(k in obj)) continue;
    const v = obj[k];
    if (typeof v === "string") return v.trim().length > 0 ? v.trim() : undefined;
    if (v != null) {
      const s = String(v).trim();
      if (s !== "[object Object]" && s.length > 0) return s;
    }
  }
  return undefined;
}

function parseItineraryDay(item: unknown, fallbackIndex: number): ItineraryDay {
  /* ── Plain string ──────────────────────────────────────────── */
  if (typeof item === "string") {
    return {
      day: fallbackIndex,
      title: `Hari ${fallbackIndex}`,
      description: item.trim(),
    };
  }

  /* ── Object ────────────────────────────────────────────────── */
  if (typeof item === "object" && item !== null && !Array.isArray(item)) {
    const obj = item as Record<string, unknown>;

    const day = Number(obj.day ?? obj.hari ?? fallbackIndex) || fallbackIndex;

    const title = extractText(obj, [
      "title", "kegiatan", "agenda", "header", "name", "judul",
    ]) ?? `Hari ${day}`;

    const description = extractText(obj, [
      "description", "desc", "rincian", "detail", "content", "keterangan",
    ]);

    const activity = extractText(obj, [
      "activity", "aktivitas", "program", "kegiatan_detail",
    ]);

    const location = extractText(obj, [
      "location", "lokasi", "place", "place_name",
    ]);

    const parts = [description, activity].filter(Boolean);
    const body = parts.length > 0 ? parts.join("\n") : `Kegiatan ${title}`;

    return {
      day,
      title,
      description: body,
      location: location || undefined,
    };
  }

  /* ── Any other primitive ───────────────────────────────────── */
  return {
    day: fallbackIndex,
    title: `Hari ${fallbackIndex}`,
    description: safeStr(item) ?? "Detail kegiatan belum tersedia.",
  };
}

function parseItinerary(raw: unknown[] | null): ItineraryDay[] {
  if (!raw || !Array.isArray(raw) || raw.length === 0) return [];
  return raw.map((item, idx) => parseItineraryDay(item, idx + 1));
}

/* ------------------------------------------------------------------ */
/*  Props                                                             */
/* ------------------------------------------------------------------ */

interface PackageItineraryProps {
  itinerary: unknown[] | null;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export default function PackageItinerary({ itinerary }: PackageItineraryProps) {
  const days = parseItinerary(itinerary);

  const [expanded, setExpanded] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(days.map((_, i) => [i, i < 3]))
  );

  const toggle = (idx: number) =>
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const anyOpen = Object.values(expanded).some(Boolean);
  const allOpen = Object.values(expanded).every(Boolean);

  const toggleAll = () => {
    const next = !anyOpen;
    setExpanded(Object.fromEntries(days.map((_, i) => [i, next])));
  };

  /* ── Empty / null fallback ─────────────────────────────────── */
  if (days.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-7 h-7 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Jadwal Perjalanan</h3>
        <p className="text-slate-500 text-sm">
          Itinerary perjalanan belum tersedia. Hubungi kami untuk detail lebih lanjut.
        </p>
      </div>
    );
  }

  /* ── Snake Roadmap ─────────────────────────────────────────── */
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Rencana Perjalanan</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Tinjau jadwal kegiatan hari per hari
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
            {days.length} Hari
          </span>
          <button
            onClick={toggleAll}
            className="text-xs font-medium px-3 py-1 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
            aria-label={allOpen ? "Tutup semua" : "Buka semua"}
          >
            {allOpen ? "Tutup" : "Buka"}
          </button>
        </div>
      </div>

      {/* Snake timeline */}
      <div className="relative pl-1">
        <div
          className="absolute top-5 bottom-2 w-0 border-l-2 border-dashed border-primary/40"
          style={{ left: "19px" }}
        />

        <div className="space-y-4">
          {days.map((day, idx) => (
            <ItineraryNode
              key={`day-${day.day}-${idx}`}
              day={day}
              index={idx}
              isExpanded={!!expanded[idx]}
              onToggle={() => toggle(idx)}
              isLast={idx === days.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Single timeline node (badge + expandable card)                    */
/* ------------------------------------------------------------------ */

function ItineraryNode({
  day,
  index,
  isExpanded,
  onToggle,
  isLast,
}: {
  day: ItineraryDay;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  // Alternating shift for the snake effect
  const shiftRight = index % 2 === 1;

  return (
    <div
      className={`relative flex items-start gap-3 transition-all duration-300 ${
        shiftRight ? "pl-6" : ""
      }`}
    >
      {/* Circular day badge */}
      <div className="relative z-10 shrink-0">
        <div
          className={`
            w-10 h-10 rounded-full bg-primary text-white font-bold
            flex items-center justify-center shadow-sm
            border-2 border-white ring-2 ring-primary/20
            transition-transform duration-300
            ${isExpanded ? "scale-110 ring-primary/40" : ""}
          `}
        >
          <span className="text-xs">{day.day}</span>
        </div>
        {isLast && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
            <div className="w-3 h-3 rounded-full bg-primary/30" />
          </div>
        )}
      </div>

      {/* Activity card */}
      <button
        onClick={onToggle}
        className={`
          flex-1 text-left rounded-2xl border p-4
          bg-slate-50/60 border-slate-100
          hover:bg-white hover:shadow-md transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-primary/30
          ${isExpanded ? "bg-white border-primary/20 shadow-sm" : ""}
        `}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-slate-900">
            <span className="text-primary mr-1.5">Hari {day.day}</span>
            {day.title}
          </h3>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          )}
        </div>

        {day.location && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500">{day.location}</span>
          </div>
        )}

        {/* Expandable body */}
        <div
          className={`
            grid transition-all duration-300 ease-in-out
            ${isExpanded
              ? "grid-rows-[1fr] mt-3 opacity-100"
              : "grid-rows-[0fr] mt-0 opacity-0"
            }
          `}
        >
          <div className="overflow-hidden">
            <div className="border-t border-slate-100 pt-3">
              <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {day.description}
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
