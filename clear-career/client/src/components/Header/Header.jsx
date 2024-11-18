import { NavLink, useLocation } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton";
import useUserRole from "../../hooks/useUserRole";
import { Hand } from 'lucide-react';
import styles from './Header.module.scss'

export default function Header() {
    const { user, isAuthenticated } = useAuth0();
    const { userRole } = useUserRole();
    const location = useLocation();
    const isSettingRole = location.pathname === '/set-role';

    const activeStyles = {
        background: '#5c9596',
        borderRadius: '10px',
        padding: '10px',
        color: '#ffffff',
    };

    return (
        <header>
            <div className={styles.leftWrapper}>
                <NavLink className={styles.logo} to="/">
                    <img className={styles.logoImg} src="/public/images/logo.jpg" alt="logo" />
                </NavLink>

                {isAuthenticated &&
                    <div className={styles.profileHeader}>
                        <div className={styles.profileImage}>
                            <img src={user?.picture} alt={user?.name} />
                        </div>
                        <div className={styles.greetingWrapper}>
                            <span className={styles.greeting}>{'Hello, ' + user?.nickname || user?.name}</span>
                            <Hand />
                        </div>
                        <span className={styles.roleBadge}>
                            {userRole === 'job-seeker' ? 'Job Seeker' : 'Job Offerer'}
                        </span>
                    </div>
                }

            </div>

            <nav className={styles.navigation}>

                {isSettingRole
                    ? null
                    : <div>
                        <NavLink
                            to="/offers"
                            style={({ isActive }) => (isActive ? activeStyles : null)}
                            end
                        >
                            Dashboard</NavLink>

                        {isAuthenticated
                            // Logged-in users 
                            ?
                            <>

                                <NavLink
                                    style={({ isActive }) => (isActive ? activeStyles : null)}
                                    to={'/profile'}
                                >
                                    Profile
                                </NavLink>
                                {
                                    userRole === 'job-offerer'
                                        ?
                                        <NavLink
                                            style={({ isActive }) => (isActive ? activeStyles : null)}
                                            to="/offers/create"
                                        >
                                            Create Offer
                                        </NavLink>
                                        : ''
                                }
                                <LogoutButton />
                            </>
                            :
                            <LoginButton />
                        }
                    </div>
                }
            </nav>
        </header>
    )
}