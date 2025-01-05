import React from "react";
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
        <div className="flex items-center justify-center w-full h-full bg-[#FFFFFF]">
            <form
                onSubmit={handleSubmit}
                className="flex justify-center items-center flex-col rounded w-5/6 h-full  mt-6 text-center text-[#0A0A0A] py-5"
            >
                <h1 className="font-bold text-center lg:text-pl md:text-pm text-ps ">Enquire Now</h1>
                <p className="mb-3 text-center text-n">
                    Please fill the form below for any enquiry!
                </p>

                <div className="w-full mb-2 form-control">
                    <label className="label">
                        <span className="text-[#041B2D] text-n2">Full Name<span className="text-error">*</span></span>
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        className={`flex-1 px-4 py-2 rounded-lg border-2 focus:outline-none text-black ${
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
                <div className="w-full mb-2 form-control">
                    <label className="label">
                        <span className="text-[#041B2D] text-n2">Email Address<span className="text-error">*</span></span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        className={` flex-1 px-4 py-2 rounded-lg border-2 focus:outline-none text-black ${
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
                <div className="w-full mb-2 form-control">
                    <label className="label">
                        <span className="text-[#041B2D] text-n2">
                            Phone Number (+91)<span className="text-error">*</span>
                        </span>
                    </label>
                    <input
                        type="text"
                        name="phone"
                        className={`flex-1 px-4 py-2 rounded-lg border-2 focus:outline-none text-black ${
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
                <div className="w-full mb-4 form-control">
                    <label className="label">
                        <span className="text-[#041B2D] text-n2">Message<span className="text-error">*</span></span>
                    </label>
                    <textarea
                        name="message"
                        className={`resize-none flex-1 px-4 py-2 rounded-lg border-2 focus:outline-none text-black ${
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
                <div className="w-full form-control ">
                    <button type="submit" className="btn bg-[#041B2D] text-white">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
