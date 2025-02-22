"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { User } from "@prisma/client";

import { PersonalInfoSchema } from "@/schemas/account";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updatePersonalInfo } from "@/actions/account";
import { getCountries, getStates } from "@/lib/countries";
import { filterEmptyValues } from "@/lib/utils";

interface PersonalInfoFormProps {
  initialData?: User | null;
  isEditMode: boolean;
  onCancel: () => void;
}

export const PersonalInfoForm = ({
  initialData,
  isEditMode,
  onCancel,
}: PersonalInfoFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState<{ code: string; name: string }[]>(
    []
  );
  const [states, setStates] = useState<string[]>([]);

  const form = useForm<PersonalInfoSchema>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {
      name: initialData?.name || "",
      dob: initialData?.dob || undefined,
      gender: initialData?.gender || "",
      country: initialData?.country || "",
      state: initialData?.state || "",
      phone: initialData?.phone || "",
    },
  });

  const { handleSubmit, control, watch, setValue, reset } = form;

  // Watch the country field to update states dynamically
  const selectedCountry = watch("country");

  // Fetch countries on component mount
  useEffect(() => {
    const countries = getCountries();
    setCountries(countries);
  }, []);

  // Update states when the selected country changes
  useEffect(() => {
    if (selectedCountry) {
      const states = getStates(selectedCountry);
      setStates(states);
      setValue("state", ""); // Reset state when country changes
    } else {
      setStates([]);
    }
  }, [selectedCountry, setValue]);

  useEffect(() => {
    if (isEditMode) {
      reset();
    }
  }, [isEditMode, initialData, reset]);

  const onSubmit = async (values: PersonalInfoSchema) => {
    // Filter out empty string values
    const cleanedValues = filterEmptyValues(values);

    startTransition(() => {
      updatePersonalInfo(cleanedValues)
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

  const text = initialData ? "Update" : "Complete";

  // Helper functions for generating days, months, and years
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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

            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  value={initialData?.email || ""}
                  disabled
                  readOnly
                  className="disabled:opacity-100"
                />
              </FormControl>
              <FormDescription>
                Your email address cannot be changed.
              </FormDescription>
              <FormMessage />
            </FormItem>

            <FormField
              control={control}
              name="dob"
              render={({ field }) => {
                // Use null or undefined to represent an unselected date
                const dateValue = field.value ? new Date(field.value) : null;

                return (
                  <FormItem>
                    <FormLabel>
                      Date of Birth{" "}
                      <span className="text-muted-foreground">
                        (Year-Month-Day)
                      </span>
                    </FormLabel>
                    <div className="flex gap-2">
                      {/* Year Select */}
                      <FormControl>
                        <Select
                          value={
                            dateValue ? dateValue.getFullYear().toString() : ""
                          }
                          disabled={!isEditMode}
                          onValueChange={(value) => {
                            const newDate = new Date(
                              parseInt(value),
                              dateValue ? dateValue.getMonth() : 0,
                              dateValue ? dateValue.getDate() : 1
                            );
                            field.onChange(newDate);
                          }}
                        >
                          <SelectTrigger className="disabled:opacity-100 disabled:cursor-text">
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      {/* Month Select */}
                      <FormControl>
                        <Select
                          value={
                            dateValue
                              ? (dateValue.getMonth() + 1).toString()
                              : ""
                          }
                          disabled={!isEditMode}
                          onValueChange={(value) => {
                            const newDate = new Date(
                              dateValue
                                ? dateValue.getFullYear()
                                : new Date().getFullYear(),
                              parseInt(value) - 1,
                              dateValue ? dateValue.getDate() : 1
                            );
                            field.onChange(newDate);
                          }}
                        >
                          <SelectTrigger className="disabled:opacity-100 disabled:cursor-text">
                            <SelectValue placeholder="Select Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map((month, index) => (
                              <SelectItem
                                key={index + 1}
                                value={(index + 1).toString()}
                              >
                                {month}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      {/* Day Select */}
                      <FormControl>
                        <Select
                          value={
                            dateValue ? dateValue.getDate().toString() : ""
                          }
                          disabled={!isEditMode}
                          onValueChange={(value) => {
                            const newDate = new Date(
                              dateValue
                                ? dateValue.getFullYear()
                                : new Date().getFullYear(),
                              dateValue ? dateValue.getMonth() : 0,
                              parseInt(value)
                            );
                            field.onChange(newDate);
                          }}
                        >
                          <SelectTrigger className="disabled:opacity-100 disabled:cursor-text">
                            <SelectValue placeholder="Select Day" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from(
                              {
                                length: dateValue
                                  ? getDaysInMonth(
                                      dateValue.getFullYear(),
                                      dateValue.getMonth() + 1
                                    )
                                  : 31, // Default to 31 days if no date is selected
                              },
                              (_, i) => (
                                <SelectItem
                                  key={i + 1}
                                  value={(i + 1).toString()}
                                >
                                  {i + 1}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!isEditMode}
                  >
                    <FormControl>
                      <SelectTrigger className="disabled:opacity-100 disabled:cursor-text">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      disabled={!isEditMode}
                      className="disabled:opacity-100 disabled:cursor-text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <div className="space-y-0.5">
              <h3 className="text-xl font-medium">Address Details</h3>
              <p className="text-sm text-red-400">
                Your address details are mandatory for invoice generation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Country Field */}
              <FormField
                control={control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEditMode}
                    >
                      <FormControl>
                        <SelectTrigger className="disabled:opacity-100 disabled:cursor-text">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* State Field */}
              <FormField
                control={control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEditMode || !selectedCountry}
                    >
                      <FormControl>
                        <SelectTrigger className="disabled:opacity-100 disabled:cursor-text">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {isEditMode && (
          <div className="flex items-center gap-4">
            <Button type="submit" disabled={isPending} className="min-w-32">
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                `${text} Details`
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
