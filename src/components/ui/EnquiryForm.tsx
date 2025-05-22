import React from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import { CSSProperties } from "react";

// Assuming apiRestricted is properly configured in your store
import { apiRestricted } from "../../store/api.ts";

const EnquiryForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    query: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const trimmedData = {
      name: formData.name.trim(),
      mobileNumber: formData.mobileNumber.trim(),
      email: formData.email.trim(),
      query: formData.query.trim(),
    };

    if (
      !trimmedData.name ||
      !trimmedData.email ||
      !trimmedData.mobileNumber ||
      !trimmedData.query
    ) {
      setErrorMessage("All fields are required!");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    if (trimmedData.mobileNumber.replace(/\D/g, "").length < 10) {
      setErrorMessage("Mobile number must contain at least 10 digits.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    // Add manual validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.mobileNumber.trim() ||
      !formData.query.trim()
    ) {
      setErrorMessage("All fields are required!");
      return;
    }

    // Add email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Add mobile validation
    if (formData.mobileNumber.replace(/\D/g, "").length < 10) {
      setErrorMessage("Mobile number must contain at least 10 digits.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiRestricted.post("/users/enquiry", {
        name: formData.name.trim(),
        mobileNumber: formData.mobileNumber.trim(),
        email: formData.email.trim(),
        query: formData.query.trim(),
      });

      if (response.data.status === "success") {
        setIsOpen(false);
        setFormData({ name: "", mobileNumber: "", email: "", query: "" });
      }
    } catch (error) {
      setErrorMessage("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styling configurations
  const textColors = {
    heading: "#1e3a8a",
    label: "#1d4ed8",
    icon: "#2563eb",
    error: "#dc2626",
  };

  const styles: Record<string, CSSProperties> = {
    floatingButton: {
      position: "fixed",
      bottom: "1.5rem",
      right: "1.5rem",
      width: "54px",
      height: "54px",
      backgroundColor: "#2563eb",
      border: "none",
      borderRadius: "10px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease-in-out",
      zIndex: 50,
    },
    floatingButtonHover: {
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transform: "scale(1.1)",
      backgroundColor: "#1d4ed8",
    },
    modalBackdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(13, 16, 27, 0.08)",
      backdropFilter: "blur(4px)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalBox: {
      width: "90%",
      maxWidth: "28rem",
      padding: "2rem",
      backgroundColor: "white",
      borderRadius: "0.75rem",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      border: "1px solid #93c5fd",
      animation: "fadeInUp 0.3s ease-out forwards",
      opacity: 0,
      transform: "translateY(10px)",
    },
    inputField: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "0.375rem",
      border: "1px solid #bfdbfe",
      backgroundColor: "#ffffff",
      transition: "all 0.2s ease-in-out",
    },
    inputFocus: {
      borderColor: "#60a5fa",
      boxShadow: "0 0 0 2px rgba(96, 165, 250, 0.2)",
      outline: "none",
    },
    submitButton: {
      backgroundColor: "#2563eb",
      color: "#ffffff",
      padding: "0.75rem 1.5rem",
      borderRadius: "0.375rem",
      border: "none",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease-in-out",
    },
    submitButtonHover: {
      backgroundColor: "#1d4ed8",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    },
    cancelButton: {
      backgroundColor: "transparent",
      color: "#2563eb",
      padding: "0.75rem 1.5rem",
      borderRadius: "0.375rem",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
    },
    cancelButtonHover: {
      backgroundColor: "#dbeafe",
    },
    errorMessage: {
      color: textColors.error,
      backgroundColor: "#fee2e2",
      padding: "0.75rem",
      borderRadius: "0.375rem",
      marginBottom: "1rem",
      fontSize: "0.875rem",
    },
    disabledButton: {
      opacity: 0.7,
      cursor: "not-allowed",
    },
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          ...styles.floatingButton,
          ...(isOpen && styles.floatingButtonHover),
        }}
        aria-label="Open enquiry form"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ width: "24px", height: "24px", color: "white" }}
        >
          <path
            fillRule="evenodd"
            d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          style={styles.modalBackdrop}
          onClick={(e) =>
            e.currentTarget === e.target && !isSubmitting && setIsOpen(false)
          }
        >
          {/* Modal Content */}
          <div style={styles.modalBox}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: textColors.heading,
                  }}
                >
                  Contact Support
                </h2>
                <button
                  type="button"
                  onClick={() => !isSubmitting && setIsOpen(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  disabled={isSubmitting}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={textColors.icon}
                    style={{ width: "24px", height: "24px" }}
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div style={styles.errorMessage}>{errorMessage}</div>
              )}

              {/* Form Fields */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <label
                  htmlFor="name"
                  style={{ color: textColors.label, fontSize: "0.875rem" }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  style={styles.inputField}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <label
                  htmlFor="mobile"
                  style={{ color: textColors.label, fontSize: "0.875rem" }}
                >
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="+1 555 123 4567"
                  style={styles.inputField}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <label
                  htmlFor="email"
                  style={{ color: textColors.label, fontSize: "0.875rem" }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  style={styles.inputField}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <label
                  htmlFor="message"
                  style={{ color: textColors.label, fontSize: "0.875rem" }}
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  style={{
                    ...styles.inputField,
                    height: "120px",
                    resize: "vertical",
                  }}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Form Actions */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
              >
                <button
                  type="button"
                  onClick={() => !isSubmitting && setIsOpen(false)}
                  style={{
                    ...styles.cancelButton,
                    ...(isSubmitting && styles.disabledButton),
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  style={{
                    ...styles.submitButton,
                    ...(isSubmitting && styles.disabledButton),
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      Sending...
                      <span style={{ marginLeft: "8px" }}>🌀</span>
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        style={{
                          width: "20px",
                          height: "20px",
                          marginLeft: "8px",
                        }}
                      >
                        <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnquiryForm;
