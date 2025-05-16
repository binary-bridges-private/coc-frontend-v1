import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

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
      const end = 200000;
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
    <section className="relative flex flex-col items-center gap-6 px-6 py-10 overflow-hidden bg-gradient-to-br from-theme1 to-theme2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-[1006px] z-10"
      >
        <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
          Start your studies with
          <span ref={spanRef} className="ml-2 font-extrabold text-pink-600 drop-shadow-md">
            {count.toLocaleString()}+
          </span>{" "}
          enrolled students of COC Education.
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-[880px] text-[white] text-base md:text-lg font-medium z-10"
      >
        Experienced Faculties, Daily Doubt sessions, Ready to counsel any enquiry, supportive technical team and empowering staff is which differentiate
        {/* Learn from expert mentors, clear doubts every day, and grow your skills with full support from our experienced, caring team. */}
      </motion.p>
    </section>
  );
};

export default TopBanner;
