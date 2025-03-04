import { redirect } from "next/navigation";

import { getCourse } from "@/actions/course/get-course";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CourseBanner } from "@/components/course/course-banner";
import { CourseContentPreview } from "@/components/course/course-content-preview";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import { UserAvatar } from "@/components/user-avatar";

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
  searchParams: Promise<{
    action?: string | null;
  }>;
}

const CoursePage = async ({ params, searchParams }: CoursePageProps) => {
  const { courseId } = await params;
  const { action } = await searchParams;

  console.log(action);

  const course = await getCourse(courseId);

  if (!course) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <div className="md:hidden">
        <AppSidebar />
      </div>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear border-b px-4 bg-transparent backdrop-blur-3xl">
          <Navbar />
        </header>

        <main className="flex flex-1 flex-col gap-4">
          <CourseBanner course={course} />

          <div className="p-4 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h2 className="text-3xl font-bold mb-4">About this course</h2>

                <p className="text-pretty">{course.description}</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <CourseContentPreview course={course} />
            </div>

            <div>
              <div className="bg-card rounded-lg p-6 mb-8 border border-border">
                <h2 className="text-xl font-bold mb-4">Created by</h2>

                <div className="flex items-center gap-4">
                  <UserAvatar url={course.creator.image} />

                  <div>
                    <p>{course.creator.name}</p>
                    <p className="text-sm text-muted-foreground">Instructor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CoursePage;
