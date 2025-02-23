"use server";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { Attachment, Chapter } from "@prisma/client";

export const getChapter = async (courseId: string, chapterId: string) => {
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

  const purchase = await db.coursePurchase.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId,
      },
    },
  });

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      isPublished: true,
    },
    select: {
      price: true,
    },
  });

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      isPublished: true,
    },
  });

  if (!chapter || !course) {
    return {
      error: {
        message: "Chapter not found!",
      },
    };
  }

  let attachments: Attachment[] = [];
  let nextChapter: Chapter | null = null;

  if (purchase) {
    attachments = await db.attachment.findMany({
      where: {
        courseId,
      },
    });
  }

  if (chapter.isFree || purchase) {
    nextChapter = await db.chapter.findFirst({
      where: {
        courseId,
        isPublished: true,
        position: {
          gt: chapter.position,
        },
      },
      orderBy: {
        position: "asc",
      },
    });
  }

  const userProgress = await db.userProgress.findUnique({
    where: {
      userId_chapterId: {
        userId: user.id,
        chapterId,
      },
    },
  });

  return {
    success: {
      message: "Chapter fetched successfully",
      data: {
        chapter,
        course,
        attachments,
        nextChapter,
        userProgress,
        purchase,
      },
    },
  };
};
