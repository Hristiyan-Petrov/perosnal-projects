import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";
import LoadingAnimation from "./LoadingAnimation";
import { AUTH_LOCAL_STORAGE_KEYS } from "../constants/messages";
import { toast } from "react-toastify";

export default function AuthCallback() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();


    useEffect(() => {
        if (isAuthenticated && user && !isLoading) {
            authService.getUser(user.sub)
                .then(res => res.json())
                .then(userData => {
                    // If is new user
                    if (!userData._id) {
                        authService.createUser(user.sub)
                            .then(response => response.json())
                            .then(response => {
                                toast.success(response.message);
                                localStorage.removeItem(AUTH_LOCAL_STORAGE_KEYS.loginNotification);
                                navigate('/set-role'); // Redirect new users
                            })
                            .catch(err => {
                                console.log(err);
                                toast.error(err);
                            });
                    } else {
                        localStorage.setItem(AUTH_LOCAL_STORAGE_KEYS.loginNotification, true);
                        navigate('/dashboard'); // Redirect existing users
                    }
                })
                .catch(err => console.error('Error checking user existence from client:', err));
        }
    }, [user, isAuthenticated, isLoading, navigate]);

    return <LoadingAnimation />;    // Show loading indicator
}