// import React, { useEffect, useRef } from "react";
// import Carousel from "./Carousels";

// const WhatOurStudentSays = () => {


//   return (
//     <div className="flex flex-col items-center h-full max-w-full gap-4 px-10 py-10 bg-white">
//       {/* Header Section */}
//       <div className="flex flex-col items-center gap-4">
//         <h1 className="font-semibold text-gray-800 lg:text-hl md:text-hm text-hs">What our Student Says</h1>
//         <p className="max-w-3xl text-center text-gray-600 lg:text-pl md:text-pm text-ps">
//           Discover how COC has transformed the journeys of students just like you. Real stories, real results—be inspired by their success!
//         </p>
//       </div>

//       <Carousel />
//     </div>
//   );
// };

// export default WhatOurStudentSays;


import { motion, AnimatePresence } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import React from "react";

const cards = [
    {
        id: 1,
        text: "Taken CFM module classes and it was a great experience and quality learning. The course helps with providing necessary knowledge and practical skills regarding real life work. Even for the candidates who are already working, the course helps adding on new bits of skills and boosts confidence.",
        userName: "Ujwal Sharma",
        userRole: "CA Aspirant",
        rating: 5
    },
    {
        id: 2,
        text: "It is a great experience to join COC Education as I've enrolled for CFM course. I've gained so much practical knowledge from CFM Course. It really helpful for personal and professional growth.",
        userName: "Dhara Patel",
        userRole: "CA Final Student",
        rating: 5
    },
    {
        id: 3,
        text: "I would like to express my sincere gratitude for offering the Certified Financial Management (CFM) course through digital media platforms. This initiative is truly commendable, providing valuable learning opportunities in finance-related subjects from the comfort of one's own home.",
        userName: "Siddique Mohd Shahjan",
        userRole: "CA Intermediate Student",
        rating: 5
    },
    {
        id: 4,
        text: "According to me CFM is outstanding skill training course with a affordable price till now because it is the combination of various subject like Ms Office , Tally, stock market, Tax return and many others , in a word, all skills under one roof which is required for selection in corporate . Thank you Amarjeet Ma'am, Raghav Sir for such great effort.",
        userName: "SK Khan",
        userRole: "CA Foundation Student",
        rating: 5
    }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentIndex(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
    slides: {
      perView: 1.2,
      spacing: 24,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2.5,
          spacing: 32,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3.5,
          spacing: 48,
        },
      },
    },
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div className="relative w-full">
      <div ref={sliderRef} className="keen-slider">
        {cards.map((card, idx) => (
          <motion.div
            key={card.id}
            className="keen-slider__slide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className={`p-8 h-full rounded-2xl transition-all duration-300 ${
                currentIndex === idx
                  ? "bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-xl"
                  : "bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl"
              }`}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6 flex items-center gap-1">
                  {[...Array(card.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        currentIndex === idx ? "text-orange-500" : "text-gray-400"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p
                  className={`mb-8 text-lg leading-relaxed ${
                    currentIndex === idx ? "text-gray-800" : "text-gray-600"
                  }`}
                >
                  "{card.text}"
                </p>

                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 opacity-20 blur-sm"></div>
                      <img
                        className="relative w-12 h-12 rounded-full ring-2 ring-white"
                        src="https://avatar.iran.liara.run/public"
                        alt={card.userName}
                      />
                    </div>
                  </div>
                  <div>
                    <p
                      className={`font-semibold ${
                        currentIndex === idx ? "text-orange-600" : "text-gray-900"
                      }`}
                    >
                      {card.userName}
                    </p>
                    <p className="text-gray-500 text-sm">{card.userRole}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {loaded && instanceRef.current && (
        <div className="flex justify-center gap-3 mt-8">
          {cards.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === idx 
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 w-8" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const WhatOurStudentSays = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative container px-4 mx-auto text-center max-w-7xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20"
        >
          <span className="text-orange-600 font-medium">Student Testimonials</span>
        </motion.div>

        <h2 className="mb-6 text-4xl md:text-5xl font-bold text-gray-900">
          What Our Students Say
        </h2>
        <p className="max-w-2xl mx-auto mb-12 text-lg md:text-xl text-gray-600">
          Discover how COC has transformed the journeys of students just like you.
          Real stories, real results—be inspired by their success!
        </p>

        <Carousel />
      </motion.div>
    </section>
  );
};

export default WhatOurStudentSays;