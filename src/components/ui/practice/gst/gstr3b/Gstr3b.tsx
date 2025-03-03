import React from 'react'
import { useNavigate } from 'react-router-dom'

const Gstr3b = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="w-[60%] mt-10 p-6 mx-auto bg-white rounded-lg shadow-lg  breadcrumbs">
                <ul>
                    <li className="cursor-pointer" onClick={() => { navigate("/practice") }}>Practice</li>
                    <li className="cursor-pointer" onClick={() => { navigate("/practice/gst") }}>Gst</li>
                    <li>Gstr-3b</li>
                </ul>
            </div>
            <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg ">
            </div>
        </div>
    )
}

export default Gstr3b;