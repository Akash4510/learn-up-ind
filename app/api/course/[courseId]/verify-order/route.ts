import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Referral } from "@prisma/client";

import { db } from "@/lib/prisma";
import { getReferralCodeFromCookies } from "@/lib/referral";
import { sendSuccessFullReferrallMail } from "@/lib/mail";

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
      include: {
        user: true,
      },
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

        // Update the affiliate earnings and pending payouts
        await db.affiliate.update({
          where: { referralCode },
          data: {
            totalEarnings: { increment: commissionEarned },
            pendingPayout: { increment: commissionEarned },
          },
          include: {
            user: true,
          },
        });

        try {
          const referredUser = await db.user.findUnique({
            where: { id: referral.referredUserId },
          });

          const referralWithReferredUser = {
            ...referral,
            referredUser,
          };

          sendSuccessFullReferrallMail(
            affiliate.user.email as string,
            referralWithReferredUser
          );
        } catch (err) {
          console.log("Error sending referral success mail", err);
        }
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
