"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { EditChapterSchema } from "@/schemas/chapter";

export const editChapter = async (
  courseId: string,
  chapterId: string,
  values: EditChapterSchema
) => {
  const validatedFields = EditChapterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields!",
      },
    };
  }

  const { title, description, isFree, videoUrl } = validatedFields.data;

  if (title && title.trim() === "") {
    return {
      error: {
        message: "Title cannot be empty",
      },
    };
  }

  const trimmedTitle = title?.trim();
  const trimmedDescription = description?.trim();

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

  // If the user is modifying the title
  if (trimmedTitle) {
    const existingChapters = await db.chapter.findMany({
      where: {
        courseId,
        title: trimmedTitle,
      },
    });

    // It means that the course with the same name already exists on the channel
    for (const chapter of existingChapters) {
      if (chapter.id !== chapterId) {
        return {
          error: {
            message: `Chapter '${trimmedTitle}' already exists on this course. Please select a different title.`,
          },
        };
      }
    }
  }

  const updatedChapter = await db.chapter.update({
    where: {
      id: chapterId,
      courseId,
    },
    data: {
      title: trimmedTitle,
      description: trimmedDescription,
      isFree,
      videoUrl,
    },
  });

  revalidatePath(`/studio/courses/${courseId}`);
  revalidatePath(`/studio/courses/${courseId}/chapters/${chapterId}`);

  return {
    success: {
      message: `Chapter '${updatedChapter.title}' updated successfully`,
      chapter: updatedChapter,
    },
  };
};
