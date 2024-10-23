import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Root from './routes/root.jsx'
import ErrorPage from './routes/error-page.jsx'
import Contact from './routes/contacts.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'contacts/:contactId',
                element: <Contact />
            }
        ]
    }, 
    {
        path: 'contacts/:contactId',
        element: <Contact />
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
