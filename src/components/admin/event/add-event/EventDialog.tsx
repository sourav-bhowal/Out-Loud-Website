import { useDropzone } from "@uploadthing/react";
import { useCreateEventMutation } from "./mutations";
import useMediaUpload from "@/hooks/useMediaUpload";
import { useForm } from "react-hook-form";
import {
  createEventSchema,
  CreateEventSchemaType,
} from "@/validations/article.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2, PlusCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MediaPreviews } from "@/components/shared/MediaPreview";

// Interface for Add Event Props
interface AddEventProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Add Event Component
export default function AddEventDialog({ open, onOpenChange }: AddEventProps) {
  // MUTATION
  const mutation = useCreateEventMutation();

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

  // FORM
  const form = useForm<CreateEventSchemaType>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: undefined,
      time: "",
      category: "",
      attachmentIds: [],
    },
  });

  // FORM HANDLER
  async function onSubmit(inputValues: CreateEventSchemaType) {
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="md:h-36 h-20 resize-none"
                      placeholder="Enter the description of the event"
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
            <div className="flex flex-col md:flex-row md:items-center md:gap-10 gap-8 w-full">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[250px] justify-start text-leftfont-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        placeholder="Enter the time of the event"
                        {...field}
                        className="md:w-[170px] w-[210px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                  "Add Event"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
