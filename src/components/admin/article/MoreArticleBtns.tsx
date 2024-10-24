"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IArticle } from "@/models/Article.model";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteArticleDialog from "./delete-article/DeleteArticleDialog";
import EditArticleDialog from "./edit-article/EditArticleDialog";
import { IAttachment } from "@/models/Attachment.model";

// MORE ARTICLE BUTTONS PROPS
interface MoreArticleButtonProps {
  article: IArticle;
  className?: string;
}

// MORE ARTICLE BUTTONS COMPONENT
export default function MoreArticleButtons({
  article,
  className,
}: MoreArticleButtonProps) {
  // STATE
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"} className={className}>
            <MoreHorizontal className="size-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            <span className="flex items-center gap-3 text-primary">
              <Edit className="size-4" />
              Edit
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
            <span className="flex items-center gap-3 text-destructive">
              <Trash2 className="size-4" />
              Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteArticleDialog
        article={article}
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
      <EditArticleDialog
        article={article as IArticle & { attachments: IAttachment[] }}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  );
}
