"use server";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteAttachment = async (
  courseId: string,
  attachmentId: string
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

    const attachment = await db.attachment.findUnique({
      where: { id: attachmentId, courseId },
      include: {
        course: true,
      },
    });

    if (!attachment) {
      return {
        error: {
          message: "Attachment not found!",
        },
      };
    }

    if (!attachment.course) {
      return {
        error: {
          message: "Course not found!",
        },
      };
    }

    await db.attachment.delete({
      where: {
        id: attachmentId,
        courseId,
      },
    });

    revalidatePath(`/studio/courses/${courseId}`);

    return {
      success: {
        message: `Attachment ${attachment.name} deleted`,
      },
    };
  } catch (error) {
    console.error("Error deleting attachment", error);
    return {
      error: {
        message: "Something went wrong!",
      },
    };
  }
};
