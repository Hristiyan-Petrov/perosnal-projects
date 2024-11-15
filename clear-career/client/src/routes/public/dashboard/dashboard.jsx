import { useAuth0 } from "@auth0/auth0-react";
import { useAuthNotification } from "../../../hooks/useAuthNotification";
import { LOCAL_STORAGE_KEYS, AUTH_MESSAGES } from "../../../constants/messages";
import { useLoaderData, useNavigate } from "react-router-dom";
import styles from './dashboard.module.scss';
import DashboardCardView from "../../../components/common/DashboardCardView/DashboardCardView";
import { useEffect, useState } from "react";
import offerService from "../../../services/offerService";
import { toast } from "react-toastify";
import LoadingAnimation from "../../../components/LoadingAnimation/LoadingAnimation";

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
    const [offers, setOffers] = useState({});
    const [loading, setLoading] = useState(true);

    useAuthNotification(isAuthenticated, isLoading, AUTH_MESSAGES.loginSuccess, LOCAL_STORAGE_KEYS.loginNotification);

    useEffect(() => {
        const hasToNavigate = localStorage.getItem(LOCAL_STORAGE_KEYS.navigate);
        // Is set when user signs in to apply in offerDetails
        if (hasToNavigate) {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.navigate);
            navigate(hasToNavigate);
        }

        const fetchOffers = () => {
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
    }, [])

    if (loading) return <LoadingAnimation />;

    if (offers.length == 0) {
        return <h2>No offers yet.</h2>
    }

    console.log(offers);

    return (
        <div>
            <h2>Job Offers</h2>
            <div className={styles.offersContainer}>
                {offers.map((offer) => (
                    <DashboardCardView
                        key={offer._id}
                        type={'offer'}
                        {...offer}
                    />
                ))}
            </div>
        </div>
    );
}