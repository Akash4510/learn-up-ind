"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { auth } from "@/auth";

export const deleteChapter = async (courseId: string, chapterId: string) => {
  // Check the user in our database
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

  const deletedChapter = await db.chapter.delete({
    where: {
      id: chapterId,
    },
  });

  const publishedChaptersInCourse = await db.chapter.findMany({
    where: {
      courseId,
      isPublished: true,
    },
  });

  // If this was the only published chapter in the course
  // Then we need to mark the course as unpublished
  if (!publishedChaptersInCourse.length) {
    await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: false,
      },
    });
  }

  revalidatePath(`/studio/courses/${courseId}`);
  revalidatePath(`/studio/courses/${courseId}/chapters/${chapterId}`);

  return {
    success: {
      message: `Chapter '${deletedChapter.title}' deleted successfully`,
      deletedChapter,
    },
  };
};
