import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import placeHolderImage from "@/assets/placeholder-img.webp";
import { IAttachment } from "@/models/Attachment.model";
import { IEvent } from "@/models/Event.model";
import { formatDate, formatTime } from "@/lib/utils";

// PROPS INTERFACE FOR THE COMPONENT
interface EventCardProps {
  event: IEvent & { attachments: IAttachment[] };
  className?: string;
  isFirstArticle?: boolean;
}

// ARTICLE CARD COMPONENT
export default function EventCard({
  event,
  className,
  // isFirstArticle,
}: EventCardProps) {
  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-md shadow-blue-500/50 hover:shadow-blue-500/75 ${className}`}
    >
      <div className="aspect-video relative">
        {
          event?.attachments[0]?.type === "image" && (
            <Image
              src={event?.attachments[0]?.url || placeHolderImage}
              alt={event.title}
              className="object-cover w-full h-full transition-transform hover:scale-105"
              width={800}
              height={500}
              priority
            />
          )
          // : (
          //   <video src={event?.attachments[0]?.url} controls />
          // )
        }
        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
          {event.date.toString() > new Date().toISOString() && "Upcoming"}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2 line-clamp-5 capitalize">
          {event.title}
        </h3>
        <p className={`text-muted-foreground mb-4 line-clamp-6`}>
          {event.description}
        </p>
        <div className="flex items-center text-sm text-muted-foreground space-x-4">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <p className="text-center">{formatDate(event.date)}</p>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {formatTime(event.time)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="ghost" className="ml-auto group" asChild>
          <Link href={`/`}>
            Register
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
