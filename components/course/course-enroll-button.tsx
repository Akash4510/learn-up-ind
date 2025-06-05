/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTransition } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import { CircleCheck, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createOrder } from "@/actions/course/checkout";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { CourseWithProgress } from "@/types/course";
import { useAuth } from "@/hooks/use-auth";
import { createAffiliate } from "@/actions/affiliate";
import { InvoiceDetails } from "@/types/invoice";
import { sendPurchaseInvoiceEmail } from "@/actions/invoice/send-purchase-invoice-email";

interface CourseEnrollButtonProps {
  course: CourseWithProgress;
}

export const CourseEnrollButton = ({ course }: CourseEnrollButtonProps) => {
  const { id: courseId } = course;
  const price = course.price || 0;

  const session = useAuth();
  if (!session || !session.user) {
    redirect("/auth/login");
  }

  const isPurchased = course.purchases.some(
    (purchase) => purchase.userId === session.user?.id
  );

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const confetti = useConfettiStore();

  const onClick = async () => {
    startTransition(() => {
      createOrder({ courseId })
        .then((data) => {
          const { error, success } = data;

          if (error) {
            toast.error(error.message);

            // if (error.redirectTo) {
            //   router.push(error.redirectTo);
            // }
          }
          if (success) {
            const { order, metadata } = success;

            const paymentData = {
              key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
              amount: price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              currency: "INR",
              name: "LearnUPIND", // The company name
              description: "Course Enrollment", // !Should not exceed 255 Characters
              image: "/logo.png", // Company logo
              order_id: order.id,
              handler: async function (response: any) {
                try {
                  // Verify the payment
                  const verifyRes = await fetch(
                    `/api/course/${courseId}/verify-order`,
                    {
                      method: "POST",
                      body: JSON.stringify({
                        orderId: order.id,
                        userId: metadata.userId,
                        amount: price,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                      }),
                    }
                  );

                  const verifyData = await verifyRes.json();
                  console.log(verifyData);

                  if (verifyData.error) {
                    toast.error(verifyData.error.message);
                  } else {
                    toast.success("Payment successful");
                    confetti.onOpen();

                    // Create the affilate if the user is not already an affiliate
                    // When purchasing the first course.
                    createAffiliate(metadata.userId).then((data) => {
                      const { success, error } = data;
                      if (error) {
                        toast.error(error.message);
                      }
                      if (success) {
                        toast.success(success.message);
                      }
                    });

                    const invoiceDetails: InvoiceDetails = {
                      amount: String(price),
                      orderId: order.id,
                      date: metadata.purchaseDate.toLocaleString(),
                      courseId: metadata.courseId,
                      courseName: metadata.courseName,
                      paymentId: response.razorpay_payment_id,
                      user: {
                        name: metadata.user.name as string,
                        email: metadata.user.email as string,
                        state: metadata.user.state as string,
                        country: metadata.user.country as string,
                      },
                    };

                    sendPurchaseInvoiceEmail(
                      metadata.user.email as string,
                      invoiceDetails
                    );

                    // Refresh the page
                    router.refresh();
                  }
                } catch (error) {
                  console.log({ paymentHandlerError: error });
                  toast.error("Something went wrong!");
                }
              },
            };

            const rzp = new (window as any).Razorpay(paymentData);
            rzp.open();
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };

  if (isPurchased) {
    return (
      <Button
        size="sm"
        className="w-full bg-emerald-500 hover:bg-emerald-600"
        disabled={isPending}
        asChild
      >
        <Link href={`/courses/${course.id}/chapters/${course.chapters[0].id}`}>
          <CircleCheck className="size-4" />
          Go to course
        </Link>
      </Button>
    );
  }

  return (
    <Button size="sm" className="w-full" disabled={isPending} onClick={onClick}>
      {isPending ? <Loader2 className="size-4 animate-spin" /> : `Enroll`}
    </Button>
  );
};
