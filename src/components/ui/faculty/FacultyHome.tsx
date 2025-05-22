import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft, FaStar } from "react-icons/fa";

const FACULTIES = [
  {
    image: "/assets/faculties/first.svg",
    label: "Professor, CA",
    name: "Raghav Goel",
    bio: "Qualified Chartered Accountant with MBA from Birla Institute of Technology. Specializes in financial accounting and corporate law.",
    rating: 4.9,
    subjects: ["Financial Accounting", "Corporate Law", "Taxation"],
    link: "https://www.coceducation.com/faculty/ca-raghav-goel"
  },
  {
    image: "/assets/faculties/second.svg",
    label: "Instructor, ACCA",
    name: "Amarjit Kaur",
    bio: "ACCA certified with 10+ years experience teaching Tally & IT software. Expert in practical accounting applications.",
    rating: 4.8,
    subjects: ["Tally", "IT Software", "Practical Accounting"],
    link: "https://www.coceducation.com/faculty/ca-acca--amarjit-kaur"
  },
  {
    image: "/assets/faculties/third.svg",
    label: "Professor",
    name: "Nitin Bhardwaj",
    bio: "University topper in Commerce with specialization in Business Law. Known for simplifying complex legal concepts.",
    rating: 4.7,
    subjects: ["Business Law", "Economics", "Commerce"],
    link: "https://www.coceducation.com/faculty/professor-nitin-bhardwaj"
  }
];

const FacultyCard = ({ image, label, name, bio, rating, subjects, link }) => (
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
          const target = e.target as HTMLImageElement;
          target.src = 'https://via.placeholder.com/400x400?text=Faculty+Image';
          target.className = "object-contain p-4 bg-gray-200";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
    </div>

    {/* Details Section */}
    <div className="flex flex-col justify-center items-center p-2 py-4 space-y-4">
      {/* Label & Rating */}
      <div className="flex items-center px-2 w-full justify-between">
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
        <p className="leading-relaxed text-gray-700 line-clamp-3">
          {bio}
        </p>
      </div>

      {/* Subjects */}
      <div className="flex flex-wrap gap-2" aria-label="Expertise areas">
        {subjects.map((subject, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "rgb(249 115 22 / 0.2)",
              color: "rgb(194 65 12)"
            }}
            className="px-3 py-1 text-sm font-medium bg-orange-50 text-orange-600 rounded-full cursor-default shadow-sm transition-all"
            title={`Expertise in ${subject}`}
          >
            {subject}
          </motion.span>
        ))}
      </div>

      {/* View Profile Button */}
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button className="w-full px-2 py-2.5 text-sm font-medium text-orange-600 hover:text-white rounded-lg bg-orange-50 hover:bg-orange-600 transition-colors duration-300">
          View Full Profile
        </button>
      </a>
    </div>
  </motion.div>
);

const FacultyHome = () => {
  const CustomArrow = ({ direction, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`absolute top-1/2 -translate-y-1/2 z-20 cursor-pointer p-3 rounded-full bg-white shadow-lg hover:shadow-xl ${
        direction === 'next' ? '-right-12' : '-left-12'
      }`}
      onClick={onClick}
    >
      {direction === 'next' ? (
        <FaArrowRight className="text-2xl text-gray-700 hover:text-orange-600" />
      ) : (
        <FaArrowLeft className="text-2xl text-gray-700 hover:text-orange-600" />
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
    <section className="relative w-full py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-orange-500/10 blur-3xl"
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20"
          >
            <span className="text-orange-400 font-medium">Our Expert Faculty</span>
          </motion.div>

          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Guiding You to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Excellence</span>
          </h2>
          <p className="mt-6 text-xl text-orange-100 sm:text-2xl">
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
              Explore ALL Faculties
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