// import React from "react";
// import useForms from "../../hooks/useForms.ts";

// // Validation functions
// const validationRules = {
//     fullName: (value) => (!value ? "Full name is required" : ""),
//     email: (value) =>
//         !value
//             ? "Email is required"
//             : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
//             ? "Invalid email address"
//             : "",
//     phone: (value) =>
//         !value
//             ? "Phone number is required"
//             : !/^\+91\d{10}$/.test(value)
//             ? "Phone number must include +91 prefix and 10 digits"
//             : "",
//     message: (value) => (!value ? "Message is required" : ""),
// };

// export default function EnquiryForm() {
//     const { formData, errors, handleChange, handleBlur, isValid } = useForms(
//         { fullName: "", email: "", phone: "", message: "" },
//         validationRules
//     );

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (isValid()) {
//             alert("Form submitted successfully!");
//             console.log(formData);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center w-full h-full bg-[#FFFFFF]">
//             <form
//                 onSubmit={handleSubmit}
//                 className="flex justify-center items-center flex-col rounded w-5/6 h-full  mt-6 text-center text-[#0A0A0A] py-5"
//             >
//                 <h1 className="font-bold text-center lg:text-pl md:text-pm text-ps ">Enquire Now</h1>
//                 <p className="mb-3 text-center text-n">
//                     Please fill the form below for any enquiry!
//                 </p>

//                 <div className="w-full mb-2 form-control">
//                     <label className="label">
//                         <span className="text-[#041B2D] text-n2">Full Name<span className="text-error">*</span></span>
//                     </label>
//                     <input
//                         type="text"
//                         name="fullName"
//                         className={`flex-1 px-4 py-2 rounded-lg border-2 focus:outline-none text-black ${
//                             errors.fullName ? "input-error" : ""
//                         }`}
//                         placeholder="Enter your full name"
//                         required={true}
//                         value={formData.fullName}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                     />
//                 </div>

//                 {/* Email Address */}
//                 <div className="w-full mb-2 form-control">
//                     <label className="label">
//                         <span className="text-[#041B2D] text-n2">Email Address<span className="text-error">*</span></span>
//                     </label>
//                     <input
//                         type="email"
//                         name="email"
//                         className={` flex-1 px-4 py-2 rounded-lg border-2 focus:outline-none text-black ${
//                             errors.email ? "input-error" : ""
//                         }`}
//                         placeholder="Enter your email address"
//                         required={true}
//                         value={formData.email}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                     />
//                 </div>

//                 {/* Phone Number */}
//                 <div className="w-full mb-2 form-control">
//                     <label className="label">
//                         <span className="text-[#041B2D] text-n2">
//                             Phone Number (+91)<span className="text-error">*</span>
//                         </span>
//                     </label>
//                     <input
//                         type="text"
//                         name="phone"
//                         className={`flex-1 px-4 py-2 rounded-lg border-2 focus:outline-none text-black ${
//                             errors.phone ? "input-error" : ""
//                         }`}
//                         placeholder="+919876543210"
//                         required={true}
//                         value={formData.phone}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                     />
//                 </div>

//                 {/* Message */}
//                 <div className="w-full mb-4 form-control">
//                     <label className="label">
//                         <span className="text-[#041B2D] text-n2">Message<span className="text-error">*</span></span>
//                     </label>
//                     <textarea
//                         name="message"
//                         className={`resize-none flex-1 px-4 py-2 rounded-lg border-2 focus:outline-none text-black ${
//                             errors.message ? "textarea-error" : ""
//                         }`}
//                         placeholder="Enter your message/query here.."
//                         required={true}
//                         value={formData.message}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         style={{ minHeight: "100px", maxHeight: "200px" }}
//                     ></textarea>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="w-full form-control ">
//                     <button type="submit" className="btn bg-[#041B2D] text-white">
//                         Submit
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

import { useState } from 'react';
import { CSSProperties } from 'react';

const EnquiryForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    query: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsOpen(false);
    setFormData({
      name: '',
      mobileNumber: '',
      email: '',
      query: ''
    });
  };

  // Type-safe inline styles
  const styles: Record<string, CSSProperties> = {
    floatingButton: {
      width: '54px',
      height: '54px',
      backgroundColor: 'rgb(66, 96, 139)',
      // backgroundColor: "green",
      border: 'none',
      borderRadius: '10px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease-in-out',
      transform: 'scale(1)'
    },
    floatingButtonHover: {
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transform: 'scale(1.1)'
    },
    modalBackdrop: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalBox: {
      width: '28rem',
      padding: '2rem',
      background: 'linear-gradient(to bottom right, #f0f4ff, #e0e7ff)',
      borderRadius: '0.75rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '1px solid #c7d2fe',
      animation: 'fadeInUp 0.3s ease-out forwards',
      opacity: 0,
      transform: 'translateY(10px)'
    },
    inputField: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      backgroundColor: '#ffffff'
    },
    inputFieldFocus: {
      borderColor: '#818cf8',
      boxShadow: '0 0 0 2px rgba(129, 140, 248, 0.2)',
      outline: 'none'
    },
    submitButton: {
      backgroundColor: '#6366f1',
      color: '#ffffff',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.375rem',
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    submitButtonHover: {
      backgroundColor: '#4f46e5',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    cancelButton: {
      backgroundColor: 'transparent',
      color: '#6366f1',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer'
    },
    cancelButtonHover: {
      backgroundColor: '#e0e7ff'
    }
  };

  // State for hover effects
  const [isFloatingHover, setIsFloatingHover] = useState(false);
  const [isSubmitHover, setIsSubmitHover] = useState(false);
  const [isCancelHover, setIsCancelHover] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50 }}>
      {/* Keyframes animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          ...styles.floatingButton,
          ...(isFloatingHover ? styles.floatingButtonHover : {})
        }}
        onMouseEnter={() => setIsFloatingHover(true)}
        onMouseLeave={() => setIsFloatingHover(false)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '2rem', height: '2rem', color: '#ffffff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Modal */}
      {isOpen && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#3730a3' }}>How Can We Help?</h3>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#6366f1', cursor: 'pointer' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.5rem', height: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ color: '#3730a3', fontWeight: 500, marginBottom: '0.5rem' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  style={styles.inputField}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#818cf8';
                    e.target.style.boxShadow = '0 0 0 2px rgba(129, 140, 248, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ color: '#3730a3', fontWeight: 500, marginBottom: '0.5rem' }}>
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="+1 (123) 456-7890"
                  style={styles.inputField}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#818cf8';
                    e.target.style.boxShadow = '0 0 0 2px rgba(129, 140, 248, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ color: '#3730a3', fontWeight: 500, marginBottom: '0.5rem' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  style={styles.inputField}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#818cf8';
                    e.target.style.boxShadow = '0 0 0 2px rgba(129, 140, 248, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ color: '#3730a3', fontWeight: 500, marginBottom: '0.5rem' }}>
                  Your Message
                </label>
                <textarea
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  style={{ ...styles.inputField, height: '8rem' }}
                  placeholder="Tell us how we can help you..."
                  onFocus={(e) => {
                    e.target.style.borderColor = '#818cf8';
                    e.target.style.boxShadow = '0 0 0 2px rgba(129, 140, 248, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                ></textarea>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  style={{
                    ...styles.cancelButton,
                    ...(isCancelHover ? styles.cancelButtonHover : {})
                  }}
                  onMouseEnter={() => setIsCancelHover(true)}
                  onMouseLeave={() => setIsCancelHover(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{
                    ...styles.submitButton,
                    ...(isSubmitHover ? styles.submitButtonHover : {})
                  }}
                  onMouseEnter={() => setIsSubmitHover(true)}
                  onMouseLeave={() => setIsSubmitHover(false)}
                >
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.5rem' }} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiryForm;