import { useAuth0 } from "@auth0/auth0-react";
import { LOCAL_STORAGE_KEYS, AUTH_MESSAGES } from "../constants/messages";
import { toast } from "react-toastify";

export default function LogoutButton() {
    const { logout } = useAuth0();
    const handleLogout = () => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.logoutNotification, true);
        logout({ logoutParams: { returnTo: window.location.origin } });
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