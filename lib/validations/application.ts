import { z } from "zod";

export const ApplicationSchema = z.object({
  company: z
    .string()
    .trim()
    .min(2, "Company must be at least 2 characters.")
    .max(100, "Company name is too long."),

  position: z
    .string()
    .trim()
    .min(2, "Position must be at least 2 characters.")
    .max(100, "Position is too long."),

  location: z.string().trim().max(100, "Location is too long.").optional(),

  status: z.enum(["APPLIED", "SCREENING", "INTERVIEW", "OFFER", "REJECTED"]),

  jobUrl: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || z.string().url().safeParse(value).success,
      {
        message: "Please enter a valid URL.",
      },
    ),

  notes: z
    .string()
    .trim()
    .max(2000, "Notes cannot exceed 2000 characters.")
    .optional(),
});

export type ApplicationInput = z.infer<typeof ApplicationSchema>;
