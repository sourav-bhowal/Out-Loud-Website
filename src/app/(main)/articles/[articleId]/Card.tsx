import { Badge } from "@/components/ui/badge";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card as MainCard,
} from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { IArticle } from "@/models/Article.model";
import { IAttachment } from "@/models/Attachment.model";
import { Clock } from "lucide-react";
import Image from "next/image";
import React from "react";

// 
interface ArticleCardProps {
  article: IArticle & { attachments: IAttachment[] };
}

// 
export default function Card({
  article: { title, content, category, readTime, attachments, updatedAt },
}: ArticleCardProps) {
  return (
    <MainCard className="mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {readTime} min read
          </div>
        </div>
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
      </CardHeader>
      <CardContent>
        {/* RENDER MEDIA PREVIEWS IF EXISTS */}
        {!!attachments.length && <PostCardMediaPreviews medias={attachments} />}
        <p className="text-sm text-muted-foreground">{content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
        Published on: {formatDate(updatedAt)}
      </CardFooter>
    </MainCard>
  );
}

// POST CARD MEDIA PREVIEWS COMPONENT PROPS
interface PostCardMediaPreviewsProps {
  medias: IAttachment[];
}

// POST CARD MEDIA PREVIEWS COMPONENT
function PostCardMediaPreviews({ medias }: PostCardMediaPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 mb-4",
        medias.length > 1 && "sm:grid sm:grid-cols-2 "
      )}
    >
      {/* MEDIA PREVIEW FOR EACH MEDIA IN POST */}
      {medias.map((media) => (
        <PostCardMediaPreview key={media.id} media={media} />
      ))}
    </div>
  );
}

// POST CARD MEDIA PREVIEW COMPONENT PROPS
interface PostCardMediaPreviewProps {
  media: IAttachment;
}

// POST CARD MEDIA PREVIEW COMPONENT
function PostCardMediaPreview({ media }: PostCardMediaPreviewProps) {
  // if media is image
  if (media.type === "image") {
    return (
      <Image
        src={media.url}
        alt={"media"}
        width={500}
        height={500}
        className="mx-auto size-fit max-h-[30rem] rounded-2xl"
      />
    );
  }

  // if media is video
  if (media.type === "video") {
    return (
      <div>
        <video
          src={media.url}
          controls
          className="mx-auto size-fit max-h-[30rem] rounded-2xl"
        />
      </div>
    );
  }

  // if media is not supported
  return <p className="text-destructive">Unsupported Media</p>;
}
