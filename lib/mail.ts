import { Resend } from "resend";
import { Payout, Referral, User } from "@prisma/client";

import { VerifyEmailTemplate } from "@/email-templates/verify-email-template";
import { ResetPasswordTemplate } from "@/email-templates/reset-password-template";
import { InvoiceDetails } from "@/types/invoice";
import { InvoiceTemplate } from "@/email-templates/invoice-template";
import { WithdrawlSuccessTemplate } from "@/email-templates/withdrawl-success-template";
import { ReferralSuccessTemplate } from "@/email-templates/referral-success-template";
import { NewRegistrationTemplate } from "@/email-templates/new-registration";
import { ContactFormTemplate } from "@/email-templates/contact-form-template";

const resend = new Resend(process.env.RESEND_API_KEY!);

const domain = process.env.NEXT_PUBLIC_HOME_URL!;
const fromEmail = process.env.FROM_EMAIL!;
const supportEmail = process.env.SUPPORT_EMAIL!;

export const sendRegistrationMail = async (user: User) => {
  await resend.emails.send({
    from: fromEmail,
    to: [user.email as string],
    subject: "Registration succesfull",
    react: NewRegistrationTemplate(user),
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: fromEmail,
    to: [email],
    subject: "Confirm your email",
    react: VerifyEmailTemplate({ confirmLink }),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: fromEmail,
    to: [email],
    subject: "Reset your password",
    react: ResetPasswordTemplate({ resetLink }),
  });
};

export const sendInvoiceEmail = async (
  email: string,
  invoiceDetails: InvoiceDetails
) => {
  await resend.emails.send({
    from: fromEmail,
    to: [email],
    subject: `Invoice for Your Purchase (Order #${invoiceDetails.orderId}) - Payment Confirmation`,
    react: InvoiceTemplate({ ...invoiceDetails }),
  });
};

export const sendSuccessFullReferrallMail = async (
  email: string,
  referralWithRefferedUser: Referral & {
    referredUser: User | null;
  }
) => {
  await resend.emails.send({
    from: fromEmail,
    to: [email],
    subject: `Referral Successfull`,
    react: ReferralSuccessTemplate({ ...referralWithRefferedUser }),
  });
};

export const sendSuccessFullWithdrawlMail = async (
  email: string,
  payout: Payout
) => {
  await resend.emails.send({
    from: fromEmail,
    to: [email],
    subject: `Withdrawl Successfull`,
    react: WithdrawlSuccessTemplate({ ...payout }),
  });
};

export const sendContactFormEmail = async (
  userEmail: string,
  message: string
) => {
  await resend.emails.send({
    from: fromEmail,
    to: [supportEmail],
    subject: "📬 Support Request: New Message",
    replyTo: userEmail,
    react: ContactFormTemplate({ userEmail, message }),
  });
};
