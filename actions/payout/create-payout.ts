"use server";

import { db } from "@/lib/prisma";
import { PAYOUT_STATUS } from "@prisma/client";

export const createPayout = async (affiliateId: string, amount: number) => {
  try {
    console.log("Creating payout for affiliate:", affiliateId, "with amount:", amount);
    
    // Validate inputs
    if (!affiliateId || typeof affiliateId !== 'string') {
      console.log("Invalid affiliate ID:", affiliateId);
      return {
        error: {
          message: "Invalid affiliate ID",
        },
      };
    }
    
    if (typeof amount !== 'number' || isNaN(amount)) {
      console.log("Invalid amount:", amount);
      return {
        error: {
          message: "Invalid amount",
        },
      };
    }
    
    console.log("Checking if affiliate exists...");
    // Check if the affiliate exists
    const affiliate = await db.affiliate.findUnique({
      where: { id: affiliateId },
    });

    console.log("Affiliate found:", affiliate);

    if (!affiliate) {
      return {
        error: {
          message: "Affiliate not found",
        },
      };
    }

    // Check if the requested amount is valid
    if (amount <= 0) {
      return {
        error: {
          message: "Payout amount must be greater than zero",
        },
      };
    }

    // Check if the requested amount is available in pending payout
    if (amount > affiliate.pendingPayout) {
      return {
        error: {
          message: "Requested amount exceeds available pending payout",
        },
      };
    }

    console.log("Creating payout in database...");
    // Create the payout
    const payout = await db.payout.create({
      data: {
        affiliateId,
        amount,
        status: PAYOUT_STATUS.PENDING,
      },
    });

    console.log("Payout created:", payout);

    console.log("Updating affiliate pending payout...");
    // Update the affiliate's pending payout
    const updatedAffiliate = await db.affiliate.update({
      where: { id: affiliateId },
      data: {
        pendingPayout: { decrement: amount },
      },
    });

    console.log("Affiliate updated:", updatedAffiliate);

    return {
      success: {
        message: "Payout request created successfully",
        payout,
      },
    };
  } catch (error) {
    console.error("Error creating payout:", error);
    return {
      error: {
        message: "Failed to create payout request",
        details: error instanceof Error ? error.message : String(error),
      },
    };
  }
};
