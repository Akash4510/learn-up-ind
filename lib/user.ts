import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    return user;
  } catch {
    return null;
  }
};

export const addUsernameToUser = async (id: string) => {
  const user = await getUserById(id);

  if (!user || user.username) return;

  const baseUsername =
    user.name?.split(" ")[0] ||
    user.email?.split("@")[0] ||
    uuidv4().split("-")[0];
  const username = generateUniqueUsername(baseUsername);

  await db.user.update({
    where: { id },
    data: { username },
  });
};

/**
 * Generate a truly unique username in the format: `u_name-uniqueId`
 * @param randomLength - Length of the random string (default: 6)
 * @returns A unique username
 */
const generateUniqueUsername = (name: string): string => {
  // Generate a random string
  const namePart = name
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9]/g, "") // Remove special characters
    .slice(0, 8); // Limit to 8 characters for brevity

  // Generate a unique identifier (UUID)
  const uniqueId = uuidv4().split("-")[0]; // Use the first part of the UUID

  // Combine into a username
  return `u_${namePart}-${uniqueId}`;
};
