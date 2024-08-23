import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string({
      message: "Title is required.",
    })
    .min(1, {
      message: "Title must be at least 2 characters long.",
    })
    .max(70),
  description: z
    .string({
      message: "Description is required.",
    })
    .min(50, {
      message: "Description must be at least 50 characters long.",
    })
    .max(1000),
  //files
});