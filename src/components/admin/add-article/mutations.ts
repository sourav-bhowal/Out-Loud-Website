import { useToast } from "@/hooks/use-toast";
import { createArticle } from "./actions";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
// import { useRouter } from "next/navigation";

// ADD ARTICLE MUTATION
export function useCreateArticleMutation() {
  // TOAST
  const { toast } = useToast();
  // QUERY CLIENT
  const queryClient = useQueryClient();
  // ROUTER
//   const router = useRouter();

  // CREATE ARTICLE MUTATION
  const mutation = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      // Invalidate query
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
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
