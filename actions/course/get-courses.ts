"use server";

import { db } from "@/lib/prisma";
import { CourseWithProgress, GetCoursesOptions } from "@/types/course";

export const getCourses = async (
  options: GetCoursesOptions = {}
): Promise<CourseWithProgress[]> => {
  const {
    userId,
    isPublished,
    categoryId,
    creatorId,
    includePurchased = false,
    includeProgress = false,
  } = options;

  // Base query to fetch courses
  const courses = await db.course.findMany({
    where: {
      isPublished: isPublished !== undefined ? isPublished : undefined,
      categoryId: categoryId || undefined,
      creatorId: creatorId || undefined,
    },
    include: {
      category: true,
      chapters: {
        where: {
          isPublished: true, // Only include published chapters
        },
        select: {
          id: true,
        },
      },
      attachments: true,
      purchases: includePurchased
        ? {
            where: {
              userId: userId || undefined,
            },
          }
        : false,
      creator: {
        select: {
          id: true,
          name: true,
          image: true, // Include creator's profile image
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Calculate progress for purchased courses
  if (includeProgress && userId) {
    const coursesWithProgress = await Promise.all(
      courses.map(async (course) => {
        const purchased = course.purchases.length > 0;

        if (!purchased) {
          return {
            ...course,
            progress: undefined,
          };
        }

        // Fetch user progress for the course
        const publishedChapterIds = course.chapters.map(
          (chapter) => chapter.id
        );
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
      })
    );

    return coursesWithProgress;
  }

  return courses;
};
