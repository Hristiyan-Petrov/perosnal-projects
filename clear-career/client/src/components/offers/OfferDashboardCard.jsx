import {
    Briefcase,
    CalendarDays,
} from 'lucide-react';
import { useNavigate, NavLink, } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './OfferDashboardCard.module.scss';

export default function OfferDashboardCard({
    _id,
    imageUrl,
    title,
    salary,
    company,
    experience,
    creator = {
        // auth0Id: 'BRRRRR'
        auth0Id: 'google-oauth2|100135643425801582610'
    }
}) {
    const { user } = useAuth0();
    // const navigate = useNavigate();

    // const handleDetailsClick = () => {
    //     navigate(`/offers/${_id}`);
    // };

    // const handleEditClick = () => {
    //     navigate(`/offers/${_id}/edit`);
    // };

    // const handleDeleteClick = () => {
    //     // TODO: Ask dialog, nicely animation
    //     // navigate(`/offers/${_id}`);
    // };


    const formatSalary = (salary) => {
        const [minSalary, maxSalary] = salary.split('-');
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        return `${formatter.format(minSalary)} - ${formatter.format(maxSalary)}`;
    };

    const getExperienceLabel = (years) => {
        years = Number(years);
        if (years === 0) return 'Entry Level';
        if (years < 3) return 'Junior';
        if (years < 5) return 'Mid-Level';
        return 'Senior';
    };

    return (
        <NavLink to={`/offers/${_id}`} className={styles.card}>
            <div className={styles.wrapper}>
                <div className={styles.imageContainer}>
                    <img
                        src={imageUrl}
                        alt={title}
                    />
                </div>

                <div className={styles.details}>
                    <div className={styles.header}>
                        <h3 className={styles.title}>{title}</h3>
                        <span className={styles.company}>{company}</span>
                    </div>

                    <div className={styles.metaInfo}>
                        <div className={styles.metaItem}>
                            <Briefcase size={16} />
                            <span>{getExperienceLabel(experience)}</span>
                        </div>

                        <div className={styles.metaItem}>
                            <CalendarDays size={16} />
                            <span>{experience} years exp.</span>
                        </div>

                        <div className={`${styles.metaItem} ${styles.salary}`}>
                            <span>
                                {salary
                                    ? formatSalary(salary)
                                    : ''
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};