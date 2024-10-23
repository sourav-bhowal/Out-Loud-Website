import { useToast } from "@/hooks/use-toast";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createEvent } from "./actions";
import { EventPage } from "@/lib/types";

// ADD EVENT MUTATION
export function useCreateEventMutation() {
  // TOAST
  const { toast } = useToast();

  // QUERY CLIENT
  const queryClient = useQueryClient();

  // CREATE EVENT MUTATION
  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: async (newEvent) => {
      // QUERY FILTERS
      const queryFilters: QueryFilters = {
        queryKey: ["events-upcoming"],
      };

      // CANCEL QUERIES
      await queryClient.cancelQueries(queryFilters);

      // OPTIMISTIC UPDATE
      queryClient.setQueriesData<InfiniteData<EventPage>>(
        queryFilters,
        // GET OLD DATA
        (oldData) => {
          console.log("newEvent", newEvent);
          console.log("oldData", oldData);
          // TAKE FIRST PAGE FROM OLD DATA
          const firstPage = oldData?.pages[0];
          // IF FIRST PAGE EXISTS THEN ADD NEW EVENT TO IT
          if (firstPage) {
            return {
              // PAGE PARAMS
              pageParams: oldData?.pageParams,
              // PAGES ARRAY WITH NEW EVENT
              pages: [
                {
                  ...firstPage,
                  events: [newEvent, ...firstPage.events],
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
        title: "Event created successfully",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Event creation failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
}
