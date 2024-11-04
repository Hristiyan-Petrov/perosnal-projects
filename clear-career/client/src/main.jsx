import './styles/styles.css'
import { StrictMode } from 'react'
import App from './App'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'

createRoot(document.getElementById('wrapper')).render(
	<StrictMode>
		<Auth0Provider
			domain={import.meta.env.VITE_OAUTH_DOMAIN}
			clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}
			authorizationParams={{
				redirect_uri: import.meta.env.VITE_APP_AUTH0_CALLBACK_URL
			}}
		>
			<App />
		</Auth0Provider>
	</StrictMode>
)
