"use client";

import { useState } from "react";
import { PackageGrid, SectionHeader } from "@/components/ui/homepage";
import type { PackageProps, PackageCategory } from "@/components/ui/homepage";

interface HomeClientProps {
  packages: PackageProps[];
}

export default function HomeClient({ packages }: HomeClientProps) {
  const [activeCategory, setActiveCategory] = useState<PackageCategory>("all");

  const filteredPackages =
    activeCategory === "all"
      ? packages
      : packages.filter((p) => p.category === activeCategory);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title="Paket Umroh Populer"
        subtitle="Pilih paket perjalanan umroh terbaik sesuai kebutuhan dan anggaran Anda"
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <PackageGrid packages={filteredPackages} />
    </section>
  );
}
