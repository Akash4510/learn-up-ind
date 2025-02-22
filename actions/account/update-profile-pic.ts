"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";

export const updateProfilePic = async (url: string) => {
  if (!url) {
    return {
      error: {
        message: "Url not provided",
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
      image: url,
    },
  });

  revalidatePath("/dashboard/account");

  return {
    success: {
      message: "Profile photo updated",
    },
  };
};
