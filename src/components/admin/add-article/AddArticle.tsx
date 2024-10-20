import useMediaUpload from "@/hooks/useMediaUpload";
import { useCreateArticleMutation } from "./mutations";
import { useDropzone } from "@uploadthing/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createArticleSchema,
  CreateArticleSchemaType,
} from "@/validations/article.schema";
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
import { MediaPreviews } from "@/components/shared/MediaPreview";
import { Loader2, PlusCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Interface for Add Event Props
interface AddArticleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Add Event Component
export default function AddArticleDialog({
  open,
  onOpenChange,
}: AddArticleProps) {
  // MUTATION
  const mutation = useCreateArticleMutation();

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

  // We have to ignore onClick event because of useDropzone
  //   const { onClick, ...rootProps } = getRootProps();

  // FORM
  const form = useForm<CreateArticleSchemaType>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      attachmentIds: [],
    },
  });

  // FORM HANDLER
  async function onSubmit(inputValues: CreateArticleSchemaType) {
    // MUTATE
    mutation.mutate(
      {
        ...inputValues,
        attachmentIds: medias
          .map((media) => media.mediaId)
          .filter(Boolean) as string[],
      },
      // ON SUCCESS FUNCTION
      {
        onSuccess: () => {
          form.reset();
          resetMediaUploads();
          onOpenChange(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add an Article</DialogTitle>
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
              className="w-full cursor-pointer mt-2 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
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
            </div>
            {isUploading && (
              <div className="flex items-center justify-center space-x-2">
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
