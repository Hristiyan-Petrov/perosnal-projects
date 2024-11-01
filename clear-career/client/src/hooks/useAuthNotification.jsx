import { useEffect, useState } from "react"
import { toast } from "react-toastify";

export const useAuthNotification = (checkCondition, isLoading, message, key) => {
    const [justChanged, setJustChanged] = useState(false);

    useEffect(() => {
        const hasChangedBefore = localStorage.getItem(key);

        if (!isLoading && checkCondition && !justChanged && !hasChangedBefore) {
            localStorage.setItem(key, 'true');
            setJustChanged(true);
            toast.success(message);
        }

        if (!checkCondition) {
            setJustChanged(false);
            localStorage.removeItem(key);
        }
    }, [isLoading, checkCondition]);
}