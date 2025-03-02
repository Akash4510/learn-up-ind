"use client";

import { useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { editChapter } from "@/actions/course/chapter";
import { Switch } from "@/components/ui/switch";

interface ChapterAccessFormProps {
  courseId: string;
  chapterId: string;
  isFree?: boolean;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

type formSchema = z.infer<typeof formSchema>;

export const ChapterAccessForm = ({
  courseId,
  chapterId,
  isFree,
}: ChapterAccessFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!isFree,
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (values: formSchema) => {
    startTransition(() => {
      editChapter(courseId, chapterId, values)
        .then((data) => {
          const { error, success } = data;
          if (success) {
            toast.success("Chapter access settings updated");
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
        <div className="bg-accent rounded-md p-4">
          <FormField
            control={control}
            name="isFree"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center justify-between">
                    <p>Is this chapter free?</p>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) => {
                        field.onChange(value);
                        form.setValue("isFree", value);
                        onSubmit({ isFree: value });
                      }}
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
