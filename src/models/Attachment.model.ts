import mongoose, { Schema, Document } from "mongoose";

// ENUM FOR ATTACHMENT TYPE
export enum AttachmentType {
  IMAGE = "image",
  VIDEO = "video",
}

// INTERFACE FOR ATTACHMENT
export interface IAttachment extends Document {
  url: string;
  type: AttachmentType;
}

// SCHEMA FOR ATTACHMENT
const AttachmentSchema: Schema<IAttachment> = new Schema(
  {
    url: {
      type: String,
      required: [true, "Filename is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(AttachmentType),
      required: [true, "Type is required"],
    },
  },
  {
    timestamps: true,
  }
);

// EXPORT ATTACHMENT MODEL
export const AttachmentModel =
  (mongoose.models.Attachment as mongoose.Model<IAttachment>) ||
  mongoose.model<IAttachment>("Attachment", AttachmentSchema);
