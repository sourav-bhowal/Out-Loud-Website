"use client";
import ArticleCard from "./ArticleCard";
import { IArticle } from "@/models/Article.model";
import { useInfiniteQuery } from "@tanstack/react-query";
import { kyInstance } from "@/lib/ky";
import { ArticlePage } from "@/lib/types";
import { Loader } from "../shared/Loader";
import InfiniteScrollContainer from "../shared/InfiniteScrollContainer";
import { Loader2 } from "lucide-react";

// ARTICLE SECTION COMPONENT
export default function ArticleSection() {
  // GET ARTICLES USING INFINITE SCROLL
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: async ({ pageParam }) =>
      // console.log(pageParam),
      await kyInstance
        .get("/api/get-articles", {
          searchParams: { page: pageParam, perPage: 12 },
        })
        .json<ArticlePage>(),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasNextPage) {
        return allPages.length + 1;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
  // console.log(data);

  // TAKE ARTICLES FROM DATA
  const articles = data?.pages.flatMap((page) => page.articles);

  // RETURN LOADING
  if (status === "pending") {
    return (
      <div className="flex justify-center min-h-[80vh]">
        <Loader />
      </div>
    );
  }

  // RETURN ERROR
  if (status === "error") {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="text-red-500">Failed to fetch articles</div>
      </div>
    );
  }

  if (!articles?.length && status === "success" && !hasNextPage) {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="text-muted-foreground">No articles found</div>
      </div>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-5">
        {articles?.map((article: IArticle, index: number) => (
          <ArticleCard
            key={index}
            article={article}
            isFirstArticle={index === 0}
            className={
              index === 0
                ? "md:col-span-2 md:row-span-2"
                : index === 3
                ? "md:col-span-2"
                : ""
            }
          />
        ))}
        {isFetchingNextPage && <Loader2 className="animate-spin" />}
      </div>
    </InfiniteScrollContainer>
  );
}
