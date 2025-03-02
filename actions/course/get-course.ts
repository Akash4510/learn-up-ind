"use server";

import { db } from "@/lib/prisma";
import { CourseWithChapterAndProgress } from "@/types/course";

interface GetCourseOptions {
  userId?: string;
  includeProgress?: boolean;
}

export const getCourse = async (
  courseId: string,
  options: GetCourseOptions = {}
): Promise<CourseWithChapterAndProgress | null> => {
  const { userId, includeProgress = true } = options;

  // Fetch the course with all relevant data
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      category: true,
      chapters: {
        where: {
          isPublished: true, // Only include published chapters
        },
        orderBy: {
          position: "asc", // Order chapters by position
        },
      },
      attachments: true,
      purchases: {
        where: {
          userId: userId || undefined,
        },
      },
      creator: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  if (!course) {
    return null; // Return null if the course doesn't exist
  }

  // Calculate progress if requested and the user is authenticated
  if (includeProgress && userId) {
    const purchased = course.purchases.length > 0;

    if (!purchased) {
      return {
        ...course,
        progress: undefined, // No progress if the course isn't purchased
      };
    }

    // Fetch user progress for the course
    const publishedChapterIds = course.chapters.map((chapter) => chapter.id);
    const userProgress = await db.userProgress.findMany({
      where: {
        userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    // Calculate progress percentage
    const progressPercentage =
      (userProgress.length / publishedChapterIds.length) * 100;

    return {
      ...course,
      progress: Math.round(progressPercentage),
    };
  }

  return course;
};
