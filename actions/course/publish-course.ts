"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";

export const publishCourse = async (courseId: string) => {
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
    include: {
      chapters: true,
    },
  });

  if (!course) {
    return {
      error: {
        message: "Course not found!",
      },
    };
  }

  const hasPublishedChapter = course.chapters.some(
    (chapter) => chapter.isPublished
  );

  if (
    !course.title ||
    !course.description ||
    !course.thumbnail ||
    !course.categoryId ||
    !hasPublishedChapter
  ) {
    return {
      error: {
        message: "Missing required fields",
      },
    };
  }

  const publishedCourse = await db.course.update({
    where: {
      id: courseId,
      creatorId: user.id,
    },
    data: {
      isPublished: true,
    },
  });

  revalidatePath(`/studio/courses/${courseId}`);

  return {
    success: {
      message: `Course ${publishedCourse.title} published successfully`,
      publishedCourse,
    },
  };
};
