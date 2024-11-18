import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import companyService from "../services/companyService";

export default function useCompanyOffers(companyId) {
    const { user, isAuthenticated } = useAuth0();
    const [companyOffers, setCompanyOffers] = useState([]); 
    const [companyTitle, setCompanyTitle] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) return;

        const getOffersHandler = () => {
            setLoading(true);
            companyService.getOffers(companyId)
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