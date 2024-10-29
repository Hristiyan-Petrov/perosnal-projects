import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <Fragment>
            <header>
                {/* <!-- Navigation --> */}
                <Link id="logo" to="/">
                    <img id="logo-img" src="/public/images/logo.jpg" alt="logo" />
                </Link>

                <nav>
                    <div>
                        <Link to="/dashboard">Dashboard</Link>
                    </div>

                    {/* <!-- Logged-in users --> */}
                    <div className="user">
                        <Link to="#">Create Offer</Link>
                        <Link to="#">Logout</Link>
                    </div>

                    {/* <!-- Guest users --> */}
                    <div className="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                <p>@ClearCareer</p>
            </footer>
        </Fragment>
    )
}