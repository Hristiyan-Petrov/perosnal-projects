import { useAuth0 } from "@auth0/auth0-react";
import { useAuthNotification } from "../../hooks/useAuthNotification";
import { LOCAL_STORAGE_KEYS, AUTH_MESSAGES } from "../../constants/messages";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import authService from "../../services/authService";
import { toast, useToast } from "react-toastify";

export default function Homepage() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    useAuthNotification(!isAuthenticated, isLoading, AUTH_MESSAGES.logoutSuccess, LOCAL_STORAGE_KEYS.logoutNotification);

    useEffect(() => {
        const redirectIfRoleUnset = () => {
            if (isAuthenticated) {
                authService.getUser(user.sub)
                    .then(userData => {
                        if (userData._id && !userData.role) {
                            toast.warning('Please set role to complete your profile');
                            navigate('/set-role');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }

        redirectIfRoleUnset();
    }, [isLoading]);

    return (
        <section id="home">
            <img
                src="./images/pngkey.com-hunting-png-6697165-removebg-preview.png"
                alt="home"
            />
            <h2>Searching for a job?</h2>
            <h3>The right place for a new career start!</h3>
        </section>
    )
}