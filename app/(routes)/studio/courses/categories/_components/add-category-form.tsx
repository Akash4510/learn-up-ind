"use client";

import { useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle } from "lucide-react";
import { toast } from "sonner";

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
import { addCategory } from "@/actions/category";

interface AddCategoryFormProps {
  onSuccess: () => void;
}

const formSchema = z.object({
  category: z.string().min(1, {
    message: "Category is required",
  }),
});

export const AddCategoryForm = ({ onSuccess }: AddCategoryFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      addCategory(values.category).then((data) => {
        const { error, success } = data;
        if (success) {
          toast.success(success.message);
          onSuccess();
        }
        if (error) {
          toast.error(error.message);
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Category Name</FormLabel>
                <FormControl className="!mt-2.5">
                  <Input
                    placeholder="Enter category name"
                    autoComplete="off"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the name of the category you want to add
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button disabled={isPending} className="w-full sm:w-40">
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <PlusCircle className="size-4" />
                <span>Add Category</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
