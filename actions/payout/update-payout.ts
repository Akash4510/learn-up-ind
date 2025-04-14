"use server";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { PAYOUT_STATUS, USER_ROLE } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updatePayout = async (
  payoutId: string,
  transactionId: string,
  comment?: string
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
          message: "User not found",
        },
      };
    }

    if (user.role !== USER_ROLE.ADMIN) {
      return {
        error: {
          message: "Unauthorized",
        },
      };
    }

    // Update the payout status
    const payout = await db.payout.update({
      where: { id: payoutId },
      data: {
        status: PAYOUT_STATUS.COMPLETED,
        transactionId,
        payoutDate: new Date(),
      },
    });

    revalidatePath("/studio/payouts");
    revalidatePath("/dashboard/payout");

    return {
      success: {
        message: "Payout completed successfully",
        payout,
      },
    };
  } catch (error) {
    console.error("Error updating payout:", error);
    return {
      error: {
        message: "Failed to update payout",
      },
    };
  }
}; 