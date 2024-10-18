import { FilterSchemaType } from "@/validations/article.schema";
import { Metadata } from "next";
import ArticleSection from "./ArticleSection";

// METADATA
export const metadata: Metadata = {
  title: "Articles",
  description: "A articles and blog site",
};

// INTERFACE FOR HOMEPAGE
interface HomePageProps {
  searchParams: {
    page?: string;
    perPage?: string;
  };
}

// HOME PAGE
export default async function HomePage({
  searchParams: { page, perPage },
}: HomePageProps) {
  // FILTERS
  const filters: FilterSchemaType = {
    page: page ?? "1",
    perPage: perPage ?? "1",
  };

  return (
    <main>
      <h2 className="text-2xl uppercase font-semibold tracking-wide">Articles</h2>
      <ArticleSection filters={filters} />
    </main>
  );
}
