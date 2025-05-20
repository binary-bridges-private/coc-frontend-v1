// import React from "react";
// import Slider from "react-slick";
// import FacultyCard from "./FacultyCard.tsx";

// const FacultyHome = () => {
//     const facultiesList = [
//         {
//             image: "/assets/faculties/first.svg",
//             label: "Professor, CA",
//             name: "Raghav Goel",
//             bio: "He is a Qualified Chartered Accountant by profession. Associate Chartered Accountant Master of Business Administration from Birla Institute of Technology.",
//         },
//         {
//             image: "/assets/faculties/second.svg",
//             label: "Instructor, ACCA",
//             name: "Amarjit Kaur",
//             bio: "ACCA, M.com, 3-year Diploma in Computer Applications. 10 Years Experience in teaching Tally & Information technology and other computer software.",
//         },
//         {
//             image: "/assets/faculties/third.svg",
//             label: "Professor",
//             name: "Nitin Bhardwaj",
//             bio: "He is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. He was a university topper in M.COM & B.COM.",
//         },
//         {
//             image: "/assets/faculties/first.svg",
//             label: "Professor, CA",
//             name: "Raghav Goel",
//             bio: "He is a Qualified Chartered Accountant by profession. Associate Chartered Accountant Master of Business Administration from Birla Institute of Technology.",
//         },
//         {
//             image: "/assets/faculties/second.svg",
//             label: "Instructor, ACCA",
//             name: "Amarjit Kaur",
//             bio: "ACCA, M.com, 3-year Diploma in Computer Applications. 10 Years Experience in teaching Tally & Information technology and other computer software.",
//         },
//         {
//             image: "/assets/faculties/third.svg",
//             label: "Professor",
//             name: "Nitin Bhardwaj",
//             bio: "He is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. He was a university topper in M.COM & B.COM.",
//         },
//     ];

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         pauseOnHover: true,
//         arrows: false,
//         responsive: [
//             {
//                 breakpoint: 1635, // Large desktops
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 1278, // Tablets
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 895, // Large mobile devices
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 576, // Small mobile devices
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     arrows: false, // Hide navigation arrows for smaller screens
//                 },
//             },
//             {
//                 breakpoint: 375, // Very small mobile devices
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     arrows: false,
//                 },
//             },
//         ],
//     };

//     return (
//         <div className="flex flex-col items-center w-full px-2 py-20 faculty-home lg:px-20 md:px-20 bg-theme1">
//             {/* Heading Section */}
//             <h2 className="mb-8 text-center text-white lg:text-hl md:text-hm text-hs">
//                 Guiding You to Success: <span className="italic text-red-600">Our Faculty</span>
//             </h2>

//             {/* Faculty Slider */}
//             <div className="w-full max-w-8xl color-white">
//                 <Slider {...settings}>
//                     {facultiesList.map((faculty, index) => (
//                         <FacultyCard
//                             key={index}
//                             image={faculty.image}
//                             label={faculty.label}
//                             name={faculty.name}
//                             bio={faculty.bio}
//                         />
//                     ))}
//                 </Slider>
//             </div>

//             {/* Explore Button */}
//             <div className="flex justify-center w-full mt-12">
//                 <button className="flex items-center justify-center px-6 py-2 text-white transition-all duration-300 bg-white border rounded-lg explore-btn hover:bg-white hover:text-blue-600">
//                     <span className="text-lg font-medium text-[#101C36]">Explore Faculty</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default FacultyHome;

// import React, { useCallback } from "react";
// import Slider from "react-slick";
// import FacultyCard from "./FacultyCard.tsx";
// import { FaArrowRight } from "react-icons/fa";

// // Memoize the faculty data to prevent unnecessary re-renders
// const FACULTIES = [
//   {
//     image: "/assets/faculties/first.svg",
//     label: "Professor, CA",
//     name: "Raghav Goel",
//     bio: "Qualified Chartered Accountant with MBA from Birla Institute of Technology. Specializes in financial accounting and corporate law.",
//     subjects: ["Financial Accounting", "Corporate Law", "Taxation"],
//     rating: 4.9
//   },
//   {
//     image: "/assets/faculties/second.svg",
//     label: "Instructor, ACCA",
//     name: "Amarjit Kaur",
//     bio: "ACCA certified with 10+ years experience teaching Tally & IT software. Expert in practical accounting applications.",
//     subjects: ["Tally", "IT Software", "Practical Accounting"],
//     rating: 4.8
//   },
//   {
//     image: "/assets/faculties/third.svg",
//     label: "Professor",
//     name: "Nitin Bhardwaj",
//     bio: "University topper in Commerce with specialization in Business Law. Known for simplifying complex legal concepts.",
//     subjects: ["Business Law", "Economics", "Commerce"],
//     rating: 4.7
//   }
// ];

// // Duplicate for carousel infinite effect
// const facultiesList = [...FACULTIES, ...FACULTIES];

// const FacultyHome = () => {
//   // Optimized slider settings with better breakpoints
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//     arrows: false, // Using custom arrows for better control
//     centerMode: true,
//     centerPadding: "0",
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2.5,
//           centerMode: true,
//           centerPadding: "40px"
//         }
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1.5,
//           centerMode: true,
//           centerPadding: "60px"
//         }
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 1.2,
//           centerMode: true,
//           centerPadding: "40px"
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           centerMode: true,
//           centerPadding: "30px"
//         }
//       }
//     ]
//   };

//   // Memoize the render function
//   const renderFacultyCard = useCallback((faculty, index) => (
//     <div key={`${faculty.name}-${index}`} className="px-2">
//       <FacultyCard
//         image={faculty.image}
//         label={faculty.label}
//         name={faculty.name}
//         bio={faculty.bio}
//         // subjects={faculty.subjects}
//         // rating={faculty.rating}
//       />
//     </div>
//   ), []);

