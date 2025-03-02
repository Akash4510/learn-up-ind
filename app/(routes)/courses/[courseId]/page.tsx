import { redirect } from "next/navigation";

import { getCourse } from "@/actions/course/get-course";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CourseBanner } from "@/components/course/course-banner";
import { CourseContentPreview } from "@/components/course/course-content-preview";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";

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
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear border-b px-4">
          <Navbar />
        </header>

        <main className="flex flex-1 flex-col gap-4">
          <CourseBanner course={course} />
          <div className="p-4 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <CourseContentPreview course={course} />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CoursePage;
