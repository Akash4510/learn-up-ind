"use server";

import { db } from "@/lib/prisma";

export const getCategories = async () => {
  const categories = await db.category.findMany({});
  return categories;
};
