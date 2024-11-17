import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import { publicRoutes } from './public';
import { protectedRoutes } from './protected';
import ErrorPage from './public/errorPage/errorPage';

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