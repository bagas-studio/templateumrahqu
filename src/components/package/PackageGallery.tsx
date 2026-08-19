"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PackageMedia } from "@/types/package-detail";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface PackageGalleryProps {
  images: string[];
  mediaList?: PackageMedia[];
  packageName: string;
}

/* ------------------------------------------------------------------ */
/*  Internal image slot                                               */
/* ------------------------------------------------------------------ */

interface ImageSlot {
  url: string;
  alt: string;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function PackageGallery({
  images,
  mediaList,
  packageName,
}: PackageGalleryProps) {
  /* ── Collect gallery URLs (no server-side logic change) ───────── */
  const extraMedia =
    mediaList
      ?.filter((m) => m.media_type === "image" && m.media_url)
      .map((m) => m.media_url) ?? [];

  const allImages = images.length > 0 ? [...images, ...extraMedia] : extraMedia;
  const uniqueImages = Array.from(new Set(allImages)).filter(Boolean);

  const gallery: ImageSlot[] = uniqueImages.map((url, i) => ({
    url,
    alt: `${packageName} — Foto ${i + 1}`,
  }));
  const total = gallery.length;

  /* ── Carousel state ───────────────────────────────────────────── */
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  /* ── Navigation helpers (shared by carousel + lightbox) ───────── */
  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goTo = (i: number) => setIndex(Math.max(0, Math.min(total - 1, i)));

  const openLightbox = () => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  const nextInLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % total);
  }, [total]);
  const prevInLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  /* ── Keyboard: lightbox ───────────────────────────────────────── */
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextInLightbox();
      if (e.key === "ArrowLeft") prevInLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, nextInLightbox, prevInLightbox]);

  /* ── Touch / swipe gesture on the track ──────────────────────── */
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<number | null>(null);
  const dragDeltaRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartRef.current = e.touches[0].clientX;
    dragDeltaRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartRef.current == null) return;
    dragDeltaRef.current = e.touches[0].clientX - dragStartRef.current;
  };

  const handleTouchEnd = () => {
    if (dragStartRef.current == null) return;
    if (dragDeltaRef.current < -40) next();
    else if (dragDeltaRef.current > 40) prev();
    dragStartRef.current = null;
    dragDeltaRef.current = 0;
  };

  /* Mouse drag support (via pointer capture) */
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragStartRef.current = e.clientX;
    dragDeltaRef.current = 0;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartRef.current == null) return;
    dragDeltaRef.current = e.clientX - dragStartRef.current;
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartRef.current == null) return;
    if (dragDeltaRef.current < -40) next();
    else if (dragDeltaRef.current > 40) prev();
    dragStartRef.current = null;
    dragDeltaRef.current = 0;
  };

  /* ── Transition reset on index change ─────────────────────────── */
  const onSlideChange = () => {
    setTransitioning(false);
  };

  const navWithTransition = (fn: () => void) => {
    setTransitioning(true);
    fn();
  };

  /* ── No-image fallback ────────────────────────────────────────── */
  if (total === 0) {
    return (
      <section className="w-full">
        <div className="w-full aspect-[16/9] max-h-[480px] rounded-2xl border border-slate-200 bg-slate-100 flex flex-col items-center justify-center gap-3 overflow-hidden shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center">
            <Maximize2 className="w-7 h-7 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500">Belum ada foto paket.</p>
        </div>
      </section>
    );
  }

  /* ── Render ───────────────────────────────────────────────────── */
  return (
    <section className="w-full">
      {/* ─── Carousel container ────────────────────────────────── */}
      <div
        className="w-full aspect-[16/9] max-h-[480px] rounded-2xl overflow-hidden relative shadow-sm select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={trackRef}
      >
        {/* Slides — positioned absolutely for translateX sliding */}
        <div
          className="absolute inset-0 flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {gallery.map((img, i) => (
            <div
              key={i}
              className="w-full h-full shrink-0"
              style={{ flex: "0 0 100%" }}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Counter badge (top-left) */}
        {total > 1 && (
          <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {index + 1} / {total}
          </div>
        )}

        {/* Zoom button (top-right) */}
        <button
          onClick={(e) => { e.stopPropagation(); openLightbox(); }}
          className="absolute top-3 right-3 bg-white/85 backdrop-blur-sm p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white z-10"
          aria-label="Buka preview penuh"
        >
          <Maximize2 className="w-4 h-4 text-slate-700" />
        </button>

        {/* Left / Right arrows (appear on hover for touch safety) */}
        {total > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); navWithTransition(prev); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/85 backdrop-blur-sm p-2 rounded-full shadow-sm opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navWithTransition(next); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/85 backdrop-blur-sm p-2 rounded-full shadow-sm opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>
          </>
        )}

        {/* Bottom gradient for depth + dots visibility */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {/* Dots pagination (bottom-center) */}
        {total > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {gallery.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); goTo(i); }}
                className={`
                  h-1.5 rounded-full transition-all duration-200
                  ${i === index
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/60 hover:bg-white/90"
                  }
                `}
                aria-label={`Lihat foto ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ─── Lightbox / Modal ───────────────────────────────────── */}
      {lightboxOpen && total > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10 transition-colors p-1"
            aria-label="Tutup"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevInLightbox(); }}
            className="absolute left-3 md:left-6 text-white/70 hover:text-white z-10 transition-colors p-1"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="w-9 h-9 md:w-12 md:h-12" />
          </button>

          <img
            src={gallery[lightboxIndex].url}
            alt={gallery[lightboxIndex].alt}
            className="max-w-[90vw] max-h-[88vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); nextInLightbox(); }}
            className="absolute right-3 md:right-6 text-white/70 hover:text-white z-10 transition-colors p-1"
            aria-label="Foto berikutnya"
          >
            <ChevronRight className="w-9 h-9 md:w-12 md:h-12" />
          </button>

          <div className="absolute bottom-5 text-white/70 text-sm font-medium">
            {lightboxIndex + 1} / {total}
          </div>
        </div>
      )}
    </section>
  );
}
