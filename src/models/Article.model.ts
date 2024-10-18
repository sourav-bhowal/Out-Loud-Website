import mongoose, { Schema, Document } from "mongoose";
import { IAttachment } from "./Attachment.model";

// INTERFACE FOR ARTICLE
export interface IArticle extends Document {
  title: string;
  content: string;
  category: string;
  attachments: IAttachment["_id"][];
  readTime: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// SCHEMA FOR ARTICLE
const ArticleSchema: Schema<IArticle> = new Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    content: { type: String, required: [true, "Content is required"] },
    category: { type: String, required: [true, "Category is required"] },
    attachments: [{
      type: Schema.Types.ObjectId,
      ref: "Attachment",
    }],
    readTime: { type: Number },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// EXPORT ARTICLE MODEL
export const ArticleModel =
  (mongoose.models.Article as mongoose.Model<IArticle>) ||
  mongoose.model<IArticle>("Article", ArticleSchema);
