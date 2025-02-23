"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { CreateChapterSchema } from "@/schemas/chapter";

export const createChapter = async (
  courseId: string,
  values: CreateChapterSchema
) => {
  const validatedFields = CreateChapterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields!",
      },
    };
  }

  const { title } = validatedFields.data;
  const trimmedTitle = title.trim();

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

  for (const ch of course.chapters) {
    if (ch.title === trimmedTitle) {
      return {
        error: {
          message: `Chapter with name - '${trimmedTitle}' already exists`,
        },
      };
    }
  }

  const newPosition = course.chapters.length + 1;

  const chapter = await db.chapter.create({
    data: {
      title: trimmedTitle,
      courseId,
      position: newPosition,
    },
  });

  revalidatePath(`/studio/courses`);
  revalidatePath(`/studio/courses/${courseId}`);

  return {
    success: {
      message: `Chapter - '${title}' added`,
      chapter,
    },
  };
};
