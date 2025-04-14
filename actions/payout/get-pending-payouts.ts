"use server";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { PAYOUT_STATUS, USER_ROLE } from "@prisma/client";

export const getPendingPayouts = async () => {
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

    const payouts = await db.payout.findMany({
      where: {
        status: PAYOUT_STATUS.PENDING,
      },
      include: {
        affiliate: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                kyc: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: {
        payouts,
      },
    };
  } catch (error) {
    console.error("Error fetching pending payouts:", error);
    return {
      error: {
        message: "Failed to fetch pending payouts",
      },
    };
  }
}; 