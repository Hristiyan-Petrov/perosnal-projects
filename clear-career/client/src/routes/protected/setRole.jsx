import styles from './setRole.module.scss'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { setRoleService } from "../../services/authService";
import { useState } from "react";
import { AlertCircle, Briefcase, ChevronRight, Search } from 'lucide-react'

export default function SetRole() {
    const { user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSetRole = role => {
        setIsLoading(true);
        setRoleService(user.sub, role)
            .then(res => res.json())
            .then(user => {
                console.log('NEW user created!');
                console.log(user);
                navigate('/dashboard');
            })
            .catch(err => {
                console.log('Error setting role:', err)
                setIsLoading(false);
            });
    }

    const roleInfo = {
        'job-seeker': {
            title: 'Searching for a Job',
            description: 'If you are looking for job opportunities, select this option. You will be able to browse and apply for various job listings.',
            icon: Search,
            benefits: [
                'Explore job listings tailored to your skills',
                'Track your job applications',
                'Receive notifications about new job posts'
            ]
        },
        'job-offerer': {
            title: 'Offering a Job',
            description: 'Select this option if you are hiring. You can post job openings, manage applicants, and find the best candidates for your positions.',
            icon: Briefcase,
            benefits: [
                'Post job openings with detailed descriptions',
                'Manage applications from potential candidates',
                'Highlight your company\'s profile and culture'
            ]
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Choose Your Role</h1>

                <div className={styles.grid}>
                    {Object.entries(roleInfo).map(([role, info]) => {
                        // const Icon = info.icon;
                        return (
                            <RoleSelectButtonCard
                                role={role}
                                Icon={info.icon}
                                title={info.title}
                                description={info.description}
                                benefits={info.benefits}
                                isLoading={isLoading}
                                handleSetRole={handleSetRole}
                            />
                        );
                    })}
                </div>

                {isLoading && (
                    <div className={styles.alert}>
                        <AlertCircle className={styles.alertIcon} />
                        <p className={styles.alertText}>Setting your role...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

function RoleSelectButtonCard({
    role,
    Icon,
    title,
    description,
    benefits,
    isLoading,
    handleSetRole
}) {
    return (
        <button
            key={role}
            onClick={() => handleSetRole(role)}
            className={`${styles.roleButton} ${isLoading ? styles.disabled : ''}`}
            disabled={isLoading}
        >
            <div className={styles.iconWrapper}>
                <Icon className={styles.icon} />
            </div>
            <h2 className={styles.cardTitle}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <ul className={styles.benefits}>
                {benefits.map((benefit, index) => (
                    <li key={index} className={styles.benefit}>
                        <ChevronRight className={styles.chevron} />
                        {benefit}
                    </li>
                ))}
            </ul>
        </button>
    );
}