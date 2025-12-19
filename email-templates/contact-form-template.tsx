import * as React from "react";

interface ContactFormTemplateProps {
  userEmail: string;
  message: string;
}

export const ContactFormTemplate = ({
  userEmail,
  message,
}: ContactFormTemplateProps) => (
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
          New Message Received
        </h1>
        <p style={{ color: "#dbeafe", marginTop: "4px", fontSize: "14px" }}>
          From Learn Up IND Contact Form
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: "30px" }}>
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
            From
          </label>
          <p style={{ fontSize: "16px", color: "#111827", marginTop: "4px" }}>
            {userEmail}
          </p>
        </div>

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
            Message
          </label>
          <div
            style={{
              fontSize: "16px",
              color: "#374151",
              marginTop: "8px",
              padding: "16px",
              backgroundColor: "#f3f4f6",
              borderRadius: "8px",
              lineHeight: "1.6",
            }}
          >
            {message}
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "1px solid #e5e7eb",
            textAlign: "center" as const,
          }}
        >
          <p style={{ fontSize: "13px", color: "#9ca3af" }}>
            To reply to the student, simply click the &quot;Reply&quot; button
            in your email client.
          </p>
        </div>
      </div>
    </div>
  </div>
);