//   return (
//     <section className="w-full py-12 bg-gradient-to-br from-theme1 to-theme2 sm:py-16 lg:py-20">
//       <div className="container px-4 mx-auto sm:px-6 lg:px-8">
//         {/* Header with optimized spacing */}
//         <div className="max-w-3xl mx-auto mb-10 text-center sm:mb-14 lg:mb-16">
//           <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
//             Guiding You to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Success</span>
//           </h2>
//           <p className="mt-3 text-lg text-gray-200 sm:text-xl sm:mt-4">
//             Learn from industry experts and academic leaders
//           </p>
//         </div>

//         {/* Enhanced slider container with custom dots */}
//         <div className="relative faculty-slider">
//           <Slider {...settings} className="px-2 pb-12 -mx-2">
//             {facultiesList.map(renderFacultyCard)}
//           </Slider>

//           {/* Custom dots styling */}
//           <style jsx global>{`
//             .slick-dots {
//               bottom: 0 !important;
//             }
//             .slick-dots li {
//               margin: 0 4px !important;
//             }
//             .slick-dots li button:before {
//               color: rgba(255,255,255,0.5) !important;
//               font-size: 10px !important;
//               opacity: 1 !important;
//             }
//             .slick-dots li.slick-active button:before {
//               color: white !important;
//             }
//           `}</style>
//         </div>

//         {/* Optimized CTA button */}
//         <div className="flex justify-center mt-8 sm:mt-10">
//           <button className="flex items-center px-6 py-2.5 space-x-2 text-base font-semibold text-white transition-all duration-300 transform bg-red-600 rounded-full sm:px-8 sm:py-3 sm:text-lg hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
//             <span>Explore All Faculty</span>
//             <FaArrowRight className="transition-transform duration-300 hover:translate-x-1" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default React.memo(FacultyHome);

import { motion } from "framer-motion";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft, FaStar } from "react-icons/fa";

const FACULTIES = [
  {
    image: "/assets/faculties/first.svg",
    label: "Professor, CA",
    name: "Raghav Goel",
    bio: "Qualified Chartered Accountant with MBA from Birla Institute of Technology.",
    rating: 4.9
  },
  {
    image: "/assets/faculties/second.svg",
    label: "Instructor, ACCA",
    name: "Amarjit Kaur",
    bio: "ACCA certified with 10+ years experience teaching Tally & IT software.",
    rating: 4.8
  },
  {
    image: "/assets/faculties/third.svg",
    label: "Professor",
    name: "Nitin Bhardwaj",
    bio: "University topper in Commerce with specialization in Business Law.",
    rating: 4.7
  }
];

const FacultyCard = ({ image, label, name, bio, rating }) => (
  <motion.div
    className="h-full mx-2 overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl"
    whileHover={{ y: -10 }}
  >
    {/* Image Section */}
    <div className="relative bg-gray-100 aspect-square">
      <img
        src={image}
        alt={name}
        className="object-cover object-center w-full h-full"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x400?text=Faculty+Image';
          e.target.className = "object-contain p-4 bg-gray-200";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
    </div>

    {/* Details Section */}
    <div className="p-6 space-y-4">
      {/* Label & Rating */}
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 text-sm font-medium text-orange-700 bg-orange-100 rounded-full">
          {label}
        </span>
        <div className="flex items-center space-x-1.5">
          <FaStar className="w-5 h-5 text-yellow-400" />
          <span className="font-semibold text-gray-800">{rating}</span>
        </div>
      </div>

      {/* Name & Bio */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-gray-900 transition-colors hover:text-orange-600">
          {name}
        </h3>
        <p className="leading-relaxed text-gray-700 line-clamp-4">
          {bio}
        </p>
      </div>

      {/* View Profile Button */}
      <button className="w-full py-2.5 text-sm font-medium text-orange-600 hover:text-white rounded-lg bg-orange-50 hover:bg-orange-600 transition-colors duration-300">
        View Full Profile
      </button>
    </div>
  </motion.div>
);

const FacultyHome = () => {

  const CustomArrow = ({ direction, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`absolute top-1/2 -translate-y-1/2 z-20 cursor-pointer p-3 rounded-full bg-white shadow-lg hover:shadow-xl ${direction === 'next' ? '-right-12' : '-left-12'
        }`}
      onClick={onClick}
    >
      {direction === 'next' ? (
        <FaArrowRight className="text-2xl text-gray-700 hover:text-red-600" />
      ) : (
        <FaArrowLeft className="text-2xl text-gray-700 hover:text-red-600" />
      )}
    </motion.div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <CustomArrow direction="next" onClick={undefined} />,
    prevArrow: <CustomArrow direction="prev" onClick={undefined} />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          centerMode: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          arrows: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      }
    ]
  };

  return (
    <section className="w-full min-h-screen py-10 overflow-x-hidden bg-gradient-to-br from-theme1 to-theme2 ">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-red-500/10 blur-3xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: 0
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-white" >
            Guiding You to Excellence
          </h2>
          <p className="mt-6 text-xl text-red-100 sm:text-2xl">
            Learn from industry experts and academic pioneers
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative w-full">
          <Slider {...settings}>
            {FACULTIES.map((faculty, index) => (
              <div key={faculty.name} className="!block h-full">
                <FacultyCard {...faculty} />
              </div>
            ))}
          </Slider>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12 sm:mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-4 mx-auto text-lg font-semibold text-white transition-colors duration-300 bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700 focus:outline-none"
          >
            <a
              href="https://www.coceducation.com/faculties"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Explore All Courses
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FacultyHome;