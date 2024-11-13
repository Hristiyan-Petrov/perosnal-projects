import { useAuth0 } from "@auth0/auth0-react"
import useUserCompanies from "../../../hooks/useUserCompanies"
import { useNavigate } from "react-router-dom";
import DashboardCardView from "../../../components/offers/DashboardCardView/DashboardCardView";
import { nanoid } from "nanoid";
import styles from './companies.module.scss';

export default function Companies() {
    const { user } = useAuth0();
    const { userCompanies, loading, error } = useUserCompanies(user.sub);
    const navigate = useNavigate();

    const addClickHandler = () => {
        navigate('create');
    }

    if (userCompanies.length === 0) {
        return (
            <div>
                <h2>No offers yet</h2>
                <button>Create Company Profile</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Your companies</h2>
            <div className={styles.offersContainer}>
                {userCompanies.map(company => (
                    <DashboardCardView
                        key={company._id || nanoid()}
                        type={'company'}
                        {...company}
                    />
                ))}
            </div>
            <button onClick={addClickHandler}>Add another company</button>
        </div>
    )
};