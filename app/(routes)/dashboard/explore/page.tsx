import { TitleBlock } from "@/components/title-block";
import { CourseCard } from "@/components/course-card";
import { getCourses } from "@/actions/course/get-courses";

const ExplorePage = async () => {
  const courses = await getCourses({
    isPublished: true,
  });

  return (
    <div className="space-y-6">
      <TitleBlock title="Explore Courses" subtitle="Explore all the courses" />

      {courses.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="py-6">
          <p className="text-lg">No courses at the moment!</p>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
