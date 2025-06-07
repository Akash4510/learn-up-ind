"use server";

import { revalidatePath } from "next/cache";
import { PAYOUT_STATUS, USER_ROLE } from "@prisma/client";

import { auth } from "@/auth";
import { sendSuccessFullWithdrawlMail } from "@/lib/mail";
import { db } from "@/lib/prisma";

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
        comment,
      },
    });

    revalidatePath("/studio/payouts");
    revalidatePath("/dashboard/payout");

    try {
      sendSuccessFullWithdrawlMail(user.email as string, payout);
    } catch (err) {
      console.log("Error sending successfull withdrawl mail", err);
    }

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
