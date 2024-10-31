import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthNotification } from "../../hooks/useAuthNotification";
import { AUTH_KEYS, AUTH_MESSAGES } from "../../constants/messages";

export default function Homepage() {
    const { isAuthenticated, isLoading } = useAuth0();
    useAuthNotification(!isAuthenticated, isLoading, AUTH_MESSAGES.logoutSuccess, AUTH_KEYS.logoutNotificationLocalStorageKey);

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