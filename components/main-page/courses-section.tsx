import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getCourses } from "@/actions/course";
import { CourseCard } from "@/components/course-card";
import { TitleBlock } from "@/components/title-block";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { AutoScroll } from "../auto-scroll";

export const CoursesSection = async () => {
  const publishedCourses = await getCourses({
    isPublished: true,
    page: 1,
    pageSize: 5,
  });

  const unpublishedCourses = await getCourses({
    isPublished: false,
    page: 1,
    pageSize: 5,
  });

  return (
    <div>
      <div className="space-y-10 my-10">
        <div className="lg:text-center">
          <TitleBlock
            title="Upcoming Courses"
            subtitle="Accelerate your digital journey with our featured online course,
          designed to empower you with the latest tools and strategies for
          sustainable growth"
          />
        </div>

        <AutoScroll pauseDuration={3000} scrollDuration={500}>
          {unpublishedCourses.map((course) => (
            <div
              key={course.id}
              className="w-full max-w-full min-w-[300px] inline-block snap-start mr-4 last:mr-0 md:max-w-[400px]"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </AutoScroll>
      </div>

      <div className="space-y-10 my-10">
        <div className="lg:text-center">
          <TitleBlock
            title="Explore Our Courses"
            subtitle="Accelerate your digital journey with our featured online course,
          designed to empower you with the latest tools and strategies for
          sustainable growth"
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
    </div>
  );
};
