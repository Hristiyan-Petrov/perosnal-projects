import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import authService from "../services/authService";

export default function useUserCompanies() {
    const { user, isAuthenticated } = useAuth0();
    const [userCompanies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) return;

        const getCompanies = () => {
            authService.getUserCompanies(user.sub)
                .then(res => {
                    setCompanies(res.companies);
                })
                .catch(err => {
                    console.log(err);
                    setError(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        getCompanies();
    }, [user]);

    return { userCompanies, loading, error };
};