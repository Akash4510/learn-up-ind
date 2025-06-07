import { Referral, User } from "@prisma/client";

export const ReferralSuccessTemplate = ({
  id,
  referredUser,
  commissionEarned,
  createdAt,
}: Referral & {
  referredUser: User | null;
}) => {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="text-center mb-10">
        <div className="bg-green-100 mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          Referral Completed!
        </h1>
        <p className="text-gray-500 mt-2">
          Your referral has successfully converted
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Reward Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Referral ID</p>
              <p className="font-medium text-gray-800">{id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium text-gray-800">
                {createdAt.toDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Referred User</p>
              <p className="font-medium text-gray-800">
                {referredUser?.name} (
                <span className="">{referredUser?.username}</span>)
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Amount Earned</p>
              <p className="text-xl font-bold text-green-600">
                ₹{commissionEarned}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-2">What&apos;s next?</h3>
          <p className="text-gray-600">
            Your earnings will be available for withdrawal once they reach the
            minimum payout threshold. Keep sharing your referral link to earn
            more!
          </p>
        </div>

        <div className="py-4 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            Have questions about your referral? Contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};
