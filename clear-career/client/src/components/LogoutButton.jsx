import { useAuth0 } from "@auth0/auth0-react";
import { AUTH_KEYS } from "../constants/messages";

export default function LogoutButton() {
    const { logout } = useAuth0();
    const handleLogout = async () => {
        await logout({ logoutParams: { returnTo: window.location.origin } });
        localStorage.setItem(AUTH_KEYS.logoutNotificationLocalStorageKey, true);
    }
    return (
        <button
            className="logout-button"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}