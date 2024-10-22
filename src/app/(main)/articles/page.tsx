import { Metadata } from "next";
import ArticleSection from "@/components/articles/ArticleSection";

// METADATA
export const metadata: Metadata = {
  title: "Articles",
};

// HOME PAGE
export default async function ArticlePage() {
  return (
    <main>
      <h2 className="text-2xl uppercase font-semibold tracking-wide">
        Articles
      </h2>
      <ArticleSection />
    </main>
  );
}
