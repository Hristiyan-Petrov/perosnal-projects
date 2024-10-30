import { Link, Navigate, Outlet } from "react-router-dom";
import Dashboard from "./protected/dashboard";
import CreateOffer from "./protected/createOffer";
import { toast } from "react-toastify";
import { AUTH_MESSAGES } from "../constants/messages";
import { useEffect } from "react";

function ProtectedRoute() {
    const isAuthenticated = true; // TODO

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
            {
                path: 'create',
                element: <CreateOffer />
            }
        ]
    }
] 