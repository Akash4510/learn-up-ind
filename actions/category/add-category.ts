"use server";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { USER_ROLE } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const addCategory = async (category: string) => {
  const session = await auth();

  if (!session?.user || !session?.user.id) {
    return {
      error: {
        message: "Unauthenticated",
      },
    };
  }

  // Check the user in our database
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

  if (user.role === USER_ROLE.USER) {
    return {
      error: {
        message: "Unauthorized",
      },
    };
  }

  const newCategory = await db.category.create({
    data: {
      name: category,
    },
  });

  revalidatePath("/studio/courses/categories");

  return {
    success: {
      message: "Category added successfully",
      newCategory,
    },
  };
};
