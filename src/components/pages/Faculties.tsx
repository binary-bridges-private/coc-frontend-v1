import React, { useEffect, useRef, useState } from "react";
import FacultyCard from "../ui/faculty/FacultyCard.tsx";

const Faculties = () => {

  const facultiesList = [
    {
      image: "/assets/faculties/first.svg",
      label: "Professor, CA",
      name: "Raghav Goel",
      bio: "He is a Qualified Chartered Accountant by profession. Associate Chartered Accountant Master of Business Administration from Birla Institute of Technology.",
      about: "Nitin Bhardwaj sir is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. His insights into the subject are intriguing and his hold over BUSINESS LAW and COMPANY LAW is unparalleled. His Story Telling Technique is very famous among the students. He was a university topper in M.COM & B.COM.",
      exp: "He has a vast amount of work experience of more than 14+ years as a Pan India Faculty. Precisely, he has been working with numerous institutes and Educational companies (Pearson ETEN CA, Stargate E-Learning Pvt. Ltd., UNACADEMY)as one of the great and highly regarded faculty. His way of teaching is unbeatable. He had taught a massive crowd in Delhi NCR (Through Live & Face to Face mode)."
    },
    {
      image: "/assets/faculties/second.svg",
      label: "Instructor, ACCA",
      name: "Amarjit Kaur",
      bio: "ACCA, M.com, 3-year Diploma in Computer Applications. 10 Years Experience in teaching Tally & Information technology and other computer software.",
      about: "Nitin Bhardwaj sir is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. His insights into the subject are intriguing and his hold over BUSINESS LAW and COMPANY LAW is unparalleled. His Story Telling Technique is very famous among the students. He was a university topper in M.COM & B.COM.",
      exp: "He has a vast amount of work experience of more than 14+ years as a Pan India Faculty. Precisely, he has been working with numerous institutes and Educational companies (Pearson ETEN CA, Stargate E-Learning Pvt. Ltd., UNACADEMY)as one of the great and highly regarded faculty. His way of teaching is unbeatable. He had taught a massive crowd in Delhi NCR (Through Live & Face to Face mode)."

    },
    {
      image: "/assets/faculties/third.svg",
      label: "Professor",
      name: "Nitin Bhardwaj",
      bio: "He is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. He was a university topper in M.COM & B.COM.",
    },
    {
      image: "/assets/faculties/first.svg",
      label: "Professor, CA",
      name: "Raghav Goel",
      bio: "He is a Qualified Chartered Accountant by profession. Associate Chartered Accountant Master of Business Administration from Birla Institute of Technology.",
      about: "Nitin Bhardwaj sir is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. His insights into the subject are intriguing and his hold over BUSINESS LAW and COMPANY LAW is unparalleled. His Story Telling Technique is very famous among the students. He was a university topper in M.COM & B.COM.",
      exp: "He has a vast amount of work experience of more than 14+ years as a Pan India Faculty. Precisely, he has been working with numerous institutes and Educational companies (Pearson ETEN CA, Stargate E-Learning Pvt. Ltd., UNACADEMY)as one of the great and highly regarded faculty. His way of teaching is unbeatable. He had taught a massive crowd in Delhi NCR (Through Live & Face to Face mode)."

    },
    {
      image: "/assets/faculties/second.svg",
      label: "Instructor, ACCA",
      name: "Amarjit Kaur",
      bio: "ACCA, M.com, 3-year Diploma in Computer Applications. 10 Years Experience in teaching Tally & Information technology and other computer software.",
      about: "Nitin Bhardwaj sir is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. His insights into the subject are intriguing and his hold over BUSINESS LAW and COMPANY LAW is unparalleled. His Story Telling Technique is very famous among the students. He was a university topper in M.COM & B.COM.",
      exp: "He has a vast amount of work experience of more than 14+ years as a Pan India Faculty. Precisely, he has been working with numerous institutes and Educational companies (Pearson ETEN CA, Stargate E-Learning Pvt. Ltd., UNACADEMY)as one of the great and highly regarded faculty. His way of teaching is unbeatable. He had taught a massive crowd in Delhi NCR (Through Live & Face to Face mode)."

    },
    {
      image: "/assets/faculties/third.svg",
      label: "Professor",
      name: "Nitin Bhardwaj",
      bio: "He is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. He was a university topper in M.COM & B.COM.",
      about: "Nitin Bhardwaj sir is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. His insights into the subject are intriguing and his hold over BUSINESS LAW and COMPANY LAW is unparalleled. His Story Telling Technique is very famous among the students. He was a university topper in M.COM & B.COM.",
      exp: "He has a vast amount of work experience of more than 14+ years as a Pan India Faculty. Precisely, he has been working with numerous institutes and Educational companies (Pearson ETEN CA, Stargate E-Learning Pvt. Ltd., UNACADEMY)as one of the great and highly regarded faculty. His way of teaching is unbeatable. He had taught a massive crowd in Delhi NCR (Through Live & Face to Face mode)."

    },
    {
      image: "/assets/faculties/first.svg",
      label: "Professor, CA",
      name: "Raghav Goel",
      bio: "He is a Qualified Chartered Accountant by profession. Associate Chartered Accountant Master of Business Administration from Birla Institute of Technology.",
      about: "Nitin Bhardwaj sir is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. His insights into the subject are intriguing and his hold over BUSINESS LAW and COMPANY LAW is unparalleled. His Story Telling Technique is very famous among the students. He was a university topper in M.COM & B.COM.",
      exp: "He has a vast amount of work experience of more than 14+ years as a Pan India Faculty. Precisely, he has been working with numerous institutes and Educational companies (Pearson ETEN CA, Stargate E-Learning Pvt. Ltd., UNACADEMY)as one of the great and highly regarded faculty. His way of teaching is unbeatable. He had taught a massive crowd in Delhi NCR (Through Live & Face to Face mode)."

    },
    {
      image: "/assets/faculties/second.svg",
      label: "Instructor, ACCA",
      name: "Amarjit Kaur",
      bio: "ACCA, M.com, 3-year Diploma in Computer Applications. 10 Years Experience in teaching Tally & Information technology and other computer software.",
      about: "Nitin Bhardwaj sir is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. His insights into the subject are intriguing and his hold over BUSINESS LAW and COMPANY LAW is unparalleled. His Story Telling Technique is very famous among the students. He was a university topper in M.COM & B.COM.",
      exp: "He has a vast amount of work experience of more than 14+ years as a Pan India Faculty. Precisely, he has been working with numerous institutes and Educational companies (Pearson ETEN CA, Stargate E-Learning Pvt. Ltd., UNACADEMY)as one of the great and highly regarded faculty. His way of teaching is unbeatable. He had taught a massive crowd in Delhi NCR (Through Live & Face to Face mode)."

    },
    {
      image: "/assets/faculties/third.svg",
      label: "Professor",
      name: "Nitin Bhardwaj",
      bio: "He is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. He was a university topper in M.COM & B.COM.",
      about: "Nitin Bhardwaj sir is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. His insights into the subject are intriguing and his hold over BUSINESS LAW and COMPANY LAW is unparalleled. His Story Telling Technique is very famous among the students. He was a university topper in M.COM & B.COM.",
      exp: "He has a vast amount of work experience of more than 14+ years as a Pan India Faculty. Precisely, he has been working with numerous institutes and Educational companies (Pearson ETEN CA, Stargate E-Learning Pvt. Ltd., UNACADEMY)as one of the great and highly regarded faculty. His way of teaching is unbeatable. He had taught a massive crowd in Delhi NCR (Through Live & Face to Face mode)."

    },
  ];

  return (
    <>
      <div>
        <div className="inset-x-0 flex flex-col items-center gap-2 mt-10">
          <h1 className="text-2xl font-bold tracking-wide text-[#101C36] leading-[1.5] max-w-[40%] text-center">
            FACULTIES
          </h1>
          <p className="text-lg font-normal text-[#6A6A6A] leading-[1.55] max-w-[48%] text-center">
            Dedicated, Experienced, and Inspiring – Meet the mentors who make <br></br> learning impactful and success achievable.
          </p>
        </div>
      </div>
      <div className="grid grid-flow-row gap-10 px-10 py-10 auto-rows-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
        {facultiesList.map((ele, index) => (
          <FacultyCard
            key={index}
            image={ele.image}
            label={ele.label}
            name={ele.name}
            bio={ele.bio}
          />
        ))}
      </div>

    </>
  );
};

export default Faculties;