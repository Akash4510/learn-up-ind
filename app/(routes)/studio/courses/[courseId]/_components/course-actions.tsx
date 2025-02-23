"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { deleteCourse, publishCourse, unpublishCourse } from "@/actions/course";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface CourseActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const CourseActions = ({
  disabled,
  courseId,
  isPublished,
}: CourseActionsProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <CoursePublishButton
        disabled={disabled}
        courseId={courseId}
        isPublished={isPublished}
      />

      <CourseDeleteButton courseId={courseId} />
    </div>
  );
};

const CoursePublishButton = ({
  disabled,
  courseId,
  isPublished,
}: CourseActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const confetti = useConfettiStore();

  const onPublish = () => {
    if (isPublished) {
      startTransition(() => {
        unpublishCourse(courseId)
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
        publishCourse(courseId)
          .then((data) => {
            const { error, success } = data;
            if (success) {
              const { message } = success;
              toast.success(message);
              confetti.onOpen();
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
      className="disabled:cursor-not-allowed w-24"
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : isPublished ? (
        "Unpublish"
      ) : (
        "Publish"
      )}
    </Button>
  );
};

const CourseDeleteButton = ({ courseId }: { courseId: string }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onDelete = () => {
    startTransition(() => {
      deleteCourse(courseId)
        .then((data) => {
          const { error, success } = data;
          if (success) {
            const { message } = success;
            toast.success(message);

            router.push(`/studio/courses`);
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
