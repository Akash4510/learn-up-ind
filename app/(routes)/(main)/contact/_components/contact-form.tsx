"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { ContactSchema } from "@/schemas/contact";
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
import { AlertMessage } from "@/components/ui/alert-message";
import { Textarea } from "@/components/ui/textarea";
import { sendMessage } from "@/actions/contact/send-message";

export const ContactForm = () => {
  const [isPending, startTransition] = useTransition();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const form = useForm<ContactSchema>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (values: ContactSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      console.log({ values });
      sendMessage(values)
        .then((data) => {
          const { success, error } = data;

          if (error) {
            console.log(error.message);
            setError("Something went wrong! Please try again.");
          }

          if (success) {
            setSuccess(success.message);
            form.reset();
          }
        })
        .catch((err) => {
          console.log(err);
          setError("Something went wrong! Please try again.");
        });
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your email..."
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter your query..."
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-1">
              {error && <AlertMessage variant="error" message={error} />}
              {success && <AlertMessage variant="success" message={success} />}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
