import {
    Briefcase,
    CalendarDays,
    FileUser,
} from 'lucide-react';
import { useNavigate, NavLink, } from 'react-router-dom';
import styles from './DashboardCardView.module.scss';

export default function DashboardCardView({
    // Common
    type,
    _id,
    // Offer attribures
    company,
    title,
    experience,
    salary,
    creator = {
        // auth0Id: 'BRRRRR'
        auth0Id: 'google-oauth2|100135643425801582610'
    },
    // requirements

    // Company attribures
    name,
    imageUrl,
    applicants,
    owner,
    offers
}) {
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
        <NavLink to={type === 'offer'
            ? `/offers/${_id}`
            : `/company/${_id}`
        } className={styles.card}>
            <div className={styles.wrapper}>
                <div className={styles.imageContainer}>
                    <img
                        src={imageUrl || company.imageUrl}
                        alt={name || title}
                    />
                </div>

                <div className={styles.details}>
                    {type === 'offer' &&
                        <div className={styles.header}>
                            <h3 className={styles.title}>{title}</h3>
                            <span className={styles.company}>{company.name}</span>
                        </div>}

                    <div className={styles.metaInfo}>

                        {type === 'offer' && (
                            <>
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
                            </>
                        )}

                        {type === 'company' && (
                            <>
                                <div className={styles.metaItem}>
                                    <Briefcase size={20} />
                                    <span>Posted offers: {offers?.length}</span>
                                </div>

                                <div className={styles.metaItem}>
                                    <FileUser size={20} />
                                    <span>Total applicants: {applicants?.length}</span>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </NavLink>
    );
};