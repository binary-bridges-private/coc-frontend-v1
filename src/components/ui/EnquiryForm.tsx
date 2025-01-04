import React from "react";
import "daisyui/dist/full.css";
import useForms from "../../hooks/useForms.ts";

// Validation functions
const validationRules = {
    fullName: (value) => (!value ? "Full name is required" : ""),
    email: (value) =>
        !value
            ? "Email is required"
            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? "Invalid email address"
            : "",
    phone: (value) =>
        !value
            ? "Phone number is required"
            : !/^\+91\d{10}$/.test(value)
            ? "Phone number must include +91 prefix and 10 digits"
            : "",
    message: (value) => (!value ? "Message is required" : ""),
};

export default function EnquiryForm() {
    const { formData, errors, handleChange, handleBlur, isValid } = useForms(
        { fullName: "", email: "", phone: "", message: "" },
        validationRules
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid()) {
            alert("Form submitted successfully!");
            console.log(formData);
        }
    };

    return (
        <div className="flex justify-center items-center h-full w-full bg-white">
            <form
                onSubmit={handleSubmit}
                className="flex justify-center items-center flex-col rounded w-5/6 h-full  mt-8 text-center text-[#0A0A0A]"
            >
                <h1 className="text-2xl font-bold text-center ">Enquire Now</h1>
                <p className="mb-3  text-center">
                    Please fill the form below for any enquiry!
                </p>

                <div className="form-control mb-4 w-full">
                    <label className="label">
                        <span className="text-[#041B2D]">Full Name*</span>
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        className={`bg-gray-100 flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none text-black ${
                            errors.fullName ? "input-error" : ""
                        }`}
                        placeholder="Enter your full name"
                        required={true}
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>

                {/* Email Address */}
                <div className="form-control mb-4 w-full">
                    <label className="label">
                        <span className="text-[#041B2D]">Email Address*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        className={`bg-gray-100 flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none text-black ${
                            errors.email ? "input-error" : ""
                        }`}
                        placeholder="Enter your email address"
                        required={true}
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>

                {/* Phone Number */}
                <div className="form-control mb-4 w-full">
                    <label className="label">
                        <span className="text-[#041B2D]">
                            Phone Number (+91)*
                        </span>
                    </label>
                    <input
                        type="text"
                        name="phone"
                        className={`bg-gray-100 flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none text-black ${
                            errors.phone ? "input-error" : ""
                        }`}
                        placeholder="+919876543210"
                        required={true}
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>

                {/* Message */}
                <div className="form-control mb-4 w-full">
                    <label className="label">
                        <span className="text-[#041B2D]">Message*</span>
                    </label>
                    <textarea
                        name="message"
                        className={`resize-none bg-gray-100 flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none text-black ${
                            errors.message ? "textarea-error" : ""
                        }`}
                        placeholder="Enter your message/query here.."
                        required={true}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ minHeight: "100px", maxHeight: "200px" }}
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="form-control mt-6 w-full ">
                    <button type="submit" className="btn btn-[#041B2D] ">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
