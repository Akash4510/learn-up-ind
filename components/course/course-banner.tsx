import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, PlayCircle } from "lucide-react";

import { CourseWithChapterAndProgress } from "@/types/course";
import { CourseEnrollButton } from "./course-enroll-button";

interface CourseBannerProps {
  course: CourseWithChapterAndProgress;
}

export const CourseBanner = ({ course }: CourseBannerProps) => {
  return (
    <div className="relative h-[60vh] w-full">
      {course.thumbnail ? (
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
        />
      ) : (
        <div className="flex items-center justify-center bg-muted h-full">
          <PlayCircle className="h-10 w-10 text-muted-foreground" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black to-black/60" />
      <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-end pb-12">
        <Link
          href="/courses"
          prefetch={false}
          className="mb-8 flex items-center hover:text-primary transition-colors w-fit"
        >
          <ArrowLeft className="size-5 mr-2" />
          Back to courses
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm">
                {course.category?.name || "Uncategorized"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {course.title}
            </h1>

            <p className="text-lg max-w-2xl">{course.description}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 md:min-w-[300px]">
            <div className="text-3xl font-bold mb-4">
              {!!!course.price || course.price === 0
                ? "Free"
                : `₹ ${course.price}`}
            </div>

            <CourseEnrollButton course={course} />
          </div>
        </div>
      </div>
    </div>
  );
};
