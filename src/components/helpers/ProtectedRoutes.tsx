import React from 'react';
// import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    // setTimeout(() => {
    //     const accessToken = localStorage.getItem('accessToken');
    //     console.log("Protected Route triggered :", accessToken);
    //     if (!accessToken) {
    //         window.location.href = `${mainBaseUrl}/auth/login`;
    //         return null;
    //     }

    // }, 700);

    return <Element {...rest} />;
};

export default ProtectedRoute;
