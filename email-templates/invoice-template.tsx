import { InvoiceDetails } from "@/types/invoice";
import * as React from "react";

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
          <h1 style={{ color: "#ffffff", margin: 0, fontSize: "24px" }}>
            Payment Invoice
          </h1>
          <p style={{ color: "#dbeafe", marginTop: "4px", fontSize: "14px" }}>
            Thank you for your purchase from Learn Up IND
          </p>
        </div>

        {/* Content Body */}
        <div style={{ padding: "30px" }}>
          {/* Amount Summary Card */}
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

          {/* Order Details - Stacked */}
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
              Order Details
            </label>
            <div
              style={{
                fontSize: "14px",
                color: "#374151",
                marginTop: "8px",
                lineHeight: "1.6",
              }}
            >
              <div style={{ marginBottom: "2px" }}>
                <strong>Order ID:</strong> {orderId}
              </div>
              <div style={{ marginBottom: "2px" }}>
                <strong>Payment ID:</strong> {paymentId}
              </div>
              <div>
                <strong>Date:</strong> {date}
              </div>
            </div>
          </div>

          {/* Billing Details - Stacked */}
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
              Billing Details
            </label>
            <div
              style={{
                fontSize: "14px",
                color: "#374151",
                marginTop: "8px",
                lineHeight: "1.6",
              }}
            >
              <div style={{ fontWeight: "600", color: "#111827" }}>
                {user.name}
              </div>
              <div>{user.email}</div>
              <div>
                {user.state && <>{user.state}, </>} {user.country}
              </div>
            </div>
          </div>

          {/* Course Information Section */}
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
              Course Information
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
              }}
            >
              <div style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    color: "#6b7280",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    marginBottom: "2px",
                  }}
                >
                  Course ID:
                </div>
                <div style={{ color: "#111827" }}>{courseId}</div>
              </div>

              <div>
                <div
                  style={{
                    color: "#6b7280",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    marginBottom: "2px",
                  }}
                >
                  Course Title:
                </div>
                <div style={{ fontWeight: "600", color: "#111827" }}>
                  {courseName}
                </div>
              </div>
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
              If you have any questions about this invoice, please contact our
              support team. This is a computer-generated receipt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
