import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getCourses } from "@/actions/course";
import { CourseCard } from "@/components/course-card";
import { TitleBlock } from "@/components/title-block";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { HomePageContent } from "@/lib/sanity/types";

export const CoursesSection = async ({
  content,
}: {
  content: HomePageContent["exploreCoursesSection"];
}) => {
  const publishedCourses = await getCourses({
    isPublished: true,
    page: 1,
    pageSize: 5,
  });

  return (
    <div className="space-y-10 my-10 md:my-20">
      <div className="lg:text-center">
        <TitleBlock
          title={content.sectionTitle}
          subtitle={content.sectionDescription}
        />
      </div>

      <div className="space-y-5">
        <ScrollArea className="rounded-md">
          <div className="grid grid-cols-1 md:flex md:w-max md:space-x-4 pb-4 px-0 gap-4 md:gap-0">
            {publishedCourses.map((course) => (
              <div
                key={course.id}
                className="md:w-[400px] md:max-w-[88vw] min-w-[300px]"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="w-full flex items-center justify-end">
          <Button variant="link" asChild>
            <Link href="/courses" className="flex items-center gap-2">
              View all courses
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
