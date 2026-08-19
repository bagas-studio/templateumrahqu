import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import type { ArticleProps } from "./types";
import { formatDateID } from "./utils";

interface BlogHighlightProps {
  title?: string;
  subtitle?: string;
  articles: ArticleProps[];
  /** Base path detail artikel; slug akan di-append. Default "/artikel" */
  basePath?: string;
  /** Link ke halaman index artikel; sembunyi jika kosong */
  viewAllHref?: string;
}

function ArticleCard({
  article,
  basePath,
}: {
  article: ArticleProps;
  basePath: string;
}) {
  const href = `${basePath}/${article.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link href={href} className="relative block h-44 w-full overflow-hidden">
        {article.image_url ? (
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
          {article.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <CalendarDays size={12} aria-hidden="true" />
            {formatDateID(article.published_at)}
          </span>
          {article.read_time_minutes ? (
            <span className="flex items-center gap-1">
              <Clock size={12} aria-hidden="true" />
              {article.read_time_minutes} menit baca
            </span>
          ) : null}
        </div>

        <h3 className="mt-2 text-base font-bold leading-snug text-gray-900 line-clamp-2 transition-colors group-hover:text-primary sm:text-lg">
          <Link href={href}>{article.title}</Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
          {article.excerpt}
        </p>

        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Selengkapnya
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}

export function BlogHighlight({
  title = "Artikel & Edukasi Umroh",
  subtitle = "Bekali diri dengan panduan ibadah, tips persiapan, dan informasi terbaru seputar tanah suci.",
  articles,
  basePath = "/artikel",
  viewAllHref = "/artikel",
}: BlogHighlightProps) {
  if (articles.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-sm text-gray-500 sm:text-base">{subtitle}</p>
          </div>

          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-primary hover:text-primary sm:self-auto"
            >
              Lihat Semua
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              basePath={basePath}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
