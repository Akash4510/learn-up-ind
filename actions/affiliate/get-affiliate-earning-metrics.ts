"use server";

import { db } from "@/lib/prisma";

export const getAffiliateEarningMetrics = async (affiliateId: string) => {
  const now = new Date();

  // Today's start time
  const todayStart = new Date(now.setHours(0, 0, 0, 0));

  // Last week start time
  const lastWeekStart = new Date(now.setDate(now.getDate() - 7));

  // Last month start time
  const lastMonthStart = new Date(now.setMonth(now.getMonth() - 1));

  // Fetch all metrics in parallel
  const [totalEarnings, lastMonthEarnings, lastWeekEarnings, todayEarnings] =
    await Promise.all([
      // Total Earnings
      db.referral.aggregate({
        where: { affiliateId },
        _sum: { commissionEarned: true },
      }),

      // Last Month Earnings
      db.referral.aggregate({
        where: {
          affiliateId,
          createdAt: { gte: lastMonthStart },
        },
        _sum: { commissionEarned: true },
      }),

      // Last Week Earnings
      db.referral.aggregate({
        where: {
          affiliateId,
          createdAt: { gte: lastWeekStart },
        },
        _sum: { commissionEarned: true },
      }),

      // Today's Earnings
      db.referral.aggregate({
        where: {
          affiliateId,
          createdAt: { gte: todayStart },
        },
        _sum: { commissionEarned: true },
      }),
    ]);

  return {
    totalEarnings: totalEarnings._sum.commissionEarned || 0,
    lastMonthEarnings: lastMonthEarnings._sum.commissionEarned || 0,
    lastWeekEarnings: lastWeekEarnings._sum.commissionEarned || 0,
    todayEarnings: todayEarnings._sum.commissionEarned || 0,
  };
};
