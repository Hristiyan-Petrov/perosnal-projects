import Homepage from "./public/homepage";
import Login, {action as loginAction} from "./public/auth/Login";
import Register from "./public/auth/Register";
import Dashboard, { loader as dashboardLoader  } from "./public/dashboard";

// import { lazy } from "react";
// const Login = lazy(() => import('../components/auth/Login'));
// const Register = lazy(() => import('../components/auth/Register'));

export const publicRoutes = [
    {
        index: true,
        element: <Homepage />,
    },
    {
        path: 'login',
        element: <Login />,
        action: loginAction
    },
    {
        path: 'register',
        element: <Register />
    },
    {
        path: 'dashboard',
        element: <Dashboard />,
        loader: dashboardLoader
    },
]