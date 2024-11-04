import { useEffect, useState } from "react"
import { toast } from "react-toastify";

export const useAuthNotification = (checkCondition, isLoading, message, key) => {
    useEffect(() => {
        const isKeySet = localStorage.getItem(key);

        if (!isLoading && checkCondition && isKeySet) {
            localStorage.removeItem(key);
            toast.success(message);
        }
    }, [isLoading, checkCondition]);
}