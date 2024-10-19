"use client";
import ArticleCard from "./ArticleCard";
import { IArticle } from "@/models/Article.model";
import { FilterSchemaType } from "@/validations/article.schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Pagination } from "./Pagination";

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
    queryKey: ["articles", { page, perPage }],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://outloud-website.vercel.app/api/get-articles/all-articles?page=${page}&perPage=${perPage}`
      );
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

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
  if (isError || !articles) {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="text-red-500">Failed to fetch articles</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex w-full justify-end">
        <Pagination
          hasNextPage={hasNextPage}
          totalPages={totalPages}
          page={page}
        />
      </div>
      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-5">
          {articles.map((article: IArticle, index: number) => (
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
    </div>
  );
}
