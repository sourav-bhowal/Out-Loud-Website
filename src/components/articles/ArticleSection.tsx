"use client";
import ArticleCard from "./ArticleCard";
import { IArticle } from "@/models/Article.model";
import { FilterSchemaType } from "@/validations/article.schema";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Pagination } from "./Pagination";
import { kyInstance } from "@/lib/ky";
import { ArticlePage } from "@/lib/utils";

// INTERFACE
interface ArticleSectionProps {
  filters: FilterSchemaType;
}

// ARTICLE SECTION COMPONENT
export default function ArticleSection({
  filters: { page, perPage },
}: ArticleSectionProps) {
  // USE QUERY HOOK TO FETCH ARTICLES
  const { data, isFetching, isError } = useQuery({
    queryKey: ["articles", { page }],
    queryFn: () =>
      kyInstance
        .get("/api/get-articles", { searchParams: { page, perPage } })
        .json<ArticlePage>(),
    staleTime: 1000 * 60 * 5,
  });

  console.log(data);

  // TAKE OUT ALL THE DATA
  const articles = data?.articles;
  const hasNextPage = data?.hasNextPage;
  const totalPages = data?.totalPages;

  // RETURN LOADING
  if (isFetching) {
    return (
      <div className="flex w-full items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  // RETURN ERROR
  if (isError) {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="text-red-500">Failed to fetch articles</div>
      </div>
    );
  }

  if (!articles?.length) {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="text-muted-foreground">No articles found</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-5">
          {articles?.map((article: IArticle, index: number) => (
            <ArticleCard
              key={article.id}
              article={article}
              className={
                index === 0
                  ? "md:col-span-2 md:row-span-2"
                  : index === 3
                  ? "md:col-span-2"
                  : ""
              }
            />
          ))}
        </div>
      </div>
      <div className="md:mt-14 mt-10">
        <Pagination
          hasNextPage={hasNextPage}
          totalPages={totalPages}
          page={page}
        />
      </div>
    </div>
  );
}
