import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IArticle } from "@/models/Article.model";
import placeHolderImage from "@/assets/placeholder-img.webp";
import { formatDate } from "@/lib/utils";
import { IAttachment } from "@/models/Attachment.model";
import { useUser } from "@clerk/nextjs";
import MoreArticleButtons from "../admin/article/MoreArticleBtns";

// PROPS INTERFACE FOR THE COMPONENT
interface ArticleProps {
  article: IArticle & { attachments: IAttachment[] };
  className?: string;
  isFirstArticle?: boolean;
}

// ARTICLE CARD COMPONENT
export default function ArticleCard({
  article,
  className,
  isFirstArticle,
}: ArticleProps) {
  const { user } = useUser();

  return (
    <Card
      className={`overflow-hidden group/article transition-all hover:shadow-md shadow-blue-500/50 hover:shadow-blue-500/75 ${className}`}
    >
      <div className="aspect-video relative">
        {
          article?.attachments[0]?.type === "image" && (
            <Image
              src={article?.attachments[0]?.url || placeHolderImage}
              alt={article.title}
              className="object-cover w-full h-full transition-transform hover:scale-105"
              width={800}
              height={500}
              priority
            />
          )
          // : (
          //   <video src={article?.attachments[0]?.url} controls />
          // )
        }
        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
          {article.category}
        </Badge>

        {article.userId === user?.id && (
          <MoreArticleButtons
            article={article}
            className="absolute top-2 right-2 sm:opacity-0 transition-opacity group-hover/article:opacity-100"
          />
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2 line-clamp-5 capitalize">
          {article.title}
        </h3>
        <p
          className={`text-muted-foreground mb-4 ${
            isFirstArticle ? "line-clamp-6" : "line-clamp-1"
          }`}
        >
          {article.content}
        </p>
        <div className="flex items-center text-sm text-muted-foreground space-x-4">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {formatDate(article.createdAt)}
          </div>
          <div className="flex items-center">
            <Eye className="mr-1 h-4 w-4" />
            {article.readTime} min read
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="ghost" className="ml-auto group" asChild>
          <Link href={`/articles/${article._id}`}>
            Read More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
