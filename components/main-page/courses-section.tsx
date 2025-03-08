import { getCourses } from "@/actions/course";
import { CourseCard } from "@/components/course-card";
import { TitleBlock } from "@/components/title-block";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const CoursesSection = async () => {
  const courses = await getCourses();

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

        <ScrollArea className="rounded-md">
          <div className="flex w-max space-x-4 p-4 px-0">
            {courses
              .filter((course) => !course.isPublished)
              .map((course) => (
                <div
                  key={course.id}
                  className="w-[400px] max-w-[85vw] min-w-[300px]"
                >
                  <CourseCard course={course} />
                </div>
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
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

        <ScrollArea className="rounded-md">
          <div className="flex w-max space-x-4 p-4 px-0">
            {courses
              .filter((course) => course.isPublished)
              .map((course) => (
                <div
                  key={course.id}
                  className="w-[400px] max-w-[85vw] min-w-[300px]"
                >
                  <CourseCard course={course} />
                </div>
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};
