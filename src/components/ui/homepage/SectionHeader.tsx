"use client";

import { PackageCategory } from "./types";

interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
  activeCategory: PackageCategory;
  onCategoryChange: (category: PackageCategory) => void;
}

const categories: { value: PackageCategory; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "reguler", label: "Reguler" },
  { value: "vip", label: "VIP" },
  { value: "ramadhan", label: "Ramadhan" },
];

export function SectionHeader({
  title = "Paket Umroh Populer",
  subtitle = "Pilih paket perjalanan umroh terbaik sesuai kebutuhan Anda",
  activeCategory,
  onCategoryChange,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      {/* Title & Subtitle */}
      <div className="max-w-xl">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
      </div>

      {/* Tab Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => onCategoryChange(cat.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeCategory === cat.value
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
