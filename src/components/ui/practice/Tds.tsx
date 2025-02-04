import { useNavigate } from "react-router-dom";

const Tds = () => {
    const navigate = useNavigate();
    const tdsOptions = [
        { name: "Registration", slug: "registration" },
        { name: "PAY TDS", slug: "pay-tds" },
        { name: "TDS RETURN", slug: "tds-return" },
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
                {tdsOptions.map((option, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-between p-5 mb-4 bg-white border border-gray-300 shadow-xl rounded-xl w-[250px]"
                    >
                        <span className="text-lg font-semibold text-gray-700">{option.name}</span>
                        <button onClick={() => navigate(`/${option.slug}`)} className="flex items-center m-5 text-gray-700 bg-white border border-gray-400 btn hover:bg-gray-100">
                            Select <span className="ml-2">→</span>
                        </button>
                    </div>
                ))}
            </div>

            <button onClick={() => navigate("/practice")} className="mt-6 btn btn-outline">
                ⬅ Back to Services
            </button>
        </div>
    );
};

export default Tds;
