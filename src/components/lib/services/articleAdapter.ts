import type { Article } from "@/types/database";
import type { ArticleProps } from "@/components/ui/homepage/types";

export function mapArticleDtoToProps(article: Article): ArticleProps {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug || slugify(article.title),
    excerpt: article.excerpt || "",
    category: article.category || "Edukasi",
    image_url: article.image_url || undefined,
    published_at: article.published_at || article.created_at,
    read_time_minutes: article.read_time ?? 5,
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
