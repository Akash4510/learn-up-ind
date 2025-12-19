"use server";

import { sendContactFormEmail } from "@/lib/mail";
import { ContactSchema } from "@/schemas/contact";

export const sendMessage = async (values: ContactSchema) => {
  const validatedFields = ContactSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields!",
      },
    };
  }

  const { email, message } = validatedFields.data;

  try {
    await sendContactFormEmail(email, message);

    return {
      success: {
        message: "Email sent! We'll get back to you soon.",
      },
    };
  } catch (error) {
    console.error("CONTACT_FORM_EMAIL_ERROR", error);
    return {
      error: {
        message: "Something went wrong!",
      },
    };
  }
};
