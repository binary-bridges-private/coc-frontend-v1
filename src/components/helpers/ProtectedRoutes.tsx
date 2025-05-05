// import React, { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
// import { openLoginPopup } from '../../store/slices/PopupSlice.ts';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, isFree }: { children: React.ReactNode, isFree : boolean }) => {

//     const dispatch = useAppDispatch();
//     const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
//     const enrollmentType = useAppSelector((state) => state.auth.userData?.enrollmentType);

//     console.log(isAuth);
//     console.log(enrollmentType);


//     useEffect(() => {
//         if (!isAuth) {
//             dispatch(openLoginPopup());
//         }
//     }, [isAuth, dispatch]);

//     if (!isAuth) {
//         return <Navigate to="/" replace />;
//     }

//     if (!isFree && enrollmentType !== 'practice') {
//         return ;
//     }

//     return children;
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { openLoginPopup } from '../../store/slices/PopupSlice.ts';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCrown, FaLock, FaArrowRight } from 'react-icons/fa';

const ProtectedRoute = ({ children, isFree }: { children: React.ReactNode, isFree: boolean }) => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
    const enrollmentType = useAppSelector((state) => state.auth.userData?.enrollmentType);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            dispatch(openLoginPopup());
        }
    }, [isAuth, dispatch]);

    useEffect(() => {
        if (!isFree && enrollmentType !== 'practice') {
            setShowPopup(true);
        }
    }, [isFree, enrollmentType]);

    if (!isAuth) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            {children}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000,
                            backdropFilter: 'blur(5px)'
                        }}
                    >
                        <motion.div
                            initial={{ y: 50, scale: 0.95 }}
                            animate={{ y: 0, scale: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            style={{
                                backgroundColor: 'white',
                                padding: '2.5rem',
                                borderRadius: '16px',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                                maxWidth: '450px',
                                width: '90%',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: 'linear-gradient(90deg, #3498db, #9b59b6)'
                            }} />
                            
                            <div style={{
                                marginBottom: '1.5rem',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '50%',
                                    width: '80px',
                                    height: '80px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                }}>
                                    <FaLock style={{ 
                                        fontSize: '2rem', 
                                        color: '#3498db',
                                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                                    }} />
                                </div>
                            </div>
                            
                            <h3 style={{ 
                                color: '#2c3e50', 
                                marginBottom: '1rem',
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}>
                                Practice forms Locked
                            </h3>
                            
                            <div style={{
                                marginBottom: '2rem',
                                color: '#7f8c8d',
                                lineHeight: '1.6',
                                fontSize: '1rem'
                            }}>
                                <p>These practice forms are part of our exclusive <strong>CFM (Charted Financial Management)</strong> course.</p>
                                <p style={{ marginTop: '0.5rem' }}>Buy this course to unlock this and all other practice forms.</p>
                            </div>
                            
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}>
                                <motion.button 
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate('/buy-it')}
                                    style={{
                                        backgroundColor: 'linear-gradient(135deg, #3498db, #9b59b6)',
                                        background: 'linear-gradient(135deg, #3498db, #9b59b6)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '1rem 1.5rem',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
                                    }}
                                >
                                    Upgrade Now <FaArrowRight />
                                </motion.button>
                                
                                <motion.button 
                                    whileHover={{ backgroundColor: '#f1f2f6' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate('/home')}
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: '#7f8c8d',
                                        border: 'none',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: '500',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Go to home
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProtectedRoute;