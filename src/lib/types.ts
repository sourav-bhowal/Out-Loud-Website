import { IArticle } from "@/models/Article.model";

export interface ArticlePage {
  articles: IArticle[];
  hasNextPage: boolean;
  totalPages: number;
}
