import { IArticle } from "@/models/Article.model";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ArticlePage {
  articles: IArticle[];
  hasNextPage: boolean;
  totalPages: number;
}
