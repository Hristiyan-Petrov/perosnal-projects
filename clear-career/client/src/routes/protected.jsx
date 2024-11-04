import { Navigate, Outlet } from "react-router-dom";
import CreateOffer from "./protected/createOffer";
import { toast } from "react-toastify";
import { AUTH_MESSAGES } from "../constants/messages";
import { useEffect } from "react";
import Profile from "./protected/profile";
import { useAuth0 } from "@auth0/auth0-react";
import SetRole from "./protected/setRole";

function ProtectedRoute() {
    const { isAuthenticated } = useAuth0(); // TODO

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
                path: 'set-role',
                element: <SetRole />
            },
            {
                path: 'create',
                element: <CreateOffer />
            },
            {
                path: 'profile',
                element: <Profile />
            }
        ]
    }
] 