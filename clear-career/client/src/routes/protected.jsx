import { Navigate, Outlet } from "react-router-dom";
import CreateOffer from "./protected/createOffer";
import { toast } from "react-toastify";
import { AUTH_MESSAGES } from "../constants/messages";
import { useEffect } from "react";
import Profile, { } from "./protected/profile/profile";
import { useAuth0 } from "@auth0/auth0-react";
import SetRole from "./protected/setRole/setRole";
import AccountInfo from "./protected/profile/account/account";
import Companies from "./protected/companies/companies";
import CreateCompany from "./protected/createCompany";

function ProtectedRoute() {
    const { isAuthenticated } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated) {
            toast.info(AUTH_MESSAGES.loginRequired);
        }
    }, [isAuthenticated]);

    return (
        !isAuthenticated
            ? <Navigate to='/' replace />
            : <Outlet />
    )
}

// TODO: Add route guard for role specific paths 

export const protectedRoutes = [
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/set-role',
                element: <SetRole />
            },
            {
                path: '/offer/create',
                element: <CreateOffer />
            },
            {
                path: '/profile',
                element: <Profile />,
                // loader: userLoader
            },
            {
                path: '/profile/account',
                element: <AccountInfo />
            },
            {
                path: '/profile/companies',
                element: <Companies />,
            },
            {
                path: '/profile/companies/create',
                element: <CreateCompany />,
            }
        ]
    }
] 