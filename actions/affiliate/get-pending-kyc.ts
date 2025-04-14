"use server";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { KYC_STATUS, USER_ROLE } from "@prisma/client";

export const getPendingKyc = async () => {
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

    const users = await db.user.findMany({
      where: {
        kyc: {
          status: KYC_STATUS.PENDING,
        },
      },
      include: {
        kyc: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: {
        users,
      },
    };
  } catch (error) {
    console.error("Error fetching pending KYC:", error);
    return {
      error: {
        message: "Failed to fetch pending KYC requests",
      },
    };
  }
}; 