import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

// PAGINATION PROPS INTERFACE
type PaginationProps = {
  page?: string;
  totalPages?: number;
  hasNextPage?: boolean;
};

// PAGINATION COMPONENT
export const Pagination = (props: PaginationProps) => {
  const { page = 1, hasNextPage } = props;

  const currentPage = Number(page);

  return (
    <div className="flex items-center justify-center space-x-6 text-black dark:text-white">
      <Link
        className={cn(
          "flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-card",
          currentPage === 1
            ? "pointer-events-none bg-muted-foreground"
            : "border-2 border-primary"
        )}
        href={`?page=${currentPage - 1}`}
      >
        {" "}
        <ArrowLeft size={16} />
        Prev
      </Link>

      <Link
        className={cn(
          "flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-card",
          !hasNextPage
            ? "pointer-events-none bg-muted-foreground"
            : "border-2 border-primary"
        )}
        href={`?page=${currentPage + 1}`}
      >
        Next
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};
