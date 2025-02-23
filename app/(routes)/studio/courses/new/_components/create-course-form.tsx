"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { CreateCourseSchema } from "@/schemas/course";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCourse } from "@/actions/course";

export const CreateCourseForm = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<CreateCourseSchema>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      title: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (values: CreateCourseSchema) => {
    startTransition(() => {
      createCourse(values).then((data) => {
        const { error, success } = data;
        if (success) {
          toast.success(success.message);
          const courseId = success.course.id;

          router.push(`/studio/courses/${courseId}`);
        }
        if (error) {
          toast.error(error.message);
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-accent border rounded-md p-4 max-w-[36rem]">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Course Title</FormLabel>
                <FormControl className="!mt-2.5">
                  <Input
                    placeholder="Enter the title of your course"
                    autoComplete="off"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What would you like to name your course? Don&apos;t worry, you
                  can change this later
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row-reverse items-center justify-end gap-4">
          <Button disabled={isPending} className="w-full sm:w-40">
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <PlusCircle className="size-4" />
                <span>Create course</span>
              </>
            )}
          </Button>

          <Button
            variant="accent"
            type="button"
            disabled={isPending}
            className="w-full sm:w-32"
            asChild
          >
            <Link href={`/studio/courses`}>Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};
