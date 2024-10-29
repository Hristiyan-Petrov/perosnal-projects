import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/styles.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout';
import Homepage from './styles/Homepage';

const router = createBrowserRouter([
	{
		path: "/",
		element: < Layout />,
		children: [
			{
				index: true,
				element: <Homepage />
			}
		]
	}
]);

createRoot(document.getElementById('wrapper')).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
