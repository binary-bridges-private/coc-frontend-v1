import React, { useState, useEffect } from "react";
import "./Carousel.css";

const cards = [
    {
        id: 1,
        text: "Taken CFM module classes and it was a great experience and quality learning. The course helps with providing necessary knowledge and practical skills regarding real life work. Even for the candidates who are already working, the course helps adding on new bits of skills and boosts confidence.",
        userName: "Ujwal Sharma",
        userRole: "CA Aspirant"
    },
    {
        id: 2,
        text: "It is a great experience to join COC Education as I’ve enrolled for CFM course. I’ve gained so much practical knowledge from CFM Course. It really helpful for personal and professional growth.",
        userName: "Dhara Patel",
        userRole: "CA Final Student"
    },
    {
        id: 3,
        text: "I would like to express my sincere gratitude for offering the Certified Financial Management (CFM) course through digital media platforms. This initiative is truly commendable, providing valuable learning opportunities in finance-related subjects from the comfort of one's own home.",
        userName: "Siddique Mohd Shahjan",
        userRole: "CA Intermediate Student"
    },
    {
        id: 4,
        text: "According to me CFM is outstanding skill training course with a affordable price till now because it is the combination of various subject like Ms Office , Tally, stock market, Tax return and many others , in a word, all skills under one roof which is required for selection in corporate . Thank you Amarjeet Ma'am, Raghav Sir for such great effort.",
        userName: "SK Khan",
        userRole: "CA Foundation Student"
    },
    // {
    //     id: 5,
    //     text: "I passed my CA Intermediate exams on the first attempt, thanks to the excellent guidance from this course.",
    //     userName: "Jack",
    //     userRole: "CA Intermediate Student"
    // }
];


const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
        }, 3000); // Change card every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const getPosition = (index) => {
        const diff = (index - currentIndex + cards.length) % cards.length;

        if (diff === 0) return "center";
        if (diff === 1) return "right";
        if (diff === cards.length - 1) return "left";
        return "sides";
    };

    return (
        <div className="flex justify-center w-full carousel">
            {cards.map((card, index) => {
                const position = getPosition(index);

                return (
                    <div key={card.id} className={`card ${position}`}>
                        <div className="flex flex-col items-start w-full h-full p-6 shadow-xl justify-evenly rounded-xl">
                            <div className="w-16 h-16 mb-4 rounded-full">
                                <img src={"star-icon.svg"} alt="Star Icon" />
                            </div>
                            <p className={`text-n mb-4 ${position === "center" && "text-white "}  ${position !== "center" && "text-black "}`}>{card.text}</p>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-300 rounded-full">
                                    <img src="https://avatar.iran.liara.run/public" />
                                </div>
                                <div className="flex flex-col">
                                    <span className={` ${position === "center" && "text-white"} ${position !== "center" && "text-black"} font-bold`}>{card.userName}</span>
                                    <span className="text-white text-n2">{card.userRole}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Carousel;
