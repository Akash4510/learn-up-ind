"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { auth } from "@/auth";

export const publishChapter = async (courseId: string, chapterId: string) => {
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

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
  });

  if (!chapter) {
    return {
      error: {
        message: "Chapter not found!",
      },
    };
  }

  if (!chapter.title || !chapter.description || !chapter.videoUrl) {
    return {
      error: {
        message: "Missing required fields!",
      },
    };
  }

  const publishedChapter = await db.chapter.update({
    where: {
      id: chapterId,
      courseId,
    },
    data: {
      isPublished: true,
    },
  });

  revalidatePath(`/studio/courses/${courseId}`);
  revalidatePath(`/studio/courses/${courseId}/chapters/${chapterId}`);

  return {
    success: {
      message: `Chapter '${publishedChapter.title}' published successfully`,
      publishedChapter,
    },
  };
};
