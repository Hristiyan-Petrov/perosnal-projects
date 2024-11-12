import { useAuth0 } from "@auth0/auth0-react";
import { useAuthNotification } from "../../hooks/useAuthNotification";
import { AUTH_LOCAL_STORAGE_KEYS, AUTH_MESSAGES } from "../../constants/messages";
import { useLoaderData } from "react-router-dom";
import OfferDashboardCard from "../../components/offers/OfferDashboardCard";
import styles from './dashboard.module.scss';

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
    const { user, isAuthenticated, isLoading } = useAuth0();

    useAuthNotification(isAuthenticated, isLoading, AUTH_MESSAGES.loginSuccess, AUTH_LOCAL_STORAGE_KEYS.loginNotification);

    const offers = [
        {
            _id: '1',
            imageUrl: './images/example1.png',
            title: 'Software Engineer',
            salary: '8000-8000',
            company: 'PayHawk',
            experience: 2,
            // creator: null,
            applied: [],

        },
        {
            _id: '2',
            imageUrl: './images/example2.png',
            title: 'UI/UX Designer',
            salary: '6500-8000',
            company: 'PayHawk',
            experience: 0,
            // creator: null,
            applied: [],

        },
        {
            _id: '3',
            imageUrl: './images/example3.png',
            title: 'Frontend Developer',
            salary: '8000-10000',
            company: 'PayHawk',
            experience: 5,
            // creator: null,
            applied: [],

        },
        {
            _id: '4',
            imageUrl: './images/example1.png',
            title: 'Data Engineer',
            salary: '8000-9000',
            company: 'PayHawk',
            experience: 3,
            // creator: null,
            applied: [],

        },
        {
            _id: '5',
            imageUrl: './images/example2.png',
            title: 'Farmer',
            salary: '6500-9000',
            company: 'PayHawk',
            experience: 2,
            // creator: null,
            applied: [],

        },
        {
            _id: '6',
            imageUrl: './images/example1.png',
            title: 'Backend Developer',
            // salary: '8000-9000',
            company: 'PayHawk',
            experience: 2,
            // creator: null,
            applied: [],

        },

    ];

    if (offers.length == 0) {
        {/* <!-- Display an h2 if there are no posts --> */ }
        return <h2>No offers yet.</h2>
    }

    return (
        <section id="dashboard">
            <h2>Job Offers</h2>

            <div className={styles.offersContainer}>
                {offers.map((offer) => (
                    <OfferDashboardCard
                        key={offer._id}
                        {...offer}
                    />
                ))}
            </div>
        </section>
    );
}