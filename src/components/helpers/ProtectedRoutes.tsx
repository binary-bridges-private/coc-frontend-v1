import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { openLoginPopup, toggleLoginPopup } from '../../store/slices/PopupSlice.ts';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);

    console.log(token);

    useEffect(() => {
        if (!token) {
            dispatch(openLoginPopup());
        }
    }, [token, dispatch]);

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
