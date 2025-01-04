import React, { useState, useEffect } from "react";
import "./Carousel.css";

const cards = [
    {
        id: 1,
        text: "The course material is well-structured and easy to follow. It helped me understand complex topics with ease.",
        userName: "Alice",
        userRole: "CA Aspirant"
    },
    {
        id: 2,
        text: "The conceptual clarity provided in this course is unmatched. It made the hardest topics so much simpler.",
        userName: "Bob",
        userRole: "CA Final Student"
    },
    {
        id: 3,
        text: "The mentorship program was outstanding. It gave me personalized feedback and tips for improvement.",
        userName: "Charlie",
        userRole: "CA Intermediate Student"
    },
    {
        id: 4,
        text: "The comprehensive study notes and revision material were a lifesaver during exam prep. Thank you!",
        userName: "Emma",
        userRole: "CA Foundation Student"
    },
    {
        id: 5,
        text: "I passed my CA Intermediate exams on the first attempt, thanks to the excellent guidance from this course.",
        userName: "Jack",
        userRole: "CA Intermediate Student"
    }
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
        <div className="carousel w-full flex justify-center">
            {cards.map((card, index) => {
                const position = getPosition(index);

                return (
                    <div key={card.id} className={`card ${position}`}>
                        <div className="h-full w-full flex flex-col items-start justify-evenly p-6 shadow-xl rounded-xl ">
                            <div className="w-16 h-16 rounded-full mb-4">
                                <img src={"star-icon.svg"} alt="Star Icon" />
                            </div>
                            <p className={`text-lg mb-4 ${position === "center" && "text-white "}  ${position !== "center" && "text-black "}`}>{card.text}</p>
                            <div className="flex gap-4 items-center">
                                <div className="w-16 h-16 rounded-full bg-gray-300">
                                    <img src="https://avatar.iran.liara.run/public" />
                                </div>
                                <div className="flex flex-col">
                                    <span className={` ${position === "center" && "text-white"} ${position !== "center" && "text-black"} font-bold`}>{card.userName}</span>
                                    <span className="text-gray-400 text-sm">{card.userRole}</span>
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
