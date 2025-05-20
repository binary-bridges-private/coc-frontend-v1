// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";

// const TopBanner = () => {
//   const [count, setCount] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const spanRef = useRef(null);

//   useEffect(() => {
//     const observerCallback = (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       });
//     };

//     const observer = new IntersectionObserver(observerCallback, {
//       threshold: 0.5,
//     });

//     if (spanRef.current) {
//       observer.observe(spanRef.current);
//     }

//     return () => {
//       if (spanRef.current) {
//         observer.unobserve(spanRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (isVisible) {
//       let start = 0;
//       const end = 200000;
//       const duration = 2000;
//       const step = Math.ceil(end / (duration / 30));

//       const timer = setInterval(() => {
//         start += step;
//         if (start >= end) {
//           setCount(end);
//           clearInterval(timer);
//         } else {
//           setCount(start);
//         }
//       }, 30);

//       return () => clearInterval(timer);
//     }
//   }, [isVisible]);

//   return (
//     <section className="relative flex flex-col items-center gap-6 px-6 py-10 overflow-hidden bg-gradient-to-br from-theme1 to-theme2">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//         className="text-center max-w-[1006px] z-10"
//       >
//         <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
//           Start your studies with
//           <span ref={spanRef} className="ml-2 font-extrabold text-pink-600 drop-shadow-md">
//             {count.toLocaleString()}+
//           </span>{" "}
//           enrolled students of COC Education.
//         </h1>
//       </motion.div>

//       <motion.p
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.6 }}
//         viewport={{ once: true }}
//         className="text-center max-w-[880px] text-[white] text-base md:text-lg font-medium z-10"
//       >
//         Experienced Faculties, Daily Doubt sessions, Ready to counsel any enquiry, supportive technical team and empowering staff is which differentiate
//         {/* Learn from expert mentors, clear doubts every day, and grow your skills with full support from our experienced, caring team. */}
//       </motion.p>
//     </section>
//   );
// };

// export default TopBanner;


import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TopBanner = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const spanRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.5 }
    );

    if (spanRef.current) observer.observe(spanRef.current);
    return () => {
      if (spanRef.current) observer.unobserve(spanRef.current);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animateCount = (start: number, end: number, duration: number) => {
        let startTime: number;
        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          setCount(Math.floor(progress * (end - start) + start));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      animateCount(0, 200000, 2000);
    }
  }, [isVisible]);

  return (
    <section className="relative flex flex-col items-center gap-6 px-6 py-10 overflow-hidden bg-gradient-to-br from-theme1 to-theme2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="z-10 max-w-4xl text-center"
      >
        <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
          <span className="block mb-4 text-orange-100">Start your journey with</span>
          <span ref={spanRef} className="relative inline-block px-4">
            <span className="absolute inset-0 transform -skew-x-12 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 -z-10" />
            <span className="text-6xl font-black text-white drop-shadow-md lg:text-7xl">
              {count.toLocaleString()}+
            </span>
          </span>
          <span className="block mt-4 text-xl font-medium text-orange-100 md:text-2xl">
            Successful Students Worldwide
          </span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="z-10 max-w-2xl text-center"
      >
        <p className="text-lg font-medium leading-relaxed text-orange-50 md:text-xl">
          Learn from industry experts with daily interactive sessions, personalized guidance, 
          and 24/7 support from our dedicated team of mentors and technical staff.
        </p>
      </motion.div>

    </section>
  );
};

export default TopBanner;