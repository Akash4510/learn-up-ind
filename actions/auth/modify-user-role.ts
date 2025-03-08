"use server";

import { USER_ROLE } from "@prisma/client";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const modifyUserRole = async (userId: string, role: USER_ROLE) => {
  const session = await auth();

  if (!session || !session.user) {
    return {
      error: {
        message: "Unauthenticated",
      },
    };
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return {
      error: {
        message: "User not found!",
      },
    };
  }

  if (user.role !== USER_ROLE.ADMIN) {
    return {
      error: {
        message: "Unauthorized",
      },
    };
  }

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: {
      role,
    },
  });

  revalidatePath("/studio/users/role");

  return {
    success: {
      message: "User role updated successfully!",
      updatedUser,
    },
  };
};
