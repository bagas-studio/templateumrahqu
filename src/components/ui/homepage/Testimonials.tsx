"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";
import type { TestimonialProps } from "./types";
import { getInitials } from "./utils";

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials: TestimonialProps[];
  /** true = slider horizontal scroll-snap, false = grid statis */
  variant?: "grid" | "slider";
}

/* ---------------------------- Rating bintang --------------------------- */
function StarRating({ rating }: { rating: number }) {
  const safeRating = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Rating ${safeRating} dari 5 bintang`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < safeRating
              ? "fill-secondary text-secondary"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}

/* ------------------------------ Avatar -------------------------------- */
function Avatar({ name, url }: { name: string; url?: string }) {
  if (url) {
    return (
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
        <Image src={url} alt={name} fill sizes="48px" className="object-cover" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
    >
      {getInitials(name)}
    </div>
  );
}

/* --------------------------- Kartu testimoni --------------------------- */
function TestimonialCard({ item }: { item: TestimonialProps }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <StarRating rating={item.rating} />
        <Quote size={28} className="shrink-0 text-primary/15" aria-hidden="true" />
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">
        &ldquo;{item.content}&rdquo;
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
        <Avatar name={item.name} url={item.avatar_url} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">
            {item.name}
            {item.city && (
              <span className="font-normal text-gray-400"> · {item.city}</span>
            )}
          </p>
          <p className="mt-0.5 truncate text-xs text-primary">
            {item.package_name}
          </p>
          {item.departure_period && (
            <p className="mt-0.5 truncate text-xs text-gray-400">
              Keberangkatan {item.departure_period}
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

/* ------------------------------ Section ------------------------------- */
export function Testimonials({
  title = "Cerita Jamaah Kami",
  subtitle = "Kepercayaan ribuan jamaah adalah amanah yang kami jaga di setiap perjalanan.",
  testimonials,
  variant = "grid",
}: TestimonialsProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-sm text-gray-500 sm:text-base">{subtitle}</p>
        </div>

        {variant === "slider" ? (
          <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="w-[85vw] shrink-0 snap-start sm:w-[360px]"
              >
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
