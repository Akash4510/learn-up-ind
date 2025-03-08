import { getCategories } from "@/actions/category";
import { getCourses } from "@/actions/course/get-courses";
import { CategoriesBar } from "@/components/categories-bar";
import { CourseCard } from "@/components/course-card";
import { TitleBlock } from "@/components/title-block";

interface CoursePageProps {
  searchParams: Promise<{
    categoryId: string;
  }>;
}

const CoursesPage = async ({ searchParams }: CoursePageProps) => {
  const { categoryId } = await searchParams;

  const courses = await getCourses({
    isPublished: true,
    categoryId,
  });
  const categories = await getCategories();

  return (
    <>
      <div className="space-y-6">
        <TitleBlock
          title="Courses"
          subtitle="Explore all the courses"
          withSeparator
        />

        <div className="!mt-1 sticky top-0 z-[999] bg-background">
          <CategoriesBar data={categories} />
        </div>

        {courses.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : categoryId ? (
          <div className="py-4">
            <p className="text-lg">
              No courses found for the selected category!
            </p>
            <p className="text-muted-foreground">
              Remove the filters to see all the available courses, or explore
              other categories.
            </p>
          </div>
        ) : (
          <div className="py-4">
            <p className="text-lg">No courses at the moment!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CoursesPage;
