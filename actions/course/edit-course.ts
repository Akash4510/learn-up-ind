"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { EditCourseSchema } from "@/schemas/course";

export const editCourse = async (
  courseId: string,
  values: EditCourseSchema
) => {
  const validatedFields = EditCourseSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields!",
      },
    };
  }

  const { title, description, thumbnail, categoryId, price } =
    validatedFields.data;

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

  // Check the user in our database
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

  // If the user is modifying the title
  if (trimmedTitle) {
    const existingCourses = await db.course.findMany({
      where: {
        creatorId: user.id,
        title: trimmedTitle,
      },
    });

    // It means that the course with the same name already exists on the channel
    for (const course of existingCourses) {
      if (course.id !== courseId) {
        return {
          error: {
            message: `Course '${trimmedTitle}' already exists. Please select a different title.`,
          },
        };
      }
    }
  }

  const updatedCourse = await db.course.update({
    where: {
      id: courseId,
    },
    data: {
      title: trimmedTitle,
      description: trimmedDescription,
      thumbnail,
      categoryId,
      price,
    },
  });

  revalidatePath(`/studio/courses`);
  revalidatePath(`/studio/courses/${course.id}`);

  return {
    success: {
      message: `Course '${updatedCourse.title}' updated successfully`,
      course: updatedCourse,
    },
  };
};
