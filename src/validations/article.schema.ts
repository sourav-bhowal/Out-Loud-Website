import { z } from "zod";

// Article schema
export const createArticleSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(20),
  category: z.string().min(3),
  attachmentIds: z
    .array(z.string())
    .max(5, "Max 5 attachemnt per event")
    .optional(),
});

// Article schema type
export type CreateArticleSchemaType = z.infer<typeof createArticleSchema>;

// Event schema
export const createEventSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20).max(500),
  category: z.string().min(3),
  date: z.date().refine((date) => date > new Date()),
  time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  attachmentIds: z
    .array(z.string())
    .max(5, "Max 5 attachemnt per event")
    .optional(),
});

// Event schema type
export type CreateEventSchemaType = z.infer<typeof createEventSchema>;
