"use server";
import { DBConnect } from "@/lib/db";
import { ArticleModel } from "@/models/Article.model";
import {
  createArticleSchema,
  CreateArticleSchemaType,
} from "@/validations/article.schema";
import { currentUser } from "@clerk/nextjs/server";

// EditArticle props
interface EditArticleProps {
  articleId: string;
  editedArticleData: CreateArticleSchemaType;
}

// EditArticle action
export async function editArticle({
  articleId,
  editedArticleData,
}: EditArticleProps) {
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

    // VALIDATE INPUT VALUES
    const { title, category, content, attachmentIds } =
      createArticleSchema.parse(editedArticleData);

    // DETERMINE READ TIME BASED ON CONTENT LENGTH
    let readTime;
    if (content.length < 500) {
      readTime = 5;
    } else if (content.length <= 1000) {
      readTime = 10;
    } else {
      readTime = 15;
    }

    // UPDATE ARTICLE
    const updateArticle = await ArticleModel.findByIdAndUpdate(
      articleId,
      {
        title,
        content,
        category,
        readTime,
        attachments: attachmentIds?.map((id) => id) ?? [],
      },
      { new: true }
    );

    // POPULATE ARTICLE
    const updatedArticle = await ArticleModel.findById(
      updateArticle?._id
    ).populate("attachments");

    // RETURN ARTICLE
    return JSON.parse(JSON.stringify(updatedArticle));
  } catch (error) {
    console.log("Error", error);
  }
}
