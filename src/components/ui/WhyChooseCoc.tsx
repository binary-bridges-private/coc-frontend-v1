// import React from 'react';

// const WhyChooseCOC = () => {
//     const features = [
//         {
//             title: 'Studio Recorded Sessions',
//             icon: '/assets/whyChooseCoc/first.svg',
//             description: 'High-quality HD recordings with professional production values for optimal learning',
//             accentColor: 'bg-blue-100'
//         },
//         {
//             title: 'Excellent Supportive Team',
//             icon: '/assets/whyChooseCoc/second.svg',
//             description: '24/7 dedicated support team ready to assist with any queries or technical issues',
//             accentColor: 'bg-purple-100'
//         },
//         {
//             title: 'Academic Instructor Team',
//             icon: '/assets/whyChooseCoc/third.svg',
//             description: 'Learn from industry experts and certified professionals with years of experience',
//             accentColor: 'bg-amber-100'
//         },
//         {
//             title: 'Material Covering all MTR/RTP',
//             icon: '/assets/whyChooseCoc/fourth.svg',
//             description: 'Comprehensive study materials aligned with exam patterns and syllabus',
//             accentColor: 'bg-green-100'
//         },
//         {
//             title: 'Daily Doubt Sessions',
//             icon: '/assets/whyChooseCoc/fifth.svg',
//             description: 'Regular interactive sessions to clarify concepts and strengthen understanding',
//             accentColor: 'bg-red-100'
//         },
//         {
//             title: 'Unlimited Views Available',
//             icon: '/assets/whyChooseCoc/sixth.svg',
//             description: 'Watch lectures as many times as you need with lifetime access to course content',
//             accentColor: 'bg-indigo-100'
//         },
//     ];

//     return (
//         <section className="relative w-full py-10 overflow-hidden bg-gradient-to-br from-theme1 to-theme2">
//             {/* Decorative elements */}
//             <div className="absolute top-0 left-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10"></div>
//             <div className="absolute bottom-0 right-0 w-64 h-64 translate-x-1/2 translate-y-1/2 rounded-full bg-white/10"></div>

//             <div className="relative px-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
//                 <div className="text-center">
//                     <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
//                         Why Choose <span className="text-yellow-300">COC Education</span>
//                     </h2>
//                     <p className="max-w-2xl mx-auto mt-4 text-lg text-white/90 md:text-xl">
//                         Discover the premium learning experience that sets us apart from the rest
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3">
//                     {features.map((feature, index) => (
//                         <div
//                             key={index}
//                             className="relative overflow-hidden transition-all duration-300 transform bg-white rounded-xl hover:shadow-2xl hover:-translate-y-2 group"
//                         >
//                             <div className={`absolute top-0 left-0 w-full h-1 ${feature.accentColor}`}></div>
//                             <div className="p-8">
//                                 <div className="flex items-center mb-6">
//                                     <div className={`p-3 rounded-lg ${feature.accentColor}`}>
//                                         <img
//                                             src={feature.icon}
//                                             className="w-12 h-12"
//                                             alt={feature.title}
//                                         />
//                                     </div>
//                                 </div>
//                                 <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
//                                 <p className="text-gray-600">{feature.description}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Floating CTA */}
//                 <div className="mt-16 text-center">
//                     <button className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
//                         <a href="https://www.coceducation.com/new-course/skill-courses" target="_blank" rel="noopener noreferrer">
//                             Start Learning Today
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="inline-block w-5 h-5 ml-2"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                             >
//                                 <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                             </svg>
//                         </a>
//                     </button>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default WhyChooseCOC;


import { motion } from 'framer-motion';
import React from 'react';

const WhyChooseCOC = () => {
    const features = [
        {
            title: 'Studio Recorded Sessions',
            icon: '/assets/whyChooseCoc/first.svg',
            description: 'High-quality HD recordings with professional production values for optimal learning',
            accentColor: 'bg-blue-300'
        },
        {
            title: 'Excellent Supportive Team',
            icon: '/assets/whyChooseCoc/second.svg',
            description: '24/7 dedicated support team ready to assist with any queries or technical issues',
            accentColor: 'bg-purple-300'
        },
        {
            title: 'Academic Instructor Team',
            icon: '/assets/whyChooseCoc/third.svg',
            description: 'Learn from industry experts and certified professionals with years of experience',
            accentColor: 'bg-amber-300'
        },
        {
            title: 'Material Covering all MTR/RTP',
            icon: '/assets/whyChooseCoc/fourth.svg',
            description: 'Comprehensive study materials aligned with exam patterns and syllabus',
            accentColor: 'bg-green-300'
        },
        {
            title: 'Daily Doubt Sessions',
            icon: '/assets/whyChooseCoc/fifth.svg',
            description: 'Regular interactive sessions to clarify concepts and strengthen understanding',
            accentColor: 'bg-red-300'
        },
        {
            title: 'Unlimited Views Available',
            icon: '/assets/whyChooseCoc/sixth.svg',
            description: 'Watch lectures as many times as you need with lifetime access to course content',
            accentColor: 'bg-indigo-300'
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="relative w-full py-10 overflow-hidden bg-gradient-to-br from-theme1 to-theme2">
            {/* Animated background elements */}
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 opacity-10"
            >
                <div className="absolute w-64 h-64 bg-orange-400 rounded-full -top-32 -left-32 mix-blend-multiply blur-3xl"></div>
                <div className="absolute rounded-full w-96 h-96 bg-amber-400 -bottom-48 -right-48 mix-blend-multiply blur-3xl"></div>
                <div className="absolute w-64 h-64 bg-orange-400 rounded-full -top-42 -left-22 mix-blend-multiply blur-3xl"></div>
                <div className="absolute rounded-full w-96 h-96 bg-amber-400 -bottom-38 -right-28 mix-blend-multiply blur-3xl"></div>
                <div className="absolute w-64 h-64 bg-orange-400 rounded-full -top-22 -left-27 mix-blend-multiply blur-3xl"></div>
                <div className="absolute rounded-full w-96 h-96 bg-amber-400 -bottom-38 -right-31 mix-blend-multiply blur-3xl"></div>
            </motion.div>

            

            <div className="relative px-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-bold text-white">
                        Why Choose COC Education
                    </h2>
                    <p className="max-w-2xl mx-auto mt-4 text-lg text-orange-50 md:text-xl">
                        Discover the premium learning experience that sets us apart from the rest
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="relative overflow-hidden group"
                        >
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="h-full transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl"
                            >
                                <div className={`absolute top-0 left-0 w-full h-1 ${feature.accentColor}`}></div>
                                <div className="p-8">
                                    <div className="flex items-center mb-6">
                                        <div className={`p-3 rounded-lg ${feature.accentColor}`}>
                                            <img
                                                src={feature.icon}
                                                className="w-12 h-12"
                                                alt={feature.title}
                                            />
                                        </div>
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Animated CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-8 py-4 mx-auto text-lg font-semibold text-white transition-colors duration-300 bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700 focus:outline-none"
                    >
                        <a 
                            href="https://www.coceducation.com/new-course/skill-courses" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center"
                        >
                            Start Learning Today
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

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: 0 }}
                    animate={{ y: [0, -20, 0] }}
                    transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute w-2 h-2 rounded-full bg-white/50"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                />
            ))}
        </section>
    );
};

export default WhyChooseCOC;