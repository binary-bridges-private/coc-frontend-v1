import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { openLoginPopup } from '../../store/slices/PopupSlice.ts';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

    console.log(isAuth);

    useEffect(() => {
        if (!isAuth) {
            dispatch(openLoginPopup());
        }
    }, [isAuth, dispatch]);

    if (!isAuth) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
