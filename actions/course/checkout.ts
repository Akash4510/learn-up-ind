"use server";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";

export const createOrder = async ({ courseId }: { courseId: string }) => {
  const session = await auth();

  if (!session?.user || !session?.user.id) {
    return {
      error: {
        message: "Unauthenticated",
      },
    };
  }

  // Check the user in our database
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      kyc: true,
    },
  });

  if (!user) {
    return {
      error: {
        message: "User not found!",
      },
    };
  }

  // if (!user.kyc) {
  //   return {
  //     error: {
  //       redirectTo: "/dashboard/account/kyc",
  //       message: "Please complete your KYC to purchase a course",
  //     },
  //   };
  // }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      isPublished: true,
    },
  });

  if (!course) {
    return {
      error: {
        message: "Course not found",
      },
    };
  }

  const purchased = await db.coursePurchase.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: courseId,
      },
    },
  });

  if (purchased) {
    return {
      error: {
        message: "Course already purchased",
      },
    };
  }

  const price = course.price || 0; // Here we know that the price property is not null, becaused before publishing the course, the price must be set, and here we are only fetching published courses
  // But for safety, we are using the nullish coalescing operator to set the price to 0 if it is null

  const order = await razorpay.orders.create({
    amount: price * 100,
    currency: "INR",
    receipt: `course-${course.id}`, // This is a unique identifier for the order, it can be a maximum of 40 characters,
    notes: {
      userId: user.id,
      userName: user.name,
      courseId: course.id,
      courseTitle: course.title,
      timestamp: new Date().toISOString(),
    },
  });

  return {
    success: {
      message: "Checkout successful",
      order,
      metadata: {
        userId: user.id,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          country: user.country,
          state: user.state,
        },
        courseId: course.id,
        courseName: course.title,
        purchaseDate: order.created_at,
      },
    },
  };
};
