import { InvoiceDetails } from "@/types/invoice";

export const InvoiceTemplate = ({
  orderId,
  paymentId,
  courseId,
  courseName,
  amount,
  date,
  user,
}: InvoiceDetails) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Invoice</h1>
        <p className="text-gray-600">Thank you for your purchase!</p>
      </div>

      <div className="flex justify-between mb-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Order Details</h2>
          <div className="mt-2 text-gray-600">
            <p>Order ID: {orderId}</p>
            <p>Payment ID: {paymentId}</p>
            <p>Date: {date}</p>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-medium text-gray-700">Amount Paid</p>
          <p className="text-2xl font-bold text-blue-600">₹{amount}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Course Information
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-medium text-gray-800">Id: {courseId}</p>
          <p className="font-medium text-gray-800">{courseName}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Billing Details
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-medium text-gray-800">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
          {/* <p className="text-gray-600">{user.address}</p> */}
          <p className="text-gray-600">
            {/* {user.city} */}
            {user.state}
            {/* {user.zipCode} */}
          </p>
          <p className="text-gray-600">{user.country}</p>
        </div>
      </div>

      <div className="py-4 border-t border-gray-200">
        <p className="text-gray-500 text-sm text-center">
          If you have any questions about this invoice, please contact our
          support team.
        </p>
      </div>
    </div>
  );
};
