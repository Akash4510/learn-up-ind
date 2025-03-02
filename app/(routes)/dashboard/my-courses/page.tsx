import React from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getCourses } from "@/actions/course/get-courses";
import { TitleBlock } from "@/components/title-block";
import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen } from "lucide-react";

const MyCourses = async () => {
  const session = await auth();

  if (!session || !session?.user) {
    redirect("/");
  }

  const courses = await getCourses({
    isPublished: true,
    onlyPurchased: true,
    userId: session.user.id,
  });

  return (
    <div className="space-y-6">
      <TitleBlock title="Courses" subtitle="View your courses here" />

      {courses.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="py-4 space-y-6">
          <div>
            <p className="text-lg">You have not purchased any course yet!</p>
            <p className="text-lg">
              Purchase a course to start learning and earning
            </p>
          </div>

          <Button asChild>
            <Link href="/dashboard/explore">
              <BookOpen className="size-4" />
              Explore Courses
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
