import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Link id="logo" to="/">
                <img id="logo-img" src="/public/images/logo.jpg" alt="logo" />
            </Link>

            <nav className="navigation">
                <div>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? 'active'
                                : ''
                        }
                    >
                        Dashboard</NavLink>
                </div>

                {/* <!-- Logged-in users --> */}
                <div className="user">
                    <Link to="/create">Create Offer</Link>
                    <Link to="/logout">Logout</Link>
                </div>

                {/* <!-- Guest users --> */}
                <div className="guest">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
        </header>
    )
}