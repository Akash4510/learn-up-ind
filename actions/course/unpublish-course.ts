"use server";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const unpublishCourse = async (courseId: string) => {
  const session = await auth();

  if (!session?.user || !session?.user.id) {
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

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      creatorId: user.id,
    },
  });

  if (!course) {
    return {
      error: {
        message: "Course not found!",
      },
    };
  }

  const unpublishedCourse = await db.course.update({
    where: {
      id: courseId,
      creatorId: user.id,
    },
    data: {
      isPublished: false,
    },
  });

  revalidatePath(`/studio/courses/${courseId}`);

  return {
    success: {
      message: `Course ${unpublishedCourse.title} upublished successfully`,
      unpublishedCourse,
    },
  };
};
