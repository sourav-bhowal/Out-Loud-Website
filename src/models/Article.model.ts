import mongoose, { Schema, Document } from "mongoose";

// INTERFACE FOR ARTICLE
export interface IArticle extends Document {
  title: string;
  content: string;
  category: string;
  image: string;
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
    image: { type: String },
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
