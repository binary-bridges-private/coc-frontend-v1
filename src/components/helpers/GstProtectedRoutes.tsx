import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { openLoginPopup } from '../../store/slices/PopupSlice.ts';
import { Navigate, useNavigate } from 'react-router-dom';

const GstProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
    const isGstAuth = useAppSelector((state) => state.gstAuth.isGstAuthenticated);

    console.log(".................................................GST protected route..............................");
    console.log(isAuth);
    console.log(isGstAuth);

    useEffect(() => {
        if (!isAuth) {
            dispatch(openLoginPopup());
        }
        if(!isGstAuth) {
            navigate('/practice/gst/login');
        }
    }, [isAuth, isGstAuth, dispatch]);

    if (!isAuth) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default GstProtectedRoute;
