import { useNavigate, useParams } from "react-router-dom";
import useCompanyOffers from '../../../../hooks/useCompanyOffers'
import LoadingAnimation from "../../../../components/LoadingAnimation";
import DashboardCardView from "../../../../components/offers/DashboardCardView/DashboardCardView";
import styles from './companyDashboard.module.scss';

export default function CompanyDashboard() {

    const navigate = useNavigate();
    const { companyId } = useParams();
    const { companyTitle, companyOffers, loading } = useCompanyOffers(companyId);

    if (loading) return <LoadingAnimation />;

    const addClickHandler = () => {
        navigate('/offers/create', { state: { companySelected: companyTitle } });
    };

    if (companyOffers.length === 0) {
        return (
            <div>
                <h2>Your Company Does Not Have Active Offers</h2>
                <div className={styles.btnContainer}>
                    <button
                        className={`${styles.btn} ${styles.large} ${styles.centered} ${styles.pulse}`}
                        onClick={addClickHandler}
                    >
                        Add Your First Offer
                    </button>
                </div>
            </div>
        );
    };

    return (

        <div>
            <h2>Company Offers</h2>
            <div className={styles.offersContainer}>
                {companyOffers.map(offer => (
                    // <p>{offer.title}</p>
                    <DashboardCardView
                        key={offer._id || nanoid()}
                        type={'offer'}
                        {...offer}
                    />
                ))}
            </div>
            <div className={styles.btnContainer}>
                <button className={styles.btn} onClick={addClickHandler}>
                    Add Another Offer
                </button>
            </div>
        </div>
    );
}