import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import ErrorPage from './errorPage/errorPage'
import { publicRoutes } from './public';
import { protectedRoutes } from './protected';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            ...publicRoutes,
            ...protectedRoutes
        ]
    }
]);