import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/styles.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout';
import Homepage from './styles/Homepage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const router = createBrowserRouter([
	{
		path: '/',
		element: < Layout />,
		children: [
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
			}
		]
	}
]);

createRoot(document.getElementById('wrapper')).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
