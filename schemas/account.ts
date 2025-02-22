import { z } from "zod";

export const PersonalInfoSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  dob: z.date().optional(),
  gender: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
});

export type PersonalInfoSchema = z.infer<typeof PersonalInfoSchema>;

export const KYCSchema = z.object({
  aadhaarNumber: z.string().min(1, {
    message: "Aadhaar number is required",
  }),
  bankName: z.string().min(1, {
    message: "Bank name is required",
  }),
  bankAccountNumber: z.string().min(1, {
    message: "Bank account number is required",
  }),
  bankIfscCode: z.string().min(1, {
    message: "Bank IFSC code is required",
  }),
  accountHolderName: z.string().min(1, {
    message: "Account holder name is required",
  }),
  upiId: z.string().min(1, {
    message: "UPI ID is required",
  }),
});

export type KYCSchema = z.infer<typeof KYCSchema>;
