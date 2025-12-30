import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { getCourse } from "@/actions/course";
import { getProgress } from "@/actions/course/get-progress";
import { CourseSidebar } from "@/components/course/course-sidebar";
import { CourseNavbar } from "@/components/course/course-navbar";
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

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
    <SidebarProvider>
      {/* Sidebar Component - Automatically handles hidden/flex states */}
      <Sidebar>
        <SidebarContent>
          <CourseSidebar
            user={session.user}
            course={course}
            progressCount={progressCount}
          />
        </SidebarContent>
      </Sidebar>

      {/* Main Content Area */}
      <SidebarInset>
        <div className="h-full">
          {/* Navbar Wrapper */}
          <div className="h-[69px] flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b px-4">
            <CourseNavbar course={course} progressCount={progressCount} />
          </div>

          {/* Page Content */}
          <div className="h-full">
            <main className="h-full pt-4 px-4 md:px-6 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CourseLayout;
