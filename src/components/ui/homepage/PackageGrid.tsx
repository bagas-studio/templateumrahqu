"use client";

import { PackageProps } from "./types";
import { PackageCard } from "./PackageCard";
import { Package, SearchX, Sparkles } from "lucide-react";

interface PackageGridProps {
  packages: PackageProps[];
  isLoading?: boolean;
}

function PackageCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-md animate-pulse">
      {/* Hero image 16:9 */}
      <div className="relative aspect-video w-full bg-slate-200" />
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <div className="h-6 w-3/4 rounded bg-slate-200" />
        <div className="mt-2 h-4 w-full rounded bg-slate-200" />
        <div className="mt-1.5 h-4 w-2/3 rounded bg-slate-200" />
        {/* Departure row */}
        <div className="mt-3 h-4 w-1/3 rounded bg-slate-200" />
        {/* Divider */}
        <div className="mt-4 h-px w-full bg-slate-100" />
        {/* Micro badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="h-7 w-32 rounded-lg bg-slate-100" />
          <div className="h-7 w-28 rounded-lg bg-slate-100" />
        </div>
        {/* Divider */}
        <div className="mt-4 h-px w-full bg-slate-100" />
        {/* Price + CTA */}
        <div className="mt-4 flex items-end justify-between">
          <div className="flex flex-col gap-0.5">
            <div className="h-2.5 w-16 rounded bg-slate-200" />
            <div className="h-7 w-28 rounded bg-slate-200" />
          </div>
          <div className="h-10 w-28 rounded-xl bg-slate-200" />
        </div>
        {/* Quota progress */}
        <div className="mt-3 flex flex-col gap-1.5">
          <div className="h-2.5 w-full rounded bg-slate-200" />
          <div className="h-1.5 w-full rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"
      />
      <div className="relative flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
          <Package size={32} className="text-slate-400" />
        </div>
        <h3 className="mt-6 text-xl font-extrabold text-slate-800">
          Belum Ada Paket Tersedia
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
          Saat ini belum ada paket umroh yang tersedia untuk kategori yang Anda pilih.
          Kami akan segera memperbarui koleksi perjalanan ibadah kami.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
            <SearchX size={12} className="text-slate-400" />
            Belum tersedia
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <Sparkles size={12} />
            Cek kembali nanti
          </span>
        </div>
      </div>
    </div>
  );
}

export function PackageGrid({ packages, isLoading = false }: PackageGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PackageCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (packages.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
}
