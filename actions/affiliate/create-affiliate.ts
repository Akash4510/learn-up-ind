"use server";

import { db } from "@/lib/prisma";
import { generateReferralCode } from "@/lib/referral";

export const createAffiliate = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return {
      error: {
        message: "User not found!",
      },
    };
  }

  const existingAffiliate = await db.affiliate.findUnique({
    where: { userId },
  });

  if (existingAffiliate) {
    return {
      error: {
        message: "User is already an affiliate!",
      },
    };
  }

  let referralCode = generateReferralCode();
  let isCodeUnique = false;

  // Generate a unique affiliate code
  while (!isCodeUnique) {
    // Check if the code already exists
    const existingCode = await db.affiliate.findUnique({
      where: { referralCode },
    });

    if (!existingCode) {
      isCodeUnique = true;
    } else {
      referralCode = generateReferralCode();
    }
  }

  const affiliate = await db.affiliate.create({
    data: {
      userId,
      referralCode,
    },
  });

  return {
    success: {
      message: "Congratulations! You are now an affiliate",
      affiliate,
    },
  };
};
