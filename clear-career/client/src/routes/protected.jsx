import { Navigate, Outlet } from "react-router-dom";
import CreateOffer from "./protected/offer/createOffer";
import { toast } from "react-toastify";
import { AUTH_MESSAGES } from "../constants/messages";
import { useEffect } from "react";
import Profile, { } from "./protected/profile/profile";
import { useAuth0 } from "@auth0/auth0-react";
import SetRole from "./protected/setRole/setRole";
import AccountInfo from "./protected/profile/account/account";
import Companies from "./protected/company/companies";
import CreateCompany from "./protected/company/createCompany/createCompany";
import CompanyDashboard from "./protected/company/companyDashboard";

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
                path: '/offers/create',
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
            },
            {
                path: '/companies/:companyId',
                element: <CompanyDashboard />
            }
        ]
    }
] 