// import React from "react";
// import EnquiryForm from "./EnquiryForm.tsx";
// import {
//     FaFacebook,
//     FaInstagram,
//     FaTelegram,
//     FaWhatsapp,
//     FaYoutube,
// } from "react-icons/fa";

// const EnquirySection = () => {
//     return (
//         <div
//             className="relative w-full h-[70vh] opacity-90"
//         >
//             <div className="w-[80%] flex h-full mx-auto">
//                 <div className="w-[50%] h-full flex flex-col justify-center">
//                     <h1 className="mb-4 text-6xl font-bold text-gray-600">
//                         COC <span className="text-pink-600">Education</span>
//                     </h1>
//                     <p className="text-4xl text-gray-600">
//                         Empowering minds through innovative <br/> learning solutions for a brighter future.
//                     </p>
//                     <button className="px-6 py-3 mt-8 text-white transition-all bg-pink-600 rounded-lg w-fit hover:shadow-lg">
//                         Explore Courses
//                     </button>
//                 </div>
//                 <img className="w-[50%] h-auto object-cover" src="./homeRight.jpg" alt="Education illustration" />
//             </div>

//             <div className="absolute top-0 flex-col justify-center hidden h-full gap-8 md:flex">
//                 <div className="group ml-1 relative h-12 w-12 bg-[#FF0000] rounded-lg flex justify-center items-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FF0000]/30">
//                     <FaYoutube className="text-3xl text-white" />
//                     <span className="absolute px-2 py-1 ml-2 text-xs text-white transition-opacity bg-black rounded opacity-0 left-full group-hover:opacity-100 whitespace-nowrap">
//                         YouTube
//                     </span>
//                 </div>

//                 <div className="group ml-1 relative h-12 w-12 bg-[#1877F2] rounded-lg flex justify-center items-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#1877F2]/30">
//                     <FaFacebook className="text-3xl text-white" />
//                     <span className="absolute px-2 py-1 ml-2 text-xs text-white transition-opacity bg-black rounded opacity-0 left-full group-hover:opacity-100 whitespace-nowrap">
//                         Facebook
//                     </span>
//                 </div>

//                 <div className="group ml-1 relative h-12 w-12 bg-[#25D366] rounded-lg flex justify-center items-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#25D366]/30">
//                     <FaWhatsapp className="text-3xl text-white" />
//                     <span className="absolute px-2 py-1 ml-2 text-xs text-white transition-opacity bg-black rounded opacity-0 left-full group-hover:opacity-100 whitespace-nowrap">
//                         WhatsApp
//                     </span>
//                 </div>

//                 <div className="group ml-1 relative h-12 w-12 bg-[#0088CC] rounded-lg flex justify-center items-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#0088CC]/30">
//                     <FaTelegram className="text-3xl text-white" />
//                     <span className="absolute px-2 py-1 ml-2 text-xs text-white transition-opacity bg-black rounded opacity-0 left-full group-hover:opacity-100 whitespace-nowrap">
//                         Telegram
//                     </span>
//                 </div>

//                 <div className="group ml-1 relative h-12 w-12 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] rounded-lg flex justify-center items-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#DD2A7B]/30">
//                     <FaInstagram className="text-3xl text-white" />
//                     <span className="absolute px-2 py-1 ml-2 text-xs text-white transition-opacity bg-black rounded opacity-0 left-full group-hover:opacity-100 whitespace-nowrap">
//                         Instagram
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EnquirySection;


import React from "react";
import { motion } from "framer-motion";
import EnquiryForm from "./EnquiryForm.tsx";
import {
    FaFacebook,
    FaInstagram,
    FaTelegram,
    FaWhatsapp,
    FaYoutube,
} from "react-icons/fa";

const EnquirySection = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeOut"
            }
        }
    };

    const socialVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: (i: number) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: 1 + i * 0.1,
                duration: 1,
                type: "spring",
                stiffness: 100
            }
        })
    };

    return (
        <motion.div
            className="relative w-full h-[70vh] opacity-90 my-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="w-[80%] flex h-full mx-auto">
                <motion.div
                    className="w-[50%] h-full flex flex-col justify-center"
                    variants={containerVariants}
                >
                    <motion.h1
                        className="mb-4 text-6xl font-bold text-gray-600"
                        variants={itemVariants}
                    >
                        COC <span className="text-pink-600">Education</span>
                    </motion.h1>
                    <motion.p
                        className="text-4xl text-gray-600"
                        variants={itemVariants}
                    >
                        Empowering minds through innovative <br /> learning solutions for a brighter future.
                    </motion.p>
                    <motion.button
                        className="px-6 py-3 mt-8 text-white transition-all bg-pink-600 rounded-lg w-fit hover:shadow-lg"
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a href="https://www.coceducation.com/new-course/skill-courses" target="_blank" rel="noopener noreferrer">
                            Explore our Courses
                        </a>

                    </motion.button>
                </motion.div>

                <motion.img
                    className="w-[50%] h-auto object-cover"
                    src="./homeRight.jpg"
                    alt="Education illustration"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                />
            </div>

            <motion.div
                className="absolute top-0 flex-col justify-center hidden h-full gap-8 md:flex"
                initial="hidden"
                animate="visible"
            >
                {[
                    { icon: <FaYoutube className="text-3xl text-white" />, color: "#FF0000", name: "YouTube", link: "https://youtube.com/@cfmcoceducation?si=vhRbpsOvVbrh1k5Y" },
                    { icon: <FaFacebook className="text-3xl text-white" />, color: "#1877F2", name: "Facebook", link: "https://www.facebook.com/share/1ATktFboCS/" },
                    { icon: <FaWhatsapp className="text-3xl text-white" />, color: "#25D366", name: "WhatsApp", link: "http://whatsapp.coceducation.com/" },
                    { icon: <FaTelegram className="text-3xl text-white" />, color: "#0088CC", name: "Telegram", link: "https://t.me/cfmbycoceducation" },
                    { icon: <FaInstagram className="text-3xl text-white" />, color: "from-[#F58529] via-[#DD2A7B] to-[#8134AF]", name: "Instagram", link: "https://www.instagram.com/cfmcoceducation?igsh=MTN2OXF3Z2ZsdzRnMw==" }
                ].map((social, index) => (
                    <motion.div
                        key={index}
                        className="relative flex items-center justify-center w-12 h-12 ml-1 rounded-lg group"
                        style={{
                            backgroundColor: social.color.includes("from") ? undefined : social.color,
                            backgroundImage: social.color.includes("from") ? `linear-gradient(to bottom right, ${social.color.replace(/from-|via-|to-|\[|\]/g, "").split(" ").join(", ")})` : undefined
                        }}
                        custom={index}
                        variants={socialVariants}
                        whileHover={{
                            scale: 1.1,
                            boxShadow: `0 5px 15px ${social.color}50`
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a href={social.link} target="_">
                            {social.icon}
                            <span className="absolute px-2 py-1 ml-2 text-xs text-white transition-opacity bg-black rounded opacity-0 left-full group-hover:opacity-100 whitespace-nowrap">
                                {social.name}
                            </span>
                        </a>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default EnquirySection;