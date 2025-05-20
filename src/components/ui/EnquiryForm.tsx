// import { useState } from 'react';
// import { CSSProperties } from 'react';

// const EnquiryForm = () => {
//   const [isOpen, setIsOpen] = useState(false);
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

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     setIsOpen(false);
//     setFormData({
//       name: '',
//       mobileNumber: '',
//       email: '',
//       query: ''
//     });
//   };


//   const styles: Record<string, CSSProperties> = {
//     floatingButton: {
//       width: '54px',
//       height: '54px',
//       backgroundColor: '#2563eb', // Vibrant blue
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
//       backgroundColor: '#1d4ed8' // Darker blue
//     },
//     modalBackdrop: {
//       // Keep existing structure
//       backgroundColor: 'rgba(30, 64, 175, 0.3)' // Deep blue backdrop
//     },
//     modalBox: {
//       // Keep existing structure
//       background: 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)', // Light blue gradient
//       border: '1px solid #93c5fd' // Sky blue border
//     },
//     inputField: {
//       // Keep existing structure
//       border: '1px solid #bfdbfe' // Light blue border
//     },
//     inputFieldFocus: {
//       borderColor: '#60a5fa', // Medium blue
//       boxShadow: '0 0 0 2px rgba(96, 165, 250, 0.2)',
//     },
//     submitButton: {
//       backgroundColor: '#2563eb', // Vibrant blue
//       color: '#ffffff',
//       // Keep rest of the structure
//     },
//     submitButtonHover: {
//       backgroundColor: '#1d4ed8', // Darker blue
//     },
//     cancelButton: {
//       color: '#2563eb', // Vibrant blue
//     },
//     cancelButtonHover: {
//       backgroundColor: '#dbeafe' // Very light blue
//     }
//   };

//   // Update all text colors to blue shades
//   const textColors = {
//     heading: '#1e3a8a', // Dark blue
//     label: '#1d4ed8',   // Medium dark blue
//     icon: '#2563eb'     // Vibrant blue
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
//         <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '2rem', height: '2rem', color: '#ffffff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//         </svg>
//       </button>

//       {/* Modal */}
//       {isOpen && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modalBox}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
//               <h3 style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#3730a3' }}>How Can We Help?</h3>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 style={{ background: 'transparent', border: 'none', color: '#6366f1', cursor: 'pointer' }}
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.5rem', height: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
//               <div style={{ display: 'flex', flexDirection: 'column' }}>
//                 <label style={{ color: '#3730a3', fontWeight: 500, marginBottom: '0.5rem' }}>
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="John Doe"
//                   style={styles.inputField}
//                   onFocus={(e) => {
//                     e.target.style.borderColor = '#818cf8';
//                     e.target.style.boxShadow = '0 0 0 2px rgba(129, 140, 248, 0.2)';
//                   }}
//                   onBlur={(e) => {
//                     e.target.style.borderColor = '#d1d5db';
//                     e.target.style.boxShadow = 'none';
//                   }}
//                   required
//                 />
//               </div>

//               <div style={{ display: 'flex', flexDirection: 'column' }}>
//                 <label style={{ color: '#3730a3', fontWeight: 500, marginBottom: '0.5rem' }}>
//                   Mobile Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="mobileNumber"
//                   value={formData.mobileNumber}
//                   onChange={handleChange}
//                   placeholder="+1 (123) 456-7890"
//                   style={styles.inputField}
//                   onFocus={(e) => {
//                     e.target.style.borderColor = '#818cf8';
//                     e.target.style.boxShadow = '0 0 0 2px rgba(129, 140, 248, 0.2)';
//                   }}
//                   onBlur={(e) => {
//                     e.target.style.borderColor = '#d1d5db';
//                     e.target.style.boxShadow = 'none';
//                   }}
//                   required
//                 />
//               </div>

//               <div style={{ display: 'flex', flexDirection: 'column' }}>
//                 <label style={{ color: '#3730a3', fontWeight: 500, marginBottom: '0.5rem' }}>
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="john@example.com"
//                   style={styles.inputField}
//                   onFocus={(e) => {
//                     e.target.style.borderColor = '#818cf8';
//                     e.target.style.boxShadow = '0 0 0 2px rgba(129, 140, 248, 0.2)';
//                   }}
//                   onBlur={(e) => {
//                     e.target.style.borderColor = '#d1d5db';
//                     e.target.style.boxShadow = 'none';
//                   }}
//                   required
//                 />
//               </div>

//               <div style={{ display: 'flex', flexDirection: 'column' }}>
//                 <label style={{ color: '#3730a3', fontWeight: 500, marginBottom: '0.5rem' }}>
//                   Your Message
//                 </label>
//                 <textarea
//                   name="query"
//                   value={formData.query}
//                   onChange={handleChange}
//                   style={{ ...styles.inputField, height: '8rem' }}
//                   placeholder="Tell us how we can help you..."
//                   onFocus={(e) => {
//                     e.target.style.borderColor = '#818cf8';
//                     e.target.style.boxShadow = '0 0 0 2px rgba(129, 140, 248, 0.2)';
//                   }}
//                   onBlur={(e) => {
//                     e.target.style.borderColor = '#d1d5db';
//                     e.target.style.boxShadow = 'none';
//                   }}
//                   required
//                 ></textarea>
//               </div>

//               <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
//                 <button
//                   type="button"
//                   onClick={() => setIsOpen(false)}
//                   style={{
//                     ...styles.cancelButton,
//                     ...(isCancelHover ? styles.cancelButtonHover : {})
//                   }}
//                   onMouseEnter={() => setIsCancelHover(true)}
//                   onMouseLeave={() => setIsCancelHover(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   style={{
//                     ...styles.submitButton,
//                     ...(isSubmitHover ? styles.submitButtonHover : {})
//                   }}
//                   onMouseEnter={() => setIsSubmitHover(true)}
//                   onMouseLeave={() => setIsSubmitHover(false)}
//                 >
//                   Send Message
//                   <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.5rem' }} viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EnquiryForm;

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

  // Blue theme colors
  const textColors = {
    heading: '#1e3a8a',
    label: '#1d4ed8',
    icon: '#2563eb'
  };

  // Type-safe inline styles
  const styles: Record<string, CSSProperties> = {
    floatingButton: {
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
    },
    floatingButtonHover: {
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transform: 'scale(1.1)',
      backgroundColor: '#1d4ed8'
    },
    modalBackdrop: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(30, 64, 175, 0.05)',
      backdropFilter: 'blur(4px)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalBox: {
      width: '28rem',
      padding: '2rem',
      background: 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)',
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
      backgroundColor: '#ffffff'
    },
    inputFieldFocus: {
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
      justifyContent: 'center'
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
      cursor: 'pointer'
    },
    cancelButtonHover: {
      backgroundColor: '#dbeafe'
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
        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '2rem', height: '2rem', color: '#fff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Modal */}
      {isOpen && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.5rem', color: textColors.heading }}>How Can We Help?</h3>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.5rem', height: '1.5rem', color: textColors.icon }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ color: textColors.label, fontWeight: 500, marginBottom: '0.5rem' }}>
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
                    e.target.style.borderColor = '#60a5fa';
                    e.target.style.boxShadow = '0 0 0 2px rgba(96, 165, 250, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#bfdbfe';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ color: textColors.label, fontWeight: 500, marginBottom: '0.5rem' }}>
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
                    e.target.style.borderColor = '#60a5fa';
                    e.target.style.boxShadow = '0 0 0 2px rgba(96, 165, 250, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#bfdbfe';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ color: textColors.label, fontWeight: 500, marginBottom: '0.5rem' }}>
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
                    e.target.style.borderColor = '#60a5fa';
                    e.target.style.boxShadow = '0 0 0 2px rgba(96, 165, 250, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#bfdbfe';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ color: textColors.label, fontWeight: 500, marginBottom: '0.5rem' }}>
                  Your Message
                </label>
                <textarea
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  style={{ ...styles.inputField, height: '8rem' }}
                  placeholder="Tell us how we can help you..."
                  onFocus={(e) => {
                    e.target.style.borderColor = '#60a5fa';
                    e.target.style.boxShadow = '0 0 0 2px rgba(96, 165, 250, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#bfdbfe';
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
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.5rem', color: '#fff' }} viewBox="0 0 20 20" fill="currentColor">
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