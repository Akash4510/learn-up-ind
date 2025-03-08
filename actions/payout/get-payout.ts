"use server";

import { db } from "@/lib/prisma";

export const getPayouts = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      affiliate: {
        include: {
          payouts: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.affiliate) {
    throw new Error("Affiliate not found");
  }

  return user.affiliate.payouts;
};
