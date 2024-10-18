"use server";
import { DBConnect } from "@/lib/db";
import { ArticleModel } from "@/models/Article.model";
import { createArticleSchema, CreateArticleSchemaType } from "@/validations/article.schema";
import { currentUser } from "@clerk/nextjs/server";

export async function createArticle(inputValues: CreateArticleSchemaType) {
  // CHECK IF USER IS LOGGED IN
  const user = await currentUser();

  // IF NO USER
  if (!user) throw Error("Unauthorized");

  // CONNECT TO DATABASE
  await DBConnect();

  // VALIDATE INPUT VALUES
  const { title, category, content, attachmentIds } =
    createArticleSchema.parse(inputValues);

  // CREATE ARTICLE
  const article = new ArticleModel({
    title,
    content,
    userId: user.id,
    category,
    attachments: attachmentIds?.map((id) => id) ?? [],
  });

  // SAVE ARTICLE
  const newArticle = await article.save();

  // RETURN ARTICLE
  return JSON.parse(JSON.stringify(newArticle));
}
