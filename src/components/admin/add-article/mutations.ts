import { useToast } from "@/hooks/use-toast";
import { createArticle } from "./actions";
import {
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
        queryKey: ["articles", { page: "1" }],
      };

      // CANCEL QUERIES
      await queryClient.cancelQueries(queryFilters);

      // OPTIMISTIC UPDATE
      queryClient.setQueriesData<ArticlePage>(queryFilters, (oldData) => {
        if (!oldData) return;
        const oldArticles = oldData.articles;
        const newArticles = [newArticle, ...oldArticles].slice(0, 12);
        return {
          ...oldData,
          articles: newArticles,
        };
      });

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
