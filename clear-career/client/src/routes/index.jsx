import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import { publicRoutes } from './public';
import { protectedRoutes } from './protected';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            ...publicRoutes,
            ...protectedRoutes
        ]
    }
]);