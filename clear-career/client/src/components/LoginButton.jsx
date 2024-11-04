import { useAuth0 } from "@auth0/auth0-react";
import { AUTH_KEYS } from "../constants/messages";
import { useLocation } from "react-router-dom";

export default function LoginButton() {
    const location = useLocation();
    const { loginWithRedirect } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect();
        // if (location.pathname !== '/set-role') {
            localStorage.setItem(AUTH_KEYS.loginNotificationLocalStorageKey, true);
        // }
    }


    return (
        <button
            className="login-button"
            onClick={handleLogin}
        >
            Login
        </button>
    );
}