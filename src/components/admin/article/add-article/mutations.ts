import { useToast } from "@/hooks/use-toast";
import { createArticle } from "./actions";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ArticlePage } from "@/lib/types";

// ADD ARTICLE MUTATION
export function useCreateArticleMutation() {
  // TOAST
  const { toast } = useToast();

  // QUERY CLIENT
  const queryClient = useQueryClient();

  // CREATE ARTICLE MUTATION
  const mutation = useMutation({
    mutationFn: createArticle,
    onSuccess: async (newArticle) => {
      // QUERY FILTERS
      const queryFilters: QueryFilters = {
        queryKey: ["articles"],
      };

      // CANCEL QUERIES
      await queryClient.cancelQueries(queryFilters);

      // OPTIMISTIC UPDATE
      queryClient.setQueriesData<InfiniteData<ArticlePage>>(
        queryFilters,
        // GET OLD DATA
        (oldData) => {
          // TAKE FIRST PAGE FROM OLD DATA
          const firstPage = oldData?.pages[0];
          // IF FIRST PAGE EXISTS THEN ADD NEW ARTICLE TO IT
          if (firstPage) {
            console.log("First page exists", newArticle);
            return {
              // PAGE PARAMS
              pageParams: oldData?.pageParams,
              // PAGES ARRAY WITH NEW ARTICLE
              pages: [
                {
                  ...firstPage,
                  articles: [newArticle, ...firstPage.articles],
                },
                // SLICE OLD DATA PAGES ARRAY FROM SECOND INDEX
                ...oldData?.pages.slice(1),
              ],
            };
          }
        }
      );

      // TOAST SUCCESS
      toast({
        title: "Article created successfully",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Article creation failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
}
