import { IArticle } from "@/models/Article.model";
import { useEditArticleMutation } from "./mutations";
import useMediaUpload from "@/hooks/useMediaUpload";
import { useDropzone } from "@uploadthing/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  createArticleSchema,
  CreateArticleSchemaType,
} from "@/validations/article.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IAttachment } from "@/models/Attachment.model";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MediaPreviews } from "@/components/shared/MediaPreview";
import { Loader2, PlusCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// TYPE OF EDIT REFER JOB DIALOGUE PROPS
interface EditArticleDialogProps {
  article: IArticle & { attachments: IAttachment[] };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// EDIT REFER JOB DIALOGUE
export default function EditArticleDialog({
  article,
  open,
  onOpenChange,
}: EditArticleDialogProps) {
  // Edit mutation
  const mutation = useEditArticleMutation();

  // MEDIA UPLOAD HOOK
  const {
    medias,
    uploadProgress,
    startUpload,
    removeMedia,
    isUploading,
    resetMediaUploads,
  } = useMediaUpload();

  // DRAG AND DROP FUNCTION TO START MEDIA UPLOAD USING USEDROPZONE By uploadthing
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: startUpload,
  });

  // CURRENT ATTACHMENTS STATE
  const [currentAttachments, setCurrentAttachments] = useState(
    article.attachments || []
  );

  // REMOVE PRESENT MEDIA
  const removePresentAttachment = (id: string) => {
    setCurrentAttachments(
      currentAttachments.filter(
        (attachment: IAttachment) => attachment.id !== id
      )
    );
  };

  // FORM
  const form = useForm<CreateArticleSchemaType>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: article.title,
      content: article.content,
      category: article.category,
      attachmentIds:
        article.attachments.map((attachment: IAttachment) => attachment.id) ||
        [],
    },
  });

  // ON FORM SUBMIT
  async function onSubmit(values: CreateArticleSchemaType) {
    // Merge old and new attachment IDs
    const updatedAttachmentIds = [
      ...article.attachments.map((attachment: IAttachment) => attachment._id),
      ...(medias.map((media) => media.mediaId).filter(Boolean) as string[]),
    ];
    
    mutation.mutate(
      // CALL MUTATION
      {
        articleId: article._id as string,
        editedArticleData: {
          ...values,
          attachmentIds: updatedAttachmentIds as string[],
        },
      },
      // ON SUCCESS CALLBACK
      {
        onSuccess: () => {
          resetMediaUploads();
          form.reset();
          onOpenChange(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit an Article</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the title of the event"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-36 resize-none"
                      placeholder="Enter the content of the article"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the category of the event"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Media</FormLabel>
              <div
                {...getRootProps()}
                className="w-full cursor-pointer mt-2 rounded-lg border-2 border-dashed border-gray-300 p-3 text-center transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-gray-500">Drop the files here ...</p>
                ) : (
                  <>
                    <PlusCircle className="mx-auto h-8 w-8 text-primary" />
                    <p className="text-gray-500 mt-2">
                      Drag and drop files here, or click to select files
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
              {!!medias.length && (
                <MediaPreviews medias={medias} removeMedia={removeMedia} />
              )}
              {!!medias.length && (
                <>
                  {form.setValue(
                    "attachmentIds",
                    medias
                      .map((media) => media?.mediaId)
                      .filter((id) => id !== undefined)
                  )}
                </>
              )}
              {currentAttachments.length > 0 && (
                <PresentMediaPreview
                  media={currentAttachments}
                  removeMedia={removePresentAttachment}
                />
              )}
            </div>
            {isUploading && (
              <div className="flex items-center justify-center">
                <svg
                  className="h-5 w-5 animate-spin text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <p className="text-gray-500">{uploadProgress}%</p>
              </div>
            )}
            <div className="flex justify-end">
              <Button
                disabled={isUploading || !form.formState.isValid}
                type="submit"
                className="font-bold"
              >
                {mutation.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Add Article"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface MediaPreviewProps {
  media: IAttachment[];
  removeMedia: (_id: string) => void;
}

const PresentMediaPreview: React.FC<MediaPreviewProps> = ({
  media,
  removeMedia,
}) => {
  return (
    <div className="relative">
      {media.map((m, index) => (
        <>
          <Image
            key={index}
            src={m.url}
            alt="Preview"
            width={100}
            height={100}
            className="size-fit max-h-[30rem] rounded-xl"
          />
          <div className="absolute left-0 top-0">
            <XCircle
              className="h-5 w-5 cursor-pointer rounded-full bg-black text-white"
              onClick={() => removeMedia(m.id)}
            />
          </div>
        </>
      ))}
    </div>
  );
};
