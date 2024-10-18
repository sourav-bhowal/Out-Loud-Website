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

//
export const filterSchema = z.object({
  page: z.string().optional(),
  perPage: z.string().optional(),
});

export type FilterSchemaType = z.infer<typeof filterSchema>;
