import { Navigate, Outlet, redirect } from "react-router-dom";
import Dashboard from "./public/dashboard";
import { toast } from "react-toastify";
import { AUTH_MESSAGES } from "../constants/messages";
import { useEffect } from "react";

function ProtectedRoute() {
    const isAuthenticated = false; // TODO

    useEffect(() => {
        if (!isAuthenticated) {
            toast.info(AUTH_MESSAGES.loginRequired);
        }
    }, [isAuthenticated]);

    return (
        !isAuthenticated
            ? <Navigate to='/login' replace />
            : <Outlet />
    )
}

export const protectedRoutes = [
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            },
        ]
    }
] 