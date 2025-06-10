"use server";

import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas/auth";
import { db } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendRegistrationMail, sendVerificationEmail } from "@/lib/mail";
import { generateUniqueUsername } from "@/lib/user";

export const register = async (values: RegisterSchema) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields!",
      },
    };
  }

  const { name, email, password } = validatedFields.data;

  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      error: {
        message: `Email ${email} already registered`,
      },
    };
  }

  const baseUsername = name?.split(" ")[0] || email?.split("@")[0];
  const username = generateUniqueUsername(baseUsername);

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword, // Make sure to store hashed password only
      username,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verificationToken.identifier,
    verificationToken.token
  );

  try {
    sendRegistrationMail(newUser);
  } catch (error) {
    console.log("Error sending new registration mail", error);
  }

  return {
    success: {
      message: "Verification email sent. Please verify your email to login",
      user: newUser,
    },
  };
};
