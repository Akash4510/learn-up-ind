"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";

export const addAttachment = async (
  courseId: string,
  attachmentUrl: string
) => {
  try {
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

    const existingCourse = await db.course.findUnique({
      where: { id: courseId, creatorId: user.id },
    });

    if (!existingCourse) {
      return {
        error: {
          message: "Course not found!",
        },
      };
    }

    const attachmentName =
      attachmentUrl.split("/").pop() || new Date().toISOString();

    const attachment = await db.attachment.create({
      data: {
        url: attachmentUrl,
        name: attachmentName,
        courseId,
      },
    });

    revalidatePath(`/studio/courses/${courseId}`);

    return {
      success: {
        message: `Attachment '${attachmentName}' added succesfully`,
        attachment,
      },
    };
  } catch (error) {
    console.error("Error adding attachment", error);
    return {
      error: {
        message: "Error adding attachment",
      },
    };
  }
};
