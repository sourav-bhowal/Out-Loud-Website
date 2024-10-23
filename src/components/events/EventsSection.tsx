"use client";
import { IEvent } from "@/models/Event.model";
import { useInfiniteQuery } from "@tanstack/react-query";
import { kyInstance } from "@/lib/ky";
import { EventPage } from "@/lib/types";
import { Loader } from "../shared/Loader";
import InfiniteScrollContainer from "../shared/InfiniteScrollContainer";
import { Loader2 } from "lucide-react";
import { IAttachment } from "@/models/Attachment.model";
import EventCard from "./EventCard";

// ARTICLE SECTION COMPONENT
export default function EventSection() {
  // GET ARTICLES USING INFINITE SCROLL
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["events"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(`/api/get-events`, {
          searchParams: { page: pageParam, perPage: 12 },
        })
        .json<EventPage>(),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasNextPage) {
        return allPages.length + 1;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  // TAKE ARTICLES FROM DATA
  const events = data?.pages.flatMap((page) => page.events);

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
        <div className="text-red-500">Failed to fetch events</div>
      </div>
    );
  }

  if (!events?.length && status === "success" && !hasNextPage) {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="text-muted-foreground">No events found</div>
      </div>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-5">
        {events?.map((event: IEvent, index: number) => (
          <EventCard
            key={index}
            event={
              event as IEvent & {
                attachments: IAttachment[];
              }
            }
            isFirstArticle={index === 0}
            // className={
            //   index === 0
            //     ? "md:col-span-2 md:row-span-2"
            //     : index === 3
            //     ? "md:col-span-2"
            //     : ""
            // }
          />
        ))}
      </div>
      {isFetchingNextPage && <Loader2 className="animate-spin my-3 mx-auto" />}
    </InfiniteScrollContainer>
  );
}
