import { IArticle } from "@/models/Article.model";
import { useDeleteArticleMutation } from "./mutations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// TYPE DEFINITION
interface DeleteArticleDialogProps {
  article: IArticle;
  open: boolean;
  onClose: () => void;
}

// DELETE POST DIALOG COMPONENT
export default function DeleteArticleDialog({
  article,
  open,
  onClose,
}: DeleteArticleDialogProps) {
  // MUTATION
  const mutation = useDeleteArticleMutation();

  // HANDLE OPEN CHANGE
  function handleOpenChange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
    }
  }

  // RETURN DELETE POST DIALOG
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete article?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            variant="destructive"
            onClick={() =>
              mutation.mutate(article._id as string, {
                onSuccess: onClose,
              })
            }
          >
            {mutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
          <Button
            variant={"outline"}
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
