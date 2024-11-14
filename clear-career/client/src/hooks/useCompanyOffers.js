import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getOffers } from "../services/companyService";

export default function useCompanyOffers(companyId) {
    const { user, isAuthenticated } = useAuth0();
    const [companyOffers, setCompanyOffers] = useState(null); 
    const [companyTitle, setCompanyTitle] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) return;

        const getOffersHandler = () => {
            getOffers(companyId)
                .then(res => {
                    setCompanyOffers(res.offers);
                    setCompanyTitle(res.title)
                })
                .catch(err => {
                    console.log(err);
                    setError(err);
                })
                .finally(() => {
                    setLoading(false)
                });
        }

        getOffersHandler();
    }, [user]);

    return { companyTitle, companyOffers, loading, error };
};