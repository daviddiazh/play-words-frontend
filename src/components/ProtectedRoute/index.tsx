import React from "react";
import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "./interface";
import { useAuth } from "../../context/auth/AuthProvider";

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
    const { status, user } = useAuth();

    if( status === 'not-authenticated' ) {
        return <Navigate to='/' />;
    }

    if (!roles.includes(user!.role)) {
        return <Navigate to='/' />;
    }

    return children
}
