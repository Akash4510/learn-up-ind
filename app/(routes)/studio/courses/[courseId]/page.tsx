import React from "react";
import { redirect } from "next/navigation";
import { File, IndianRupee, LayoutDashboard, ListChecks } from "lucide-react";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { AlertMessage } from "@/components/ui/alert-message";
import { TitleBlock } from "@/components/title-block";
import { IconBadge } from "@/components/ui/icon-badge";

import { TitleForm } from "./_components/forms/title-form";
import { DescriptionForm } from "./_components/forms/description-form";
import { ThumbnailForm } from "./_components/forms/thumbnail-form";
import { CategoryForm } from "./_components/forms/category-form";
import { PriceForm } from "./_components/forms/price-form";
import { AttachmentForm } from "./_components/forms/attachment-form";
import { ChaptersForm } from "./_components/forms/chapters-form";
import { CourseActions } from "./_components/course-actions";

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

const CoursePage = async ({ params }: CoursePageProps) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  const courseId = (await params).courseId;

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      creatorId: user.id,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!course) {
    return redirect(`/studio/courses`);
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const requiredFeilds = [
    course.title,
    course.description,
    course.thumbnail,
    course.price,
    course.categoryId,
    // We also need atleast one chapter to be published
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFeilds = requiredFeilds.length;
  const completedFeilds = requiredFeilds.filter(Boolean).length;

  const completionText = `(${completedFeilds}/${totalFeilds})`;
  const isComplete = requiredFeilds.every(Boolean);

  return (
    <div className="space-y-6">
      {!course.isPublished && (
        <AlertMessage
          variant="warning"
          message="This course is unpublished. It will not be visible to the users"
        />
      )}

      <div className="flex items-center justify-between">
        <TitleBlock
          title="Course setup"
          subtitle={`Complete all of the feilds to setup ${completionText}`}
        />

        <CourseActions
          disabled={!isComplete}
          courseId={courseId}
          isPublished={course.isPublished}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>

          <TitleForm courseId={course.id} title={course.title} />

          <DescriptionForm
            courseId={course.id}
            description={course.description}
          />

          <ThumbnailForm courseId={course.id} thumbnail={course.thumbnail} />

          <CategoryForm
            courseId={course.id}
            categoryId={course.categoryId}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={ListChecks} />
            <h2 className="text-xl">Course chapters</h2>
          </div>

          <ChaptersForm courseId={course.id} chapters={course.chapters} />

          <div className="flex items-center gap-x-2">
            <IconBadge icon={IndianRupee} />
            <h2 className="text-xl">Sell your course</h2>
          </div>

          <PriceForm courseId={course.id} price={course.price} />
          <div className="flex items-center gap-x-2">
            <IconBadge icon={File} />
            <h2 className="text-xl">Resources & attachments</h2>
          </div>

          <AttachmentForm
            courseId={course.id}
            attchments={course.attachments}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
