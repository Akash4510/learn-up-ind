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
    includeSelfCreated = false,
    includeProgress = false,
    excludePurchasedCourses = false,
    includePurchasesData = true,
    page,
    pageSize,
  } = options;

  // Calculate skip and take for pagination
  const skip = page && pageSize ? (page - 1) * pageSize : undefined;
  const take = pageSize;

  // Base query to fetch courses
  const courses = await db.course.findMany({
    where: {
      isPublished,
      categoryId,
      creatorId,
      // Add a condition to filter courses based on purchases or creator
      // Handle purchased courses exclusion
      ...(userId && excludePurchasedCourses
        ? {
            NOT: {
              purchases: {
                some: {
                  userId,
                },
              },
            },
          }
        : {}),
      // Handle self-created courses inclusion
      ...(userId && includeSelfCreated
        ? {
            OR: [
              { creatorId: userId },
              // Only include purchased if not excluding them
              ...(excludePurchasedCourses
                ? []
                : [
                    {
                      purchases: {
                        some: {
                          userId,
                        },
                      },
                    },
                  ]),
            ],
          }
        : userId
        ? {
            // If not including self-created, only show purchased (unless excluding)
            ...(excludePurchasedCourses
              ? {}
              : {
                  purchases: {
                    some: {
                      userId,
                    },
                  },
                }),
          }
        : {}),
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
      purchases: includePurchasesData
        ? {
            where: {
              userId,
            },
          }
        : false,
      creator: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip, // Number of records to skip
    take, // Number of records to take
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
