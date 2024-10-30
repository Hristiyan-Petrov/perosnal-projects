import { Outlet, redirect } from "react-router-dom";

function PprotectedRoute() {
    const isAuthenticated = false; // TODO

    return (
        !isAuthenticated
            ? redirect('/login')
            : <Outlet />
    )

}

export const protectedRoutes = [
    {
        element: <PprotectedRoute />,
        children: [
            // Add children
        ]
    }
] 