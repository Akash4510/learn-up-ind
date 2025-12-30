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
            {/* Converted SVG classes to inline styles and changed color to white */}
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 style={{ color: "#ffffff", margin: 0, fontSize: "24px" }}>
            Payout Successful!
          </h1>
          <p style={{ color: "#dbeafe", marginTop: "4px", fontSize: "14px" }}>
            Your earnings have been transferred
          </p>
        </div>

        {/* Content Body */}
        <div style={{ padding: "30px" }}>
          {/* Amount Hero Section */}
          <div
            style={{
              backgroundColor: "#eff6ff",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center" as const,
              marginBottom: "30px",
              border: "1px solid #dbeafe",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "#1e40af",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Amount Paid
            </span>
            <h2
              style={{
                fontSize: "32px",
                color: "#1e40af",
                margin: "5px 0 0 0",
              }}
            >
              ₹{amount}
            </h2>
          </div>

          {/* Transaction Details - Stacked */}
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
              Transaction Details
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
                <strong>Payout ID:</strong> {id}
              </div>
              <div style={{ marginBottom: "4px" }}>
                <strong>Processed On:</strong>{" "}
                {payoutDate ? formatDateWithMonthName(payoutDate) : "N/A"}
              </div>
              <div>
                <strong>Payment Method:</strong> {transactionId}
              </div>
            </div>
          </div>

          {/* Success Message & Comment Box */}
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
              Status & Remarks
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
              <p
                style={{
                  margin: "0 0 16px 0",
                  fontSize: "14px",
                  color: "#4b5563",
                }}
              >
                Your payout request has been successfully processed. The amount
                should reflect in your account within 2-5 business days
                depending on your bank&apos;s processing time.
              </p>

              <div
                style={{
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: "12px",
                  marginTop: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  Comment:
                </div>
                <div style={{ color: "#111827" }}>{comment}</div>
              </div>

              <p
                style={{
                  margin: "16px 0 0 0",
                  fontSize: "14px",
                  color: "#4b5563",
                }}
              >
                Thank you for being a valued member of our community. Keep up
                the great work!
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
              Need help with this transaction? Our support team is here for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
