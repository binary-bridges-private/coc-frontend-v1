import { motion } from 'framer-motion';
import React from 'react';

const faculties = [
    {
        id: 1,
        name: "Amarjeet Ma'am",
        role: "CFM Course Director",
        image: "/assets/faculties/amarjeet.jpg",
        expertise: ["Financial Management", "Corporate Finance", "Investment Analysis"],
        description: "With over 15 years of experience in financial education, Amarjeet Ma'am has helped thousands of students achieve their career goals.",
        social: {
            linkedin: "https://linkedin.com/in/amarjeet",
            twitter: "https://twitter.com/amarjeet"
        }
    },
    {
        id: 2,
        name: "Raghav Sir",
        role: "Technical Director",
        image: "/assets/faculties/raghav.jpg",
        expertise: ["Tally", "MS Office", "Tax Returns"],
        description: "Expert in technical training with a focus on practical implementation of financial software and tools.",
        social: {
            linkedin: "https://linkedin.com/in/raghav",
            twitter: "https://twitter.com/raghav"
        }
    },
    {
        id: 3,
        name: "Priya Ma'am",
        role: "Academic Coordinator",
        image: "/assets/faculties/priya.jpg",
        expertise: ["Financial Accounting", "Cost Management", "Auditing"],
        description: "Specializes in making complex accounting concepts easy to understand for students at all levels.",
        social: {
            linkedin: "https://linkedin.com/in/priya",
            twitter: "https://twitter.com/priya"
        }
    }
];

const FacultyCard = ({ faculty, index }: { faculty: typeof faculties[0], index: number }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="relative h-full bg-white rounded-2xl shadow-lg overflow-hidden"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
            >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/20"
                        animate={{ opacity: isHovered ? 0.8 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    <img
                        src={faculty.image}
                        alt={faculty.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{faculty.name}</h3>
                    <p className="text-orange-600 font-medium mb-4">{faculty.role}</p>
                    
                    <p className="text-gray-600 mb-4">{faculty.description}</p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {faculty.expertise.map((skill, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 text-sm bg-orange-50 text-orange-600 rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* Social Links */}
                    <motion.div
                        className="flex gap-4"
                        animate={{ opacity: isHovered ? 1 : 0.7 }}
                    >
                        <a
                            href={faculty.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-orange-600 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </a>
                        <a
                            href={faculty.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-orange-600 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Faculties = () => {
    return (
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
            </div>

            <div className="relative container px-4 mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20"
                    >
                        <span className="text-orange-600 font-medium">Our Expert Faculty</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Learn from Industry Experts
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
                        Our faculty members bring years of industry experience and academic excellence to help you succeed in your career.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {faculties.map((faculty, index) => (
                        <FacultyCard key={faculty.id} faculty={faculty} index={index} />
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
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
                            Join Our Classes
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

export default Faculties; 