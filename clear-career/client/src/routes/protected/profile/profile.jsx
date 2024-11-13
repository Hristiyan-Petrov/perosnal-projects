import styles from './profile.module.scss'
import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {
    BookmarkCheck,
    Send,
    UserCog,
    FileText,
    Briefcase,
    MessageSquarePlus,
    Users,
    FilePlus2,
    Building2
} from 'lucide-react';
import * as authService from '../../../services/authService';
import { NavLink, } from 'react-router-dom';
import useUserRole from '../../../hooks/useUserRole';

// export const loader = async () => {
//     const { user } = useAuth0();
//     return await getUser(user.sub);
// };

export default function Profile() {
    const { user } = useAuth0();
    const { role } = useUserRole();

    const seekerNavItems = [
        {
            path: 'saved-jobs',
            label: 'Saved Jobs',
            icon: <BookmarkCheck />,
            description: 'View and manage your saved job listings'
        },
        {
            path: 'applied-jobs',
            label: 'Applied Jobs',
            icon: <Send />,
            description: 'Track your job applications'
        },
        {
            path: 'account',
            label: 'Account Information',
            icon: <UserCog />,
            description: 'Manage your personal information'
        },
        {
            path: 'cv-builder',
            label: 'CV Builder',
            icon: <FileText />,
            description: 'Create and edit your professional CV'
        },
        // { 
        //   path: 'network', 
        //   label: 'Professional Network', 
        //   icon: <Users />,
        //   description: 'Connect with other professionals'
        // },
        {
            path: 'messages',
            label: 'Messages',
            icon: <MessageSquarePlus />,
            description: 'Communicate with applicants'
        }
    ];

    const offererNavItems = [
        {
            path: 'posted-jobs',
            label: 'Posted Jobs',
            icon: <Briefcase />,
            description: 'Manage your job listings'
        },
        {
            path: 'companies',
            label: 'Companies Profile',
            icon: <Building2 />,
            description: 'Add your company information'
        },
        {
            path: 'account',
            label: 'Account Information',
            icon: <UserCog />,
            description: 'Manage your user profile'
        },
        {
            path: 'applicants',
            label: 'Applicant Tracking',
            icon: <Users />,
            description: 'Review and manage job applications'
        },
        {
            path: '/offer/create',
            label: 'Add Offer',
            icon: <FilePlus2 />,
            description: 'Create an offer for one of your companies'
        },
        // {
        //     path: 'notifications',
        //     label: 'Notifications',
        //     icon: <Bell />,
        //     description: 'View your alerts and updates'
        // },
        {
            path: 'messages',
            label: 'Messages',
            icon: <MessageSquarePlus />,
            description: 'Communicate with applicants'
        }
    ];

    const navItems = role === 'job-seeker' ? seekerNavItems : offererNavItems;

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                <div className={styles.profileImage}>
                    <img src={user?.picture} alt={user?.name} />
                </div>
                <div className={styles.profileInfo}>
                    <h2>{'Hello, ' + user?.nickname || user?.name}</h2>
                    <p>{user?.email}</p>
                    <span className={styles.roleBadge}>
                        {role === 'job-seeker' ? 'Job Seeker' : 'Job Offerer'}
                    </span>
                </div>
            </div>

            <div className={styles.navigationGrid}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `${styles.navigationCard} ${isActive ? styles.active : ''}`
                        }
                    >
                        <div className={styles.iconWrapper}>{item.icon}</div>
                        <h3>{item.label}</h3>
                        <p>{item.description}</p>
                    </NavLink>
                ))}
            </div>

        </div>
    );
}