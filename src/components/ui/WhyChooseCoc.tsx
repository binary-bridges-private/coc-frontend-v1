import { motion } from 'framer-motion';
import React from 'react';

const WhyChooseCOC = () => {
    const features = [
        {
            title: 'Studio Recorded Sessions',
            icon: '/assets/whyChooseCoc/first.svg',
            description: 'High-quality HD recordings with professional production values for optimal learning',
            gradient: 'from-blue-500 to-blue-600'
        },
        {
            title: 'Excellent Supportive Team',
            icon: '/assets/whyChooseCoc/second.svg',
            description: '24/7 dedicated support team ready to assist with any queries or technical issues',
            gradient: 'from-purple-500 to-purple-600'
        },
        {
            title: 'Academic Instructor Team',
            icon: '/assets/whyChooseCoc/third.svg',
            description: 'Learn from industry experts and certified professionals with years of experience',
            gradient: 'from-amber-500 to-amber-600'
        },
        {
            title: 'Material Covering all MTR/RTP',
            icon: '/assets/whyChooseCoc/fourth.svg',
            description: 'Comprehensive study materials aligned with exam patterns and syllabus',
            gradient: 'from-green-500 to-green-600'
        },
        {
            title: 'Daily Doubt Sessions',
            icon: '/assets/whyChooseCoc/fifth.svg',
            description: 'Regular interactive sessions to clarify concepts and strengthen understanding',
            gradient: 'from-red-500 to-red-600'
        },
        {
            title: 'Unlimited Views Available',
            icon: '/assets/whyChooseCoc/sixth.svg',
            description: 'Watch lectures as many times as you need with lifetime access to course content',
            gradient: 'from-indigo-500 to-indigo-600'
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
        <section className="relative w-full py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
            </div>

            <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20"
                    >
                        <span className="text-orange-400 font-medium">Our Unique Features</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Why Choose <span className="text-orange-400">COC Education</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-300 md:text-xl">
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
                            className="group"
                        >
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="relative h-full p-8 transition-all duration-300 bg-white rounded-2xl hover:shadow-2xl"
                            >
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient}`}></div>
                                <div className="flex items-center mb-6">
                                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient}`}>
                                        <img
                                            src={feature.icon}
                                            className="w-12 h-12"
                                            alt={feature.title}
                                        />
                                    </div>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
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
                        className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                    >
                        <a href="https://www.coceducation.com/new-course/skill-courses" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                            Start Learning Today
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
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

export default WhyChooseCOC;