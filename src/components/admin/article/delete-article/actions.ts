"use server";
import { DBConnect } from "@/lib/db";
import { ArticleModel } from "@/models/Article.model";
import { AttachmentModel } from "@/models/Attachment.model";
import { currentUser } from "@clerk/nextjs/server";

export async function deleteArticle(articleId: string) {
  try {
    // CHECK IF USER IS LOGGED IN
    const user = await currentUser();

    // IF NO USER
    if (!user) throw new Error("Unauthorized");

    // CONNECT TO DATABASE
    await DBConnect();

    // DELETE ARTICLE
    const article = await ArticleModel.findById(articleId);

    // IF ARTICLE NOT FOUND
    if (!article) throw new Error("Article not found");

    // IF USER IS NOT AUTHOR
    if (article.userId !== user.id) throw new Error("Unauthorized");

    // DELETE ARTICLE
    const deletedArticle = await ArticleModel.findByIdAndDelete(articleId);

    // DELETE ATTACHMENTS
    if (deletedArticle) {
      const deletedAttachments = await AttachmentModel.deleteMany({
        _id: { $in: deletedArticle.attachments },
      });

      // IF ATTACHMENTS DELETED
      if (deletedAttachments) {
        // Delete media files from uploadthing
        console.log("Attachments deleted", deletedAttachments);
      }
    }

    // RETURN DELETED ARTICLE
    return JSON.parse(JSON.stringify(deletedArticle));
  } catch (error) {
    console.log("Error in deleteArticle", error);
  }
}
