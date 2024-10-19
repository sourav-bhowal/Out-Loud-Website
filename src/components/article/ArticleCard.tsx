import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IArticle } from "@/models/Article.model";
import placeHolderImage from "@/assets/placeholder-img.webp";

// PROPS INTERFACE FOR THE COMPONENT
interface ArticleProps {
  article: IArticle;
  className?: string;
}

// ARTICLE CARD COMPONENT
export default function ArticleCard({ article, className }: ArticleProps) {
  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-lg ${className}`}
    >
      <div className="aspect-video relative">
        <Image
          src={
            (article?.attachments[0] as { url: string })?.url ||
            placeHolderImage
          }
          alt={article.title}
          className="object-cover w-full h-full transition-transform hover:scale-105"
          width={800}
          height={500}
        />
        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
          {article.category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2 line-clamp-5 capitalize">
          {article.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-1">
          {article.content}
        </p>
        <div className="flex items-center text-sm text-muted-foreground space-x-4">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {new Date(article.createdAt).toDateString()}
          </div>
          <div className="flex items-center">
            <Eye className="mr-1 h-4 w-4" />
            {article.readTime} read
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="ghost" className="ml-auto group" asChild>
          <Link href={`/home/article/${article._id}`}>
            Read More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
