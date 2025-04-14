"use server";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { KYC_STATUS, USER_ROLE } from "@prisma/client";

export const updateKycStatus = async (kycId: string, status: KYC_STATUS) => {
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

    const kyc = await db.kYC.update({
      where: { id: kycId },
      data: { status },
    });

    return {
      success: {
        message: `KYC status updated to ${status.toLowerCase()}`,
        kyc,
      },
    };
  } catch (error) {
    console.error("Error updating KYC status:", error);
    return {
      error: {
        message: "Failed to update KYC status",
      },
    };
  }
};
