import { DBConnect } from "@/lib/db";
import { AttachmentModel } from "@/models/Attachment.model";
import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

// Initailize uploadthing
const f = createUploadthing();

// FileRouter to upload files and routes
export const fileRouter = {
  attachment: f({
    image: {
      maxFileSize: "32MB",
      maxFileCount: 5,
    },
    video: {
      maxFileSize: "64MB",
      maxFileCount: 5,
    },
  })
    // middle wares for user authentication
    .middleware(async () => {
      const user = await currentUser();
      if (!user) {
        throw new UploadThingError("Unauthorized");
      }
      return {};
    })
    // onUploadComplete save media files to DB
    .onUploadComplete(async ({ file }) => {
      await DBConnect();
      const Newattachment = new AttachmentModel({
        url: file.url.replace(
          "/f/",
          `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`
        ),
        type: file.type.startsWith("image") ? "image" : "video",
      });
      const attachment = await Newattachment.save();

      return { attachmentId: attachment._id as string };
    }),
} satisfies FileRouter;

// export app file route
export type AppFileRouter = typeof fileRouter;
