import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getUserRole } from "../services/authService";

export default function useUserRole() {
    const { user, isAuthenticated } = useAuth0();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) return;

        const getRole = () => {
            setLoading(true);
            getUserRole(user.sub)
                .then(res => setRole(res.role))
                .catch(err => {
                    console.log(err);
                    setError(err);
                })
                .finally(() => setLoading(false));
        }

        getRole();
    }, [user]);

    return { role, loading, error };
};