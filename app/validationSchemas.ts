import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(33),
  description: z.string().min(1, "Description is required").max(65535),
});
export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(33).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "Assigned user is required")
    .max(255)
    .optional()
    .nullable(),
});
