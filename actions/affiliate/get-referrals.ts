"use server";

import { db } from "@/lib/prisma";

export const getReferrals = async (affiliateId: string) => {
  try {
    const referrals = await db.referral.findMany({
      where: {
        affiliateId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: {
        referrals,
      },
    };
  } catch (error) {
    console.error("Error fetching referrals:", error);
    return {
      error: {
        message: "Failed to fetch referrals",
      },
    };
  }
};
