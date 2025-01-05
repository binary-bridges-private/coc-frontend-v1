import React from 'react';

const WhyChooseCOC = () => {
    const features = [
        {
            title: 'Studio Recorded Sessions',
            icon: '/assets/whyChooseCoc/first.svg',
        },
        {
            title: 'Excellent Supportive Team',
            icon: '/assets/whyChooseCoc/second.svg',
        },
        {
            title: 'Academic Instructor Team',
            icon: '/assets/whyChooseCoc/third.svg',
        },
        {
            title: 'Material Covering all MTR/RTP',
            icon: '/assets/whyChooseCoc/fourth.svg',
        },
        {
            title: 'Daily Doubt Sessions',
            icon: '/assets/whyChooseCoc/fifth.svg',
        },
        {
            title: 'Unlimited Views Available',
            icon: '/assets/whyChooseCoc/sixth.svg',
        },
    ];

    return (
        <div className="bg-[#101C36] h-full w-full text-white py-20 px-10">
            <div className="mx-auto mb-10 text-center max-w-7xl">
                <h1 className="mb-4 text-4xl font-bold">Why choose classes from COC Education</h1>
                <p className="text-large">Explore the benefits of learning with us, tailored to help you excel.</p>
            </div>

            {/* <div className="grid grid-flow-row grid-cols-1 gap-2 px-10 py-10 auto-rows-auto sm:grid-cols-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}> */}
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white text-[#282828]  w-sm rounded-xl shadow-lg p-6 flex flex-col items-center space-y-4"
                    >
                        <img src={feature.icon} className="w-20 h-20 bg-center bg-cover" />
                        <h3 className="text-center text-small">{feature.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseCOC;
