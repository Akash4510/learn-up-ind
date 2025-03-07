import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Referral } from "@prisma/client";

import { db } from "@/lib/prisma";
import { getReferralCodeFromCookies } from "@/lib/referral";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET!;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  return sig;
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { orderId, userId, amount, razorpayPaymentId, razorpaySignature } =
    await req.json();

  console.log({
    orderId,
    userId,
    amount,
    razorpayPaymentId,
    razorpaySignature,
  });
  const { courseId } = await params;

  const signature = generatedSignature(orderId, razorpayPaymentId);

  if (signature !== razorpaySignature) {
    return NextResponse.json(
      {
        error: {
          message: "Invalid signature! Payment verification failed",
        },
      },
      { status: 400 }
    );
  }

  // DB logic to update the course purchase
  const purchase = await db.coursePurchase.create({
    data: {
      userId,
      courseId,
      amount,
      razorpayOrderId: orderId,
      razorpayPaymentId,
    },
  });

  const referralCode = await getReferralCodeFromCookies();
  console.log("Referral code from cookies:", referralCode);

  let referralStatus: "FAILED" | "SUCCESS" | "NO_REFERRAL" = "NO_REFERRAL";
  let referral: Referral | undefined = undefined;

  if (referralCode) {
    const affiliate = await db.affiliate.findUnique({
      where: { referralCode },
    });

    if (!affiliate) {
      referralStatus = "FAILED";
    } else {
      const commissionEarned = purchase.amount * 0.7;

      try {
        // Create the referral
        referral = await db.referral.create({
          data: {
            affiliateId: affiliate.id,
            referredUserId: userId,
            purchaseId: purchase.id,
            amount: purchase.amount,
            commissionEarned,
          },
        });

        referralStatus = "SUCCESS";

        // Create the payout
        await db.payout.create({
          data: {
            referralId: referral.id,
            affiliateId: referral.affiliateId,
            amount: referral.commissionEarned,
          },
        });

        // Update the affiliate earnings and pending payouts
        await db.affiliate.update({
          where: { referralCode },
          data: {
            totalEarnings: { increment: commissionEarned },
            pendingPayout: { increment: commissionEarned },
          },
        });
      } catch (error) {
        console.log("Error processing referral: ", error);
      }
    }
  }

  return NextResponse.json(
    {
      success: {
        message: "Payment successful",
        purchase,
        referralStatus,
        referral,
      },
    },
    { status: 200 }
  );
}
