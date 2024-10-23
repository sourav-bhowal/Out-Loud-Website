import mongoose, { Schema, Document } from "mongoose";
import { IAttachment } from "./Attachment.model";

// INTERFACE FOR EVENT
export interface IEvent extends Document {
  title: string;
  description: string;
  category: string;
  attachments: IAttachment["_id"][];
  date: Date;
  time: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// SCHEMA FOR EVENT
const EventSchema: Schema<IEvent> = new Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    description: { type: String, required: [true, "Content is required"], maxLength: 500 },
    category: { type: String, required: [true, "Category is required"] },
    date: { type: Date, required: [true, "Date is required"] },
    time: { type: String, required: [true, "Time is required"] },
    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Attachment",
      },
    ],
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// EXPORT EVENT MODEL
export const EventModel =
  (mongoose.models.Event as mongoose.Model<IEvent>) ||
  mongoose.model<IEvent>("Event", EventSchema);
