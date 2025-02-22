"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { PersonalInfoSchema } from "@/schemas/account";

export const updatePersonalInfo = async (values: PersonalInfoSchema) => {
  const validatedFields = PersonalInfoSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields",
      },
    };
  }

  const session = await auth();

  if (!session || !session.user) {
    return {
      error: {
        message: "Unauthorized",
      },
    };
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return {
      error: {
        message: "User not found",
      },
    };
  }

  await db.user.update({
    where: { id: session.user.id },
    data: {
      ...validatedFields.data,
    },
  });

  revalidatePath("/dashboard/account");

  return {
    success: {
      message: "Personal info updated successfully",
    },
  };
};
