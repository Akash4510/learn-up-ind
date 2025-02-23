"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

export const reorderChapters = async (
  courseId: string,
  values: { id: string; position: number }[]
) => {
  // Not checking for user authentication here, because this action is only available to the course creator in the studio, and this action is not harmful, so to make this faster, we are skipping the user authentication check.

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "desc",
        },
      },
    },
  });

  if (!course) {
    return {
      error: {
        message: "Course not found!",
      },
    };
  }

  for (const item of values) {
    await db.chapter.update({
      where: { id: item.id },
      data: { position: item.position },
    });
  }

  revalidatePath(`/studio/courses/${courseId}`);

  return {
    success: {
      message: `Chapters reodered`,
    },
  };
};
