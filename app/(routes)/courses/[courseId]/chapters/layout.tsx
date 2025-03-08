import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { getCourse } from "@/actions/course";
import { getProgress } from "@/actions/course/get-progress";
import { CourseSidebar } from "@/components/course/course-sidebar";

interface CourseLayoutProps {
  children: ReactNode;
  params: Promise<{
    courseId: string;
  }>;
}

const CourseLayout = async ({ children, params }: CourseLayoutProps) => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  const { courseId } = await params;

  const course = await getCourse(courseId, { includeProgress: true });

  if (!course) {
    notFound();
  }

  const progressCount = await getProgress(session.user.id, course.id);

  return (
    <div className="h-screen">
      <div className="flex flex-row flex-1 h-screen">
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0">
          <CourseSidebar
            user={session.user}
            course={course}
            progressCount={progressCount}
          />
        </div>

        <div className="mt-[69px] w-full h-[calc(100vh-69px)] md:pl-40 overflow-y-auto">
          <div className="h-full flex flex-col">
            <main className="h-full">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLayout;
