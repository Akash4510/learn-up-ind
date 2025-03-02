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

type BaseGetCoursesOptions = {
  isPublished?: boolean;
  categoryId?: string;
  creatorId?: string;
  includePurchased?: boolean;
  includeProgress?: boolean;
};

type OnlyPurchasedOptions = {
  onlyPurchased: true;
  userId: string; // userId is mandatory when onlyPurchased is true
};

type NonOnlyPurchasedOptions = {
  onlyPurchased?: false | undefined;
  userId?: string; // userId is optional when onlyPurchased is false or undefined
};

export type GetCoursesOptions = BaseGetCoursesOptions &
  (OnlyPurchasedOptions | NonOnlyPurchasedOptions);
