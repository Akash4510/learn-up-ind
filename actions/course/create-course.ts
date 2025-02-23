"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { CreateCourseSchema } from "@/schemas/course";

export const createCourse = async (values: CreateCourseSchema) => {
  const validatedFields = CreateCourseSchema.safeParse(values);

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

  // Check the user in our database
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

  const existingCourse = await db.course.findFirst({
    where: {
      creatorId: user.id,
      title: trimmedTitle,
    },
  });

  if (existingCourse) {
    return {
      error: {
        message: `Course named - '${trimmedTitle}' already exists. Please choose a different title`,
      },
    };
  }

  const course = await db.course.create({
    data: {
      creatorId: user.id,
      title: trimmedTitle,
    },
  });

  revalidatePath(`/studio/courses/`);

  return {
    success: {
      message: `Course '${course.title}' created successfully`,
      course,
    },
  };
};
