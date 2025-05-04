"use server";

import { sendInvoiceEmail } from "@/lib/mail";
import { InvoiceDetails } from "@/types/invoice";

export const sendPurchaseInvoiceEmail = async (
  email: string,
  invoiceDetails: InvoiceDetails
) => {
  try {
    await sendInvoiceEmail(email, invoiceDetails);

    console.log(`Invoice sent to ${invoiceDetails.user.email} successfully`);
    return "Success";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error while sending email: ${error.message}`);
    return "Error";
  }
};
