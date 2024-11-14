import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import LoadingAnimation from "./LoadingAnimation";
import { AUTH_LOCAL_STORAGE_KEYS, AUTH_MESSAGES } from "../constants/messages";
import { toast } from "react-toastify";

export default function AuthCallback() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const isCreatingUser = useRef(false);

    useEffect(() => {
        const handleAuth0Login = async () => {
            if (!isAuthenticated || !user || isLoading || isCreatingUser.current) return;
            isCreatingUser.current = true;

            try {
                const userData = await authService.getUserInitial(user.sub);

                if (userData.initialLogin) {
                    await createUserAndNavigate(user.sub, user.email);
                } else if (userData._id && !userData.role) {
                    // If user interrupted the setting role (He has user db doc wihout role set)
                    handleRoleCompletion();
                } else {
                    // Login existing user
                    handleExistingUser();
                }
            } catch (error) {
                console.error('Error in auth callback:', error);
                toast.error('An error occurred during authentication');
            } finally {
                isCreatingUser.current = false;
            }
        };

        handleAuth0Login();
    }, [isAuthenticated, isLoading]);

    const createUserAndNavigate = async (userId, email) => {
        try {
            const createData = await authService.createUser(userId, email);
            if (createData.user) {
                toast.success(createData.message);
                localStorage.removeItem(AUTH_LOCAL_STORAGE_KEYS.loginNotification);
                navigate('/set-role'); // Redirect new users
            } else {
                // TODO: If creation failed because user already exists
            }
        } catch (error) {
            console.error('Failed to create user:', err);
            toast.error('An error occurred while creating user');
        }
    };

    const handleRoleCompletion = () => {
        toast.warning(AUTH_MESSAGES.roleCompletion);
        navigate('/set-role');
    };

    const handleExistingUser = () => {
        localStorage.setItem(AUTH_LOCAL_STORAGE_KEYS.loginNotification, true);
        navigate('/offers');
    };

    return <LoadingAnimation />;
}