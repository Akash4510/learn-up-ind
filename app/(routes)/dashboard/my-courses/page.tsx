import React from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getCourses } from "@/actions/course/get-courses";
import { TitleBlock } from "@/components/title-block";
import { CourseCard } from "@/components/course-card";

const MyCourses = async () => {
  const session = await auth();

  if (!session || !session?.user) {
    redirect("/");
  }

  const courses = await getCourses({
    userId: session.user.id,
    isPublished: true,
  });

  return (
    <div className="space-y-6">
      <TitleBlock
        title="Courses"
        subtitle="Add, edit, and delete courses here"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
