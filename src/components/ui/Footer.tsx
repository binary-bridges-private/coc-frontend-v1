import React from "react";

const Footer = () => {
    return (
        <footer className="flex flex-row justify-between items-start px-18 py-12 w-full bg-white">
            {/* Left Section */}
            <div className="flex flex-col justify-between items-start gap-8 mx-auto w-[520px] h-[496px]">
                <div className="flex flex-col gap-8 w-[516px] h-[496px]">
                    {/* Logo and Address */}
                    <div className="flex flex-col gap-4 w-[495px]">
                        <img
                            src={"logo-wide.png"}
                            alt="COC Logo"
                            className="w-[271px] h-[93px]"
                        />
                        <p className="text-lg font-semibold text-gray-800 leading-[150%]">
                            COC Education Pvt. Ltd. Office No-132 Ithum Tower-B
                            Sector-62, Noida, Uttar Pradesh
                        </p>
                    </div>

                    {/* Contact Sections */}
                    <div className="flex flex-col gap-8 w-[516px]">
                        <ContactSection
                            title="For Purchase Related"
                            description="Call/WhatsApp: 9999631597/8448322142/7303445575/7011668629
          E-mail id: enquiry.coceducation@gmail.com"
                        />
                        <ContactSection
                            title="For Technical Support"
                            description="Call/WhatsApp: 9811455109, 9311281468
          E-mail id: coceducation.technical@gmail.com"
                        />
                        <ContactSection
                            title="For Courier Related Enquiry"
                            description="Call/WhatsApp: 8595539968, 7042664033
          E-mail id: coceducation.logistics@gmail.com"
                        />
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col gap-14 mx-auto w-[612px] h-[448px]">
                <div className="flex flex-row gap-16 w-[612px] h-[448px]">
                    <NavSection
                        title="Important"
                        links={[
                            "Home",
                            "About us",
                            "Video Lectures",
                            "Faculties",
                            "Quiz",
                            "Blogs",
                            "FAQs",
                        ]}
                    />
                </div>
            </div>
        </footer>
    );
};
export default Footer;
const ContactSection = ({ title, description }) => (
    <div className="flex flex-col gap-1 w-[516px]">
        <h3 className="text-lg font-bold text-gray-800 leading-[150%]">
            {title}
        </h3>
        <p className="text-sm font-medium text-gray-600 leading-[160%]">
            {description}
        </p>
    </div>
);
const NavSection = ({ title, links }) => (
    <div className="flex flex-col gap-4 w-[158px]">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <ul className="flex flex-col gap-4">
            {links.map((link, index) => (
                <li key={index} className="text-sm font-medium text-gray-800">
                    {link}
                </li>
            ))}
        </ul>
    </div>
);
