import { Payout } from "@prisma/client";

import { formatDateWithMonthName } from "@/lib/utils";

export const WithdrawlSuccessTemplate = ({
  id,
  amount,
  payoutDate,
  comment,
  transactionId,
}: Payout) => {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="text-center mb-10">
        <div className="bg-blue-100 mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Payout Successful!</h1>
        <p className="text-gray-500 mt-2">
          Your earnings have been transferred
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Transaction Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Payout ID</p>
              <p className="font-medium text-gray-800">{id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Processed On</p>
              {payoutDate ? (
                <p className="font-medium text-gray-800">
                  {formatDateWithMonthName(payoutDate)}
                </p>
              ) : (
                ""
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium text-gray-800">{transactionId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Amount Paid</p>
              <p className="text-xl font-bold text-blue-600">₹{amount}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-2">Congratulations!</h3>
          <p className="text-gray-600 mb-4">
            Your payout request has been successfully processed. The amount
            should reflect in your account within 2-5 business days depending on
            your bank&apos;s processing time.
          </p>

          <h3 className="font-medium text-gray-700 mb-2">Comment:</h3>
          <p className="text-gray-600 mb-4">{comment}</p>

          <p className="text-gray-600">
            Thank you for being a valued member of our community. Keep up the
            great work!
          </p>
        </div>

        <div className="py-4 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            Need help with this transaction? Our support team is here for you.
          </p>
        </div>
      </div>
    </div>
  );
};
