import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './indexClaude.css'
import Root, {
    loader as rootLoader,
    action as rootAction,
} from './routes/root.jsx'
import ErrorPage from './routes/error-page.jsx'
import Contact from './routes/contact.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                path: '/contacts/:contactId',
                element: <Contact />
            }
        ]
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
