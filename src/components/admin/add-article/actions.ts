"use server";
import { DBConnect } from "@/lib/db";
import { ArticleModel } from "@/models/Article.model";
import {
  createArticleSchema,
  CreateArticleSchemaType,
} from "@/validations/article.schema";
import { currentUser } from "@clerk/nextjs/server";

// CREATE ARTICLE ACTION FUNCTION
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

  // DETERMINE READ TIME BASED ON CONTENT LENGTH
  let readTime;
  if (content.length < 500) {
    readTime = 5;
  } else if (content.length <= 1000) {
    readTime = 10;
  } else {
    readTime = 15;
  }

  // CREATE ARTICLE
  const article = new ArticleModel({
    title,
    content,
    userId: user.id,
    category,
    readTime,
    attachments: attachmentIds?.map((id) => id) ?? [],
  });

  // SAVE ARTICLE
  const newArticle = await article.save();

  // RETURN ARTICLE
  return JSON.parse(JSON.stringify(newArticle));
}
