import { useAuth0 } from "@auth0/auth0-react";
import { useAuthNotification } from "../../hooks/useAuthNotification";
import { LOCAL_STORAGE_KEYS, AUTH_MESSAGES, ITEM_MESSAGES, TITLES, ITEM_TYPES } from "../../constants/messages";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import offerService from "../../services/offerService";
import ItemsDashboardView from "../../components/common/ItemsDashboardView/ItemsDashboardView";

// export const loader = () => {
//     return fetch('http://localhost:3000/status')
//         .then(res => res.json())
//         .then(res => {
//             // console.log(res)
//             return res;
//         })
//         .catch(err => console.log(err))
//         .finally(res => res);
// }

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);

    useAuthNotification(isAuthenticated, isLoading, AUTH_MESSAGES.loginSuccess, LOCAL_STORAGE_KEYS.loginNotification);

    useEffect(() => {
        const hasToNavigate = localStorage.getItem(LOCAL_STORAGE_KEYS.navigate);
        // Is set when user signs in to apply in offerDetails
        if (hasToNavigate) {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.navigate);
            navigate(hasToNavigate);
        }

        const fetchOffers = () => {
            setLoading(true);

            offerService.getAll()
                .then(res => {
                    setOffers(res.offers);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        fetchOffers();
    }, []);
    
    console.log(offers);

    return (
        <ItemsDashboardView
            loading={loading}
            items={offers}
            title={TITLES.dashboard}
            type={ITEM_TYPES.offer}
            emptyMessage={ITEM_MESSAGES.emptyDashboard}
        />
    );
}