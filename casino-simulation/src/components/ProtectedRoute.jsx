import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, token, loading } = useAuth();
    if (loading) {
        return <div>Loading...</div>;
    }   


    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}