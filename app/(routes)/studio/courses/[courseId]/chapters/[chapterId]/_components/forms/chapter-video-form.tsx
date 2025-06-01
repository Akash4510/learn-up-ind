"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { Loader2, Pencil, PlusCircle, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { editChapter } from "@/actions/course/chapter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ChapterVideoFormProps {
  courseId: string;
  chapterId: string;
  videoUrl: string | null;
}

const formSchema = z.object({
  videoUrl: z.string().optional(),
});

type formSchema = z.infer<typeof formSchema>;

export const ChapterVideoForm = ({
  courseId,
  chapterId,
  videoUrl,
}: ChapterVideoFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: videoUrl || undefined,
    },
  });

  const { handleSubmit, control } = form;

  const toggleEditing = () => {
    setIsEditing((value) => !value);
  };

  const onSubmit = async (values: formSchema) => {
    if (videoUrl === values.videoUrl) {
      toast.info("No modifications!");
      return;
    }

    startTransition(() => {
      editChapter(courseId, chapterId, values)
        .then((data) => {
          const { error, success } = data;

          if (success) {
            toast.success("Video url updated");
            toggleEditing();
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
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-card rounded-md p-4">
          <FormField
            control={control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <div className="text-base flex items-center justify-between gap-4 px-0.5">
                  <FormLabel className="text-base">Video url</FormLabel>

                  <div className="flex items-center justify-center gap-4">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      disabled={isPending}
                      className="h-8 transition-all"
                      onClick={() => {
                        toggleEditing();

                        if (isEditing) {
                          form.resetField("videoUrl");
                        }

                        setTimeout(() => {
                          form.setFocus("videoUrl");
                        }, 20);
                      }}
                    >
                      {isEditing ? (
                        <>
                          <X className="size-3" />
                          <span className="hidden sm:flex">Cancel</span>
                        </>
                      ) : videoUrl ? (
                        <>
                          <Pencil className="size-3" />
                          <span className="hidden sm:flex">
                            Edit
                            <span className="hidden lg:flex ml-1">
                              video url
                            </span>
                          </span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="size-3" />
                          <span className="hidden sm:flex">
                            Add
                            <span className="hidden lg:flex ml-1">
                              video url
                            </span>
                          </span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <FormControl className="!mt-2.5">
                  {isEditing ? (
                    <Input
                      placeholder="eg. https://youtube.com/v/8098089"
                      autoComplete="off"
                      disabled={isPending}
                      {...field}
                    />
                  ) : (
                    <p className="font-light text-sm py-2 bg-background/60 px-4 rounded-md font-mono opacity-75">
                      {field.value || "No video url added"}
                    </p>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isEditing && (
            <Button
              size="sm"
              className="h-8 w-24 mt-4 transition-all"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-3 animate-spin" />
                </>
              ) : (
                <>
                  <Save className="size-3" />
                  <span>Save</span>
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
