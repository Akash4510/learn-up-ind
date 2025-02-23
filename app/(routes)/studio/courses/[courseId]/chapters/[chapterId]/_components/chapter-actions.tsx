"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import {
  deleteChapter,
  publishChapter,
  unpublishChapter,
} from "@/actions/course/chapter";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <ChapterPublishButton
        disabled={disabled}
        courseId={courseId}
        chapterId={chapterId}
        isPublished={isPublished}
      />

      <ChapterDeleteButton courseId={courseId} chapterId={chapterId} />
    </div>
  );
};

const ChapterPublishButton = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const onPublish = () => {
    if (isPublished) {
      startTransition(() => {
        unpublishChapter(courseId, chapterId)
          .then((data) => {
            const { error, success } = data;
            if (success) {
              const { message } = success;
              toast.success(message);
            }
            if (error) {
              toast.error(error.message);
            }
          })
          .catch(() => {
            toast.error("Something went wrong!");
          });
      });
    } else {
      startTransition(() => {
        publishChapter(courseId, chapterId)
          .then((data) => {
            const { error, success } = data;
            if (success) {
              const { message } = success;
              toast.success(message);
            }
            if (error) {
              toast.error(error.message);
            }
          })
          .catch(() => {
            toast.error("Something went wrong!");
          });
      });
    }
  };

  return (
    <Button
      onClick={onPublish}
      disabled={disabled || isPending}
      variant="outline"
      size="sm"
      className="disabled:cursor-not-allowed"
    >
      {isPublished ? "Unpublish" : "Publish"}
    </Button>
  );
};

const ChapterDeleteButton = ({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onDelete = () => {
    startTransition(() => {
      deleteChapter(courseId, chapterId)
        .then((data) => {
          const { error, success } = data;
          if (success) {
            const { message } = success;
            toast.success(message);

            router.push(`/studio/courses/${courseId}`);
          }
          if (error) {
            toast.error(error.message);
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <ConfirmModal onConfirm={onDelete}>
      <Button size="sm" variant="destructive" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Trash className="size-4" />
        )}
      </Button>
    </ConfirmModal>
  );
};
