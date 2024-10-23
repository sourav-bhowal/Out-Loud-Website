import { IArticle } from "@/models/Article.model";
import { IEvent } from "@/models/Event.model";

export interface ArticlePage {
  articles: IArticle[];
  hasNextPage: boolean;
  totalPages: number;
}

export interface EventPage {
  events: IEvent[];
  hasNextPage: boolean;
  totalPages: number;
}
