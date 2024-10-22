import React from "react";
import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "./interface";

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    // const { status } = useAuth();
    const status = 'not-authenticated';

    if( status === 'not-authenticated' ) {
        localStorage.removeItem('token')
        return <Navigate to='/' />;
    }

    return children;
}
