export type InvoiceDetails = {
  orderId: string;
  paymentId: string;
  courseId: string;
  courseName: string;
  amount: string;
  date: string;
  user: {
    name: string;
    email: string;
    // address: string;
    // city: string;
    state: string;
    // zipCode: string;
    country: string;
  };
};
