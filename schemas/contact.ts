import { z } from "zod";

export const ContactSchema = z.object({
  email: z.string().email({
    message: "Not a valid email address",
  }),
  message: z.string({
    required_error: "Message is required",
  }),
});

export type ContactSchema = z.infer<typeof ContactSchema>;
