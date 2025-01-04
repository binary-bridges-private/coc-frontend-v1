import React from "react";
import EnquiryForm from "./EnquiryForm.tsx";

const EnquiryAndUpdates = () => {
    return (
        <div className="w-full h-[664px] grid grid-cols-3">
            <div
                className="h-full col-span-2 bg-cover bg-center opacity-70"
                style={{
                    backgroundImage: "url('woman-working-in-office.jpg')",
                }}
            >
                {/* Content goes here */}
            </div>
            <div className="h-full col-span-1">
                <EnquiryForm />
            </div>
        </div>
    );
};

export default EnquiryAndUpdates;
