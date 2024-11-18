import Homepage from "./public/homepage/homepage";
import Login, { action as loginAction } from "./public/auth/Login";
import Register from "./public/auth/Register";
import Dashboard from "./public/dashboard";
import AuthCallback from "../components/AuthCallback";
import OfferDetails from "./public/offerDetails/offerDetails";

// import { lazy } from "react";
// const Login = lazy(() => import('../components/auth/Login'));
// const Register = lazy(() => import('../components/auth/Register'));

export const publicRoutes = [
    {
        index: true,
        element: <Homepage />,
    },
    {
        path: 'auth-callback',
        element: <AuthCallback />
    },
    {
        path: 'offers',
        element: <Dashboard />,
    },
    {
        path: 'offers/:offerId',
        element: <OfferDetails />
    }
]