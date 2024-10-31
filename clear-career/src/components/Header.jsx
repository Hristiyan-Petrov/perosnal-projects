import { NavLink } from "react-router-dom";

const setActive = isActive => {
    isActive
        ? 'active'
        : ''
}

export default function Header() {
    return (
        <header>
            <NavLink id="logo" to="/">
                <img id="logo-img" src="/public/images/logo.jpg" alt="logo" />
            </NavLink>

            <nav className="navigation">
                <div>
                    <NavLink
                        to="/dashboard"
                        className={setActive()}
                    >
                        Dashboard</NavLink>
                </div>

                {/* <!-- Logged-in users --> */}
                <div className="user">
                    <NavLink
                        to="/create"
                        className={setActive()}
                    >
                        Create Offer</NavLink>
                    <NavLink
                        to="/logout"
                        className={setActive()}
                    >
                        Logout</NavLink>
                </div>

                {/* <!-- Guest users --> */}
                <div className="guest">
                    <NavLink
                        to="/login"
                        className={setActive()}
                    >
                        Login</NavLink>
                    <NavLink
                        to="/register"
                        className={setActive()}
                    >
                        Register</NavLink>
                </div>
            </nav>
        </header>
    )
}