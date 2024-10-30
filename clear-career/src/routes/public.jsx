import Homepage from "./public/homepage";
import Login from "./public/auth/Login";
import Register from "./public/auth/Register";

// import { lazy } from "react";
// const Login = lazy(() => import('../components/auth/Login'));
// const Register = lazy(() => import('../components/auth/Register'));

export const publicRoutes = [
    {
        index: true,
        element: <Homepage />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'register',
        element: <Register />
    },
]