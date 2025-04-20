import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { File } from "lucide-react";

import { auth } from "@/auth";
import { getChapter } from "@/actions/course/chapter";
import { AlertMessage } from "@/components/ui/alert-message";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { VideoPlayer } from "@/components/video-player";

interface CahpterPageProps {
  params: Promise<{
    courseId: string;
    chapterId: string;
  }>;
}

const CahpterPage = async ({ params }: CahpterPageProps) => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  const { courseId, chapterId } = await params;

  const { success, error } = await getChapter(courseId, chapterId);

  if (error) {
    notFound();
  }

  const {
    data: { chapter, course, attachments, userProgress, purchase },
  } = success;

  if (!chapter || !course) {
    redirect("/courses");
  }

  const isLocked = !chapter.isFree && !purchase;

  return (
    <div>
      {userProgress?.isCompleted && (
        <AlertMessage
          variant="success"
          message="You already completed this chapter"
          className="rounded-none"
        />
      )}

      {isLocked && (
        <AlertMessage
          variant="warning"
          message="You need to purchase this course to watch this chapter"
          className="rounded-none"
        />
      )}

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4"></div>

        <div>
          <div className="p-4 flex flex-col items-start justify-between gap-2">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>

            <div className="w-full">
              <VideoPlayer videoUrl={chapter.videoUrl || ""} />
            </div>
          </div>

          <Separator />

          <div>
            <Preview value={chapter.description!} />
          </div>

          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4 flex flex-col gap-4">
                <h2 className="text-lg">Course attachments</h2>
                {attachments.map((attachment) => (
                  <Link
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="bg-accent p-3 rounded-md border border-primary/40 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <File className="size-5 flex-shrink-0" />
                      <p className="text-sm font-bold hover:underline line-clamp-1">
                        {attachment.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CahpterPage;
