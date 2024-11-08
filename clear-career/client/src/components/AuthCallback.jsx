import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";
import LoadingAnimation from "./LoadingAnimation";
import { AUTH_LOCAL_STORAGE_KEYS } from "../constants/messages";
import { toast } from "react-toastify";

export default function AuthCallback() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const isCreatingUser = useRef(false);

    useEffect(() => {

        const handleAuth0Login = async () => {
            if (!isAuthenticated && !user && isLoading) return;

            try {
                if (isCreatingUser.current) return;
                isCreatingUser.current = true;
                const userResponse = await authService.getUser(user.sub);
                const userData = await userResponse.json();

                if (!userData._id) {
                    const createResponse = await authService.createUser(user.sub);
                    const createData = await createResponse.json();

                    if (createResponse.ok) {
                        toast.success(createData.message);
                        localStorage.removeItem(AUTH_LOCAL_STORAGE_KEYS.loginNotification);
                        navigate('/set-role'); // Redirect new users
                    } else {
                        // TODO: If creation failed because user already exists
                    }
                } else if (userData._id && !userData.role) {
                    // If user interrupted the setting role (He has user db doc wihout role set)
                    toast.warning('Welcome back! Please set role to complete your profile');
                    navigate('/set-role');
                } else if (userData._id && userData.role) {
                    // Login existing user
                    localStorage.setItem(AUTH_LOCAL_STORAGE_KEYS.loginNotification, true);
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error('Error in auth callback:', err);
                toast.error('An error occurred during authentication');
            }
        }
        
        handleAuth0Login();
    }, [isAuthenticated, isLoading]);

    return <LoadingAnimation />;    // Show loading indicator
}