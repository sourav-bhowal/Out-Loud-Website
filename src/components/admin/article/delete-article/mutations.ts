import { useToast } from "@/hooks/use-toast";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ArticlePage } from "@/lib/types";
import { deleteArticle } from "./actions";

// ADD ARTICLE MUTATION
export function useDeleteArticleMutation() {
  // TOAST
  const { toast } = useToast();

  // QUERY CLIENT
  const queryClient = useQueryClient();

  // CREATE ARTICLE MUTATION
  const mutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: async (deletedArticle) => {
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
          // IF NO OLD DATA
          if (!oldData) return;
          // RETURN NEW DATA
          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => {
              return {
                ...page,
                articles: page.articles.filter(
                  (article) => article._id !== deletedArticle._id
                ),
              };
            }),
          };
        }
      );

      // TOAST SUCCESS
      toast({
        title: "Article deleted successfully",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Article deletion failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
}
