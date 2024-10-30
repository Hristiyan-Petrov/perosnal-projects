import './styles/styles.css'
import { StrictMode } from 'react'
import App from './App'
import { createRoot } from 'react-dom/client'


createRoot(document.getElementById('wrapper')).render(
	// <StrictMode>
		<App />
	// </StrictMode>
)
