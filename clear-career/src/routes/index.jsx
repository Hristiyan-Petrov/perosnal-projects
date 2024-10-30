import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import { publicRoutes } from './public';

export const router = createBrowserRouter([
    {
        path: '/',
        element: < Layout />,
        children: [
            ...publicRoutes
        ]
    }
]);