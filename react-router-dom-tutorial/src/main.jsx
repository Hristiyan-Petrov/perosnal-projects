import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './indexClaude.css'
import Root, {
    loader as rootLoader,
    action as rootAction,
} from './routes/root.jsx'
import ErrorPage from './routes/error-page.jsx'
import Contact, {
    loader as contactLoader,
} from './routes/contact.jsx'
import EditContact, {
    action as editAction
} from './routes/edit.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                path: 'contacts/:contactId',
                element: <Contact />,
                loader: contactLoader
            },
            {
                path: 'contacts/:contactId/edit',
                element: <EditContact />,
                loader: contactLoader,
                action: editAction
            }
        ]
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
