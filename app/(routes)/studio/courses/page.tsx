import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";

import { TitleBlock } from "@/components/title-block";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { CourseCard } from "@/components/course-card";
import { getCourses } from "@/actions/course";

const CoursesPage = async () => {
  const session = await auth();

  if (!session || !session?.user) {
    redirect("/");
  }

  const courses = await getCourses({
    creatorId: session.user.id,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <TitleBlock
          title="Courses"
          subtitle="Add, edit, and delete courses here"
        />

        <div>
          <Button asChild>
            <Link href="/studio/courses/new">
              <Plus className="size-4" />
              Create New Course
            </Link>
          </Button>
        </div>
      </div>

      {courses.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} isCreator />
          ))}
        </div>
      ) : (
        <div className="py-4">
          <p className="text-lg">You have not created any course yet!</p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
