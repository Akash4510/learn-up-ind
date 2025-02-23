"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";

export const deleteCourse = async (courseId: string) => {
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

  const deletedCourse = await db.course.delete({
    where: {
      id: courseId,
    },
  });

  revalidatePath(`/studio/courses`);

  return {
    success: {
      message: `Course '${deletedCourse.title}' deleted successfully`,
      course: deletedCourse,
    },
  };
};
