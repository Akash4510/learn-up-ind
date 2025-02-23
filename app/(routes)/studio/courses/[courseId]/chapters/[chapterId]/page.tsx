import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { AlertMessage } from "@/components/ui/alert-message";
import { TitleBlock } from "@/components/title-block";
import { IconBadge } from "@/components/ui/icon-badge";

import { ChapterActions } from "./_components/chapter-actions";
import { ChapterTitleForm } from "./_components/forms/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/forms/chapter-description-form";
import { ChapterAccessForm } from "./_components/forms/chapter-access-form";
import { ChapterVideoForm } from "./_components/forms/chapter-video-form";

interface ChapterPageProps {
  params: Promise<{
    courseId: string;
    chapterId: string;
  }>;
}

const ChapterPage = async ({ params }: ChapterPageProps) => {
  const { courseId, chapterId } = await params;

  const session = await auth();

  if (!session?.user || !session.user.id) {
    redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
  });

  if (!chapter) {
    redirect("/");
  }

  const requiredFeilds = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFeilds = requiredFeilds.length;
  const completedFeilds = requiredFeilds.filter(Boolean).length;

  const completionText = `(${completedFeilds}/${totalFeilds})`;
  const isComplete = requiredFeilds.every(Boolean);

  return (
    <div className="space-y-6">
      {!chapter.isPublished && (
        <AlertMessage
          variant="warning"
          message="This chapter is unpublished. It will not be visible in the courses"
        />
      )}

      <div>
        <Link
          href={`/studio/courses/${courseId}`}
          className="flex items-center text-sm hover:opacity-75 transition my-2 mb-4"
        >
          <ArrowLeft className="size-4 mr-2" /> Back to course setup
        </Link>

        <div className="flex items-center justify-between">
          <TitleBlock
            title="Chapter Creation"
            subtitle={`Complete all fields ${completionText}`}
          />

          <ChapterActions
            disabled={!isComplete}
            courseId={courseId}
            chapterId={chapterId}
            isPublished={chapter.isPublished}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your chapter</h2>
          </div>

          <ChapterTitleForm
            title={chapter.title}
            courseId={courseId}
            chapterId={chapterId}
          />

          <ChapterDescriptionForm
            description={chapter.description}
            courseId={courseId}
            chapterId={chapterId}
          />

          <div className="space-y-6">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Eye} />
              <h2 className="text-xl">Access Settings</h2>
            </div>

            <ChapterAccessForm
              isFree={chapter.isFree}
              courseId={courseId}
              chapterId={chapterId}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Video} />
            <h2 className="text-xl">Add a video</h2>
          </div>

          <ChapterVideoForm
            videoUrl={chapter.videoUrl}
            courseId={courseId}
            chapterId={chapterId}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
