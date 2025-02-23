import { TitleBlock } from "@/components/title-block";

import { CreateCourseForm } from "./_components/create-course-form";

const NewCoursePage = () => {
  return (
    <div className="space-y-6">
      <TitleBlock
        title="Create a new course"
        subtitle="Start creating a new course and spread your knowledge through the course"
      />

      <CreateCourseForm />
    </div>
  );
};

export default NewCoursePage;
