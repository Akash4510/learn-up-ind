"use server";

import { revalidatePath } from "next/cache";
import { KYC_STATUS } from "@prisma/client";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { KYCSchema } from "@/schemas/account";

export const updateKYC = async (values: KYCSchema) => {
  const validatedFields = KYCSchema.safeParse(values);
  console.log("values", values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields",
      },
    };
  }

  const session = await auth();

  if (!session || !session.user) {
    return {
      error: {
        message: "Unauthorized",
      },
    };
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { kyc: true },
  });

  if (!user) {
    return {
      error: {
        message: "User not found",
      },
    };
  }

  if (!user.kyc) {
    await db.kYC.create({
      data: {
        ...validatedFields.data,
        userId: session.user.id,
        status: KYC_STATUS.PENDING,
      },
    });
  } else {
    await db.kYC.update({
      where: { id: user.kyc.id },
      data: {
        ...validatedFields.data,
        status: KYC_STATUS.PENDING,
      },
    });
  }

  revalidatePath("/dashboard/account");

  return {
    success: {
      message: "KYC updated successfully",
    },
  };
};
