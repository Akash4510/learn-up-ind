import { Referral, User } from "@prisma/client";

import { formatDateWithMonthName } from "@/lib/utils";

export const ReferralSuccessTemplate = ({
  id,
  referredUser,
  commissionEarned,
  createdAt,
}: Referral & {
  referredUser: User | null;
}) => {
  return (
    <div
      style={{
        fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        backgroundColor: "#f9fafb",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#2563eb",
            padding: "30px",
            textAlign: "center" as const,
          }}
        >
          <div
            style={{
              marginBottom: "16px",
              display: "inline-block",
              padding: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
            }}
          >
            {/* Success Check Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "32px", height: "32px", color: "#ffffff" }}
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
          <h1 style={{ color: "#ffffff", margin: 0, fontSize: "24px" }}>
            Referral Completed!
          </h1>
          <p style={{ color: "#dbeafe", marginTop: "4px", fontSize: "14px" }}>
            Your referral has successfully converted
          </p>
        </div>

        {/* Content Body */}
        <div style={{ padding: "30px" }}>
          {/* Commission Hero Section - Green Theme for Earnings */}
          <div
            style={{
              backgroundColor: "#f0fdf4", // Light green background
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center" as const,
              marginBottom: "30px",
              border: "1px solid #bbf7d0", // Light green border
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "#15803d",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Commission Earned
            </span>
            <h2
              style={{
                fontSize: "32px",
                color: "#15803d",
                margin: "5px 0 0 0",
              }}
            >
              ₹{commissionEarned}
            </h2>
          </div>

          {/* Reward Details - Stacked */}
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                textTransform: "uppercase",
                color: "#6b7280",
                fontWeight: "bold",
                letterSpacing: "0.05em",
              }}
            >
              Reward Details
            </label>
            <div
              style={{
                fontSize: "14px",
                color: "#374151",
                marginTop: "8px",
                lineHeight: "1.6",
              }}
            >
              <div style={{ marginBottom: "4px" }}>
                <strong>Referral ID:</strong> {id}
              </div>
              <div style={{ marginBottom: "4px" }}>
                <strong>Date:</strong> {formatDateWithMonthName(createdAt)}
              </div>
              <div>
                <strong>Referred User:</strong> {referredUser?.name}
                <span style={{ color: "#6b7280", marginLeft: "4px" }}>
                  ({referredUser?.username})
                </span>
              </div>
            </div>
          </div>

          {/* "What's Next" Section */}
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                textTransform: "uppercase",
                color: "#6b7280",
                fontWeight: "bold",
                letterSpacing: "0.05em",
              }}
            >
              What&apos;s next?
            </label>
            <div
              style={{
                fontSize: "15px",
                color: "#111827",
                marginTop: "8px",
                padding: "16px",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                lineHeight: "1.6",
              }}
            >
              <p style={{ margin: 0, fontSize: "14px", color: "#4b5563" }}>
                Your earnings will be available for withdrawal once they reach
                the minimum payout threshold. Keep sharing your referral link to
                earn more!
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div
            style={{
              marginTop: "30px",
              paddingTop: "20px",
              borderTop: "1px solid #e5e7eb",
              textAlign: "center" as const,
            }}
          >
            <p
              style={{ fontSize: "13px", color: "#9ca3af", lineHeight: "1.5" }}
            >
              Have questions about your referral? Contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
