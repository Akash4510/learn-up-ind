"use server";

import { db } from "@/lib/prisma";
import { AffiliateWithReferral } from "@/types/affiliate";

export const getAffiliateByUserId = async (
  userId: string
): Promise<AffiliateWithReferral | null> => {
  const affiliate = await db.affiliate.findUnique({
    where: { userId },
    include: {
      referrals: true,
    },
  });

  return affiliate;
};

export const getAffiliateByID = async (
  id: string
): Promise<AffiliateWithReferral | null> => {
  const affiliate = await db.affiliate.findUnique({
    where: { id },
    include: {
      referrals: true,
    },
  });

  return affiliate;
};
