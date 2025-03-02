import {
  Course,
  CoursePurchase,
  Category,
  Attachment,
  Chapter,
} from "@prisma/client";
import { Creator } from "@/types/creator";

export type CourseWithProgress = Course & {
  category: Category | null;
  chapters: { id: string }[];
  attachments: Attachment[];
  purchases: CoursePurchase[];
  creator: Creator;
  progress?: number;
};

export type CourseWithChapterAndProgress = Course & {
  category: Category | null;
  chapters: Chapter[];
  attachments: Attachment[];
  purchases: CoursePurchase[];
  creator: Creator;
  progress?: number;
};

export type GetCoursesOptions = {
  userId?: string;
  isPublished?: boolean;
  categoryId?: string;
  creatorId?: string;
  includePurchased?: boolean;
  includeProgress?: boolean;
};
