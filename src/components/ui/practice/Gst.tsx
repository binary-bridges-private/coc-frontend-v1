import { useNavigate } from "react-router-dom";

const Gst = () => {
    const navigate = useNavigate();
    const gstOptions = [
        { name: "Registration", slug: "registration" },
        { name: "GSTR-1", slug: "gstr-1" },
        { name: "GSTR-2A", slug: "gstr-2a" },
        { name: "GSTR-2B", slug: "gstr-2b" },
        { name: "GSTR-3B", slug: "gstr-3b" },
        { name: "GSTR-4", slug: "gstr-4" },
        { name: "GSTR-9", slug: "gstr-9" },
        { name: "GSTR-9C", slug: "gstr-9c" },
        { name: "GSTR-10", slug: "gstr-10" },
        { name: "EWAY BILL", slug: "eway-bill" },
        { name: "E INVOICE", slug: "e-invoice" },
    ];

    return (
        <div className="flex flex-col items-center px-10 py-20">
            {/* Hero Section */}
            <div className="w-full py-10 hero">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">GST Services</h1>
                    <p className="mt-2 text-lg">Select a service to proceed</p>
                </div>
            </div>

            {/* Options Section */}
            <div className="flex flex-wrap justify-center gap-3">
                {gstOptions.map((option, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-between p-5 mb-4 bg-white border border-gray-300 shadow-xl rounded-xl w-[250px]"
                    >
                        <span className="text-lg font-semibold text-gray-700">{option.name}</span>
                        <button onClick={() => navigate(`/practice/gst/${option.slug}`)} className="flex items-center m-5 text-gray-700 bg-white border border-gray-400 btn hover:bg-gray-100">
                            Select <span className="ml-2">→</span>
                        </button>
                    </div>
                ))}
            </div>

            {/* Back Button */}
            <button onClick={() => navigate("/practice")} className="mt-6 btn btn-outline">
                ⬅ Back to Services
            </button>
        </div>
    );
};

export default Gst;
