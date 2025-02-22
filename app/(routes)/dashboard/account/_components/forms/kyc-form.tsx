"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { KYC } from "@prisma/client";

import { KYCSchema } from "@/schemas/account";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateKYC } from "@/actions/account";

interface KYCFormProps {
  initialData?: KYC | null;
  isEditMode: boolean;
  onCancel: () => void;
}

export const KYCForm = ({
  initialData,
  isEditMode,
  onCancel,
}: KYCFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<KYCSchema>({
    resolver: zodResolver(KYCSchema),
    defaultValues: {
      aadhaarNumber: initialData?.aadhaarNumber || "",
      upiId: initialData?.upiId || "",
      bankName: initialData?.bankName || "",
      bankAccountNumber: initialData?.bankAccountNumber || "",
      bankIfscCode: initialData?.bankIfscCode || "",
      accountHolderName: initialData?.accountHolderName || "",
    },
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit = async (values: KYCSchema) => {
    startTransition(() => {
      updateKYC(values)
        .then((data) => {
          const { error, success } = data;

          if (success) {
            toast.success(success.message);
            onCancel();
          }
          if (error) {
            toast.error(error.message);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong!");
        });
    });
  };

  useEffect(() => {
    if (isEditMode) {
      reset();
    }
  }, [isEditMode, initialData, reset]);

  const text = initialData ? "Update" : "Complete";

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="aadhaarNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aadhaar Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    disabled={!isEditMode}
                    className="disabled:opacity-100 disabled:cursor-text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="upiId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UPI ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    disabled={!isEditMode}
                    className="disabled:opacity-100 disabled:cursor-text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    disabled={!isEditMode}
                    className="disabled:opacity-100 disabled:cursor-text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="bankAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    disabled={!isEditMode}
                    className="disabled:opacity-100 disabled:cursor-text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="bankIfscCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    disabled={!isEditMode}
                    className="disabled:opacity-100 disabled:cursor-text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    disabled={!isEditMode}
                    className="disabled:opacity-100 disabled:cursor-text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isEditMode && (
          <div className="flex items-center gap-4">
            <Button type="submit" disabled={isPending} className="min-w-32">
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                `${text} KYC`
              )}
            </Button>

            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isPending}
              className="min-w-32"
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
