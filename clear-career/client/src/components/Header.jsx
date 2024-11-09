import { NavLink, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";

const setActive = isActive => {
    isActive
        ? 'active'
        : ''
}

export default function Header() {
    const { isAuthenticated } = useAuth0();
    const location = useLocation();
    const isSettingRole = location.pathname === '/set-role';

    return (
        <header>
            <NavLink id="logo" to="/">
                <img id="logo-img" src="/public/images/logo.jpg" alt="logo" />
            </NavLink>

            <nav className="navigation">

                {isSettingRole
                    ? null
                    : <div>
                        <NavLink
                            to="/dashboard"
                            className={setActive()}
                        >
                            Dashboard</NavLink>

                        {isAuthenticated
                            // Logged-in users 
                            ?
                            <>
                                <NavLink
                                    to="offer/create"
                                    className={setActive()}
                                >
                                    Create Offer
                                </NavLink>
                                <NavLink
                                    to={'/profile'}
                                    className={setActive()}
                                >
                                    Profile
                                </NavLink>
                                <LogoutButton />
                            </>
                            :
                            // Guest users 
                            // <NavLink
                            //     to="/login"
                            //     className={setActive()}
                            // >
                            //     Login</NavLink>
                            <LoginButton />
                        }
                    </div>
                }
            </nav>
        </header>
    )
}