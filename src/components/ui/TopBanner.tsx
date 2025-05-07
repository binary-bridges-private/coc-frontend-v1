// import React, { useState, useEffect, useRef } from "react";

// const TopBanner = () => {
//   const [count, setCount] = useState(0); // State to track the number
//   const [isVisible, setIsVisible] = useState(false); // State to track visibility
//   const spanRef = useRef(null); // Ref for the span element

//   useEffect(() => {
//     // Function to handle Intersection Observer
//     const observerCallback = (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true); // Set visible when in viewport
//         }
//       });
//     };

//     const observer = new IntersectionObserver(observerCallback, {
//       threshold: 0.5, // Trigger when 50% of the span is visible
//     });

//     if (spanRef.current) {
//       observer.observe(spanRef.current); // Observe the span element
//     }

//     return () => {
//       if (spanRef.current) {
//         observer.unobserve(spanRef.current); // Clean up observer
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (isVisible) {
//       let start = 0;
//       const end = 180000; // Target number
//       const duration = 2000; // Duration of the animation in ms
//       const stepTime = duration / 100; // Calculate step time
//       const stepFactor = Math.log10(end + 1) / 100; // Logarithmic factor for smooth exponential increment

//       const timer = setInterval(() => {
//         start += Math.ceil(stepFactor * (end - start) / 2); // Exponential increment
//         if (start >= end) {
//           setCount(end);
//           clearInterval(timer); // Stop animation
//         } else {
//           setCount(start);
//         }
//       }, stepTime);

//       return () => clearInterval(timer); // Cleanup on unmount
//     }
//   }, [isVisible]);

//   return (
//     <div>
//       <section className="flex flex-col items-center w-full gap-5 px-10 py-20 bg-[#FCE9E9]">
//         <div className="text-center w-full max-w-[1006px]">
//           <h1 className="lg:text-hl md:text-hm text-hs leading-[122%] text-[#1E1E1E] font-semibold">
//             Start your studies with{" "}
//             <span
//               className="text-[#FF0000]"
//               ref={spanRef} // Attach ref to span
//             >
//               {count.toLocaleString()}+
//             </span>{" "}
//             enrolled students of COC Education.
//           </h1>
//         </div>

//         <p className="text-center w-full max-w-[880px] text-[#545454] font-normal lg:text-pl md:text-pm text-ps leading-[148%]">
//           Experienced faculties, daily doubt sessions, ready to counsel any
//           enquiry, supportive technical team, and empowering staff differentiate
//           us.
//         </p>
//       </section>
//     </div>
//   );
// };

// export default TopBanner;
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Optional, but highly recommended

const TopBanner = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const spanRef = useRef(null);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    });

    if (spanRef.current) {
      observer.observe(spanRef.current);
    }

    return () => {
      if (spanRef.current) {
        observer.unobserve(spanRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = 180000;
      const duration = 2000;
      const step = Math.ceil(end / (duration / 30));

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 30);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <section className="relative flex flex-col items-center gap-6 px-6 py-20 overflow-hidden bg-white shadow-xl rounded-2xl">
      {/* Decorative Floating SVGs (optional but beautiful) */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-[1006px] z-10"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E1E1E] leading-tight">
          Join{" "}
          <span ref={spanRef} className="text-[#FF1C1C] drop-shadow-md font-extrabold">
            {count.toLocaleString()}+
          </span>{" "}
          students on their journey with{" "}
          <span className="text-[#1E1E1E] underline decoration-[#FF6A6A]/40">
            COC Education
          </span>
          .
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-[880px] text-[#444] text-base md:text-lg font-medium z-10"
      >
        Learn from expert mentors, clear doubts every day, and grow your skills with full support from our experienced, caring team.
      </motion.p>
    </section>
  );
};

export default TopBanner;
