import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, } from "../services/authService";
import LoadingAnimation from "./LoadingAnimation";

export default function AuthCallback() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && user && !isLoading) {
            getUser(user.sub)
                .then(res => res.json())
                .then(data => {
                    if (data.isNewUser) {
                        navigate('/set-role'); // Redirect new users
                    } else {
                        navigate('/dashboard'); // Redirect existing users
                    }
                })
                .catch(err => console.error('Error checking user existence from client:', err));
        }
    }, [user, isAuthenticated, isLoading, navigate]);

    return <LoadingAnimation />;    // Show loading indicator
}