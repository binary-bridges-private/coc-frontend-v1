// import { useState } from 'react';
// import { CSSProperties } from 'react';
// import { apiRestricted } from '../../store/api.ts';

// const EnquiryForm = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     mobileNumber: '',
//     email: '',
//     query: ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     setErrorMessage(null);

//     if (!formData.name || !formData.email || !formData.mobileNumber || !formData.query) {
//       setErrorMessage("All fields are required!");
//       return;
//     }

//     try {
//       const response = await apiRestricted.post('/users/enquiry', formData);

//       if (response.data.status === 'success') {
//         setIsOpen(false);
//         setFormData({
//           name: '',
//           mobileNumber: '',
//           email: '',
//           query: ''
//         });

//       } else {
//         setErrorMessage(response.data.message || 'Submission failed. Please try again.');
//       }
//     } catch (error) {
//       let message = 'An error occurred. Please try again.';
//       if (error?.response?.data?.message) {
//         message = error.response?.data?.message || message;
//       }
//       setErrorMessage(message);
//     } finally {
//       setIsSubmitting(false);
//     }

//     setIsOpen(false);
//     setFormData({
//       name: '',
//       mobileNumber: '',
//       email: '',
//       query: ''
//     });
//   };

//   // Blue theme colors
//   const textColors = {
//     heading: '#1e3a8a',
//     label: '#1d4ed8',
//     icon: '#2563eb'
//   };

//   // Type-safe inline styles
//   const styles: Record<string, CSSProperties> = {
//     floatingButton: {
//       width: '54px',
//       height: '54px',
//       backgroundColor: '#2563eb',
//       border: 'none',
//       borderRadius: '10px',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       transition: 'all 0.3s ease-in-out',
//     },
//     floatingButtonHover: {
//       boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
//       transform: 'scale(1.1)',
//       backgroundColor: '#1d4ed8'
//     },
//     modalBackdrop: {
//       position: 'fixed' as const,
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(13, 16, 27, 0.08)',
//       backdropFilter: 'blur(4px)',
//       zIndex: 50,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     modalBox: {
//       width: '28rem',
//       padding: '2rem',
//       backgroundColor: 'white',
//       borderRadius: '0.75rem',
//       boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
//       border: '1px solid #93c5fd',
//       animation: 'fadeInUp 0.3s ease-out forwards',
//       opacity: 0,
//       transform: 'translateY(10px)'
//     },
//     inputField: {
//       width: '100%',
//       padding: '0.75rem',
//       borderRadius: '0.375rem',
//       border: '1px solid #bfdbfe',
//       backgroundColor: '#ffffff'
//     },
//     inputFieldFocus: {
//       borderColor: '#60a5fa',
//       boxShadow: '0 0 0 2px rgba(96, 165, 250, 0.2)',
//       outline: 'none'
//     },
//     submitButton: {
//       backgroundColor: '#2563eb',
//       color: '#ffffff',
//       padding: '0.75rem 1.5rem',
//       borderRadius: '0.375rem',
//       border: 'none',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     submitButtonHover: {
//       backgroundColor: '#1d4ed8',
//       boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
//     },
//     cancelButton: {
//       backgroundColor: 'transparent',
//       color: '#2563eb',
//       padding: '0.75rem 1.5rem',
//       borderRadius: '0.375rem',
//       border: 'none',
//       cursor: 'pointer'
//     },
//     cancelButtonHover: {
//       backgroundColor: '#dbeafe'
//     }
//   };

//   // State for hover effects
//   const [isFloatingHover, setIsFloatingHover] = useState(false);
//   const [isSubmitHover, setIsSubmitHover] = useState(false);
//   const [isCancelHover, setIsCancelHover] = useState(false);

//   return (
//     <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50 }}>
//       {/* Keyframes animation */}
//       <style>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>

//       {/* Floating Button */}
//       <button
//         onClick={() => setIsOpen(true)}
//         style={{
//           ...styles.floatingButton,
//           ...(isFloatingHover ? styles.floatingButtonHover : {})
//         }}
//         onMouseEnter={() => setIsFloatingHover(true)}
//         onMouseLeave={() => setIsFloatingHover(false)}
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '2rem', height: '2rem', color: '#fff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//         </svg>
//       </button>

//       {/* Modal */}
//       {isOpen && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modalBox}>

//             {errorMessage && (
//               <div style={{
//                 color: '#dc2626',
//                 backgroundColor: '#fee2e2',
//                 padding: '0.75rem',
//                 borderRadius: '0.375rem',
//                 marginBottom: '1rem'
//               }}>
//                 {errorMessage}
//               </div>
//             )}

//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
//               <h3 style={{ fontWeight: 'bold', fontSize: '1.5rem', color: textColors.heading }}>How Can We Help?</h3>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.5rem', height: '1.5rem', color: textColors.icon }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             {/* <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}> */}
//             <div style={{ display: 'flex', flexDirection: 'column' }}>
//               <label style={{ color: textColors.label, fontWeight: 500, marginBottom: '0.5rem' }}>
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="John Doe"
//                 style={styles.inputField}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#60a5fa';
//                   e.target.style.boxShadow = '0 0 0 2px rgba(96, 165, 250, 0.2)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#bfdbfe';
//                   e.target.style.boxShadow = 'none';
//                 }}
//                 required
//               />
//             </div>

//             <div style={{ display: 'flex', flexDirection: 'column' }}>
//               <label style={{ color: textColors.label, fontWeight: 500, marginBottom: '0.5rem' }}>
//                 Mobile Number
//               </label>
//               <input
//                 type="tel"
//                 name="mobileNumber"
//                 value={formData.mobileNumber}
//                 onChange={handleChange}
//                 placeholder="+91 7893945679"
//                 style={styles.inputField}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#60a5fa';
//                   e.target.style.boxShadow = '0 0 0 2px rgba(96, 165, 250, 0.2)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#bfdbfe';
//                   e.target.style.boxShadow = 'none';
//                 }}
//                 required
//               />
//             </div>
//             <div style={{ display: 'flex', flexDirection: 'column' }}>
//               <label style={{ color: textColors.label, fontWeight: 500, marginBottom: '0.5rem' }}>
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="john@example.com"
//                 style={styles.inputField}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#60a5fa';
//                   e.target.style.boxShadow = '0 0 0 2px rgba(96, 165, 250, 0.2)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#bfdbfe';
//                   e.target.style.boxShadow = 'none';
//                 }}
//                 required
//               />
//             </div>

//             <div style={{ display: 'flex', flexDirection: 'column' }}>
//               <label style={{ color: textColors.label, fontWeight: 500, marginBottom: '0.5rem' }}>
//                 Your Message
//               </label>
//               <textarea
//                 name="query"
//                 value={formData.query}
//                 onChange={handleChange}
//                 style={{ ...styles.inputField, height: '8rem' }}
//                 placeholder="Tell us how we can help you..."
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#60a5fa';
//                   e.target.style.boxShadow = '0 0 0 2px rgba(96, 165, 250, 0.2)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#bfdbfe';
//                   e.target.style.boxShadow = 'none';
//                 }}
//                 required
//               ></textarea>
//             </div>

//             <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
//               <button
//                 type="button"
//                 onClick={() => setIsOpen(false)}
//                 style={{
//                   ...styles.cancelButton,
//                   ...(isCancelHover ? styles.cancelButtonHover : {})
//                 }}
//                 onMouseEnter={() => setIsCancelHover(true)}
//                 onMouseLeave={() => setIsCancelHover(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 style={{
//                   ...styles.submitButton,
//                   ...(isSubmitHover ? styles.submitButtonHover : {}),
//                   ...(isSubmitting ? { opacity: 0.7, cursor: 'not-allowed' } : {})
//                 }}
//                 onMouseEnter={() => !isSubmitting && setIsSubmitHover(true)}
//                 onMouseLeave={() => setIsSubmitHover(false)}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   'Sending...'
//                 ) : (
//                   <>
//                     Send Message
//                     <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.5rem', color: '#fff' }} viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </>
//                 )}
//               </button>
//             </div>
//             {/* </form> */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EnquiryForm;

import { useState, ChangeEvent, FormEvent } from 'react';
import { CSSProperties } from 'react';

// Assuming apiRestricted is properly configured in your store
import { apiRestricted } from '../../store/api.ts';

const EnquiryForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    query: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const trimmedData = {
      name: formData.name.trim(),
      mobileNumber: formData.mobileNumber.trim(),
      email: formData.email.trim(),
      query: formData.query.trim()
    };

    if (!trimmedData.name || !trimmedData.email || !trimmedData.mobileNumber || !trimmedData.query) {
      setErrorMessage("All fields are required!");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    if (trimmedData.mobileNumber.replace(/\D/g, '').length < 10) {
      setErrorMessage("Mobile number must contain at least 10 digits.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    // Add manual validation
    if (!formData.name.trim() || !formData.email.trim() ||
      !formData.mobileNumber.trim() || !formData.query.trim()) {
      setErrorMessage("All fields are required!");
      return;
    }

    // Add email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Add mobile validation
    if (formData.mobileNumber.replace(/\D/g, '').length < 10) {
      setErrorMessage("Mobile number must contain at least 10 digits.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', mobileNumber: '', email: '', query: '' });
      setIsOpen(false);
    },1000);
    // try {
    //   const response = await apiRestricted.post('/users/enquiry', {
    //     name: formData.name.trim(),
    //     mobileNumber: formData.mobileNumber.trim(),
    //     email: formData.email.trim(),
    //     query: formData.query.trim()
    //   });

    //   if (response.data.status === 'success') {
    //     setIsOpen(false);
    //     setFormData({ name: '', mobileNumber: '', email: '', query: '' });
    //   }
    // } catch (error) {
    //   setErrorMessage('Submission failed. Please try again.');
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  // Styling configurations
  const textColors = {
    heading: '#1e3a8a',
    label: '#1d4ed8',
    icon: '#2563eb',
    error: '#dc2626'
  };

  const styles: Record<string, CSSProperties> = {
    floatingButton: {
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      width: '54px',
      height: '54px',
      backgroundColor: '#2563eb',
      border: 'none',
      borderRadius: '10px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease-in-out',
      zIndex: 50
    },
    floatingButtonHover: {
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transform: 'scale(1.1)',
      backgroundColor: '#1d4ed8'
    },
    modalBackdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(13, 16, 27, 0.08)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalBox: {
      width: '90%',
      maxWidth: '28rem',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      border: '1px solid #93c5fd',
      animation: 'fadeInUp 0.3s ease-out forwards',
      opacity: 0,
      transform: 'translateY(10px)'
    },
    inputField: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '0.375rem',
      border: '1px solid #bfdbfe',
      backgroundColor: '#ffffff',
      transition: 'all 0.2s ease-in-out'
    },
    inputFocus: {
      borderColor: '#60a5fa',
      boxShadow: '0 0 0 2px rgba(96, 165, 250, 0.2)',
      outline: 'none'
    },
    submitButton: {
      backgroundColor: '#2563eb',
      color: '#ffffff',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.375rem',
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease-in-out'
    },
    submitButtonHover: {
      backgroundColor: '#1d4ed8',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    cancelButton: {
      backgroundColor: 'transparent',
      color: '#2563eb',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out'
    },
    cancelButtonHover: {
      backgroundColor: '#dbeafe'
    },
    errorMessage: {
      color: textColors.error,
      backgroundColor: '#fee2e2',
      padding: '0.75rem',
      borderRadius: '0.375rem',
      marginBottom: '1rem',
      fontSize: '0.875rem'
    },
    disabledButton: {
      opacity: 0.7,
      cursor: 'not-allowed'
    }
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
          ...(isOpen && styles.floatingButtonHover)
        }}
        aria-label="Open enquiry form"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px', color: 'white' }}>
          <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          style={styles.modalBackdrop}
          onClick={(e) => e.currentTarget === e.target && !isSubmitting && setIsOpen(false)}
        >
          {/* Modal Content */}
          <div style={styles.modalBox}>
            {/* Header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: textColors.heading }}>
                  Contact Support
                </h2>
                <button
                  type="button"
                  onClick={() => !isSubmitting && setIsOpen(false)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                  disabled={isSubmitting}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={textColors.icon} style={{ width: '24px', height: '24px' }}>
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div style={styles.errorMessage}>
                  {errorMessage}
                </div>
              )}

              {/* Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="name" style={{ color: textColors.label, fontSize: '0.875rem' }}>
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="mobile" style={{ color: textColors.label, fontSize: '0.875rem' }}>
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="email" style={{ color: textColors.label, fontSize: '0.875rem' }}>
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="message" style={{ color: textColors.label, fontSize: '0.875rem' }}>
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  style={{ ...styles.inputField, height: '120px', resize: 'vertical' }}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Form Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => !isSubmitting && setIsOpen(false)}
                  style={{
                    ...styles.cancelButton,
                    ...(isSubmitting && styles.disabledButton)
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type='button'
                  onClick={handleSubmit}
                  style={{
                    ...styles.submitButton,
                    ...(isSubmitting && styles.disabledButton)
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      Sending...
                      <span style={{ marginLeft: '8px' }}>🌀</span>
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: '20px', height: '20px', marginLeft: '8px' }}>
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