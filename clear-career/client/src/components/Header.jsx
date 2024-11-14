import { NavLink, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import useUserRole from "../hooks/useUserRole";

export default function Header() {
    const { isAuthenticated } = useAuth0();
    const { role } = useUserRole();
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
                            to="/offers"
                        >
                            Dashboard</NavLink>

                        {isAuthenticated
                            // Logged-in users 
                            ?
                            <>

                                <NavLink
                                    to={'/profile'}
                                >
                                    Profile
                                </NavLink>
                                {
                                    role === 'job-offerer'
                                        ?
                                        <NavLink
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