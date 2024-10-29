import { Fragment } from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <Fragment>
            <header>
                {/* <!-- Navigation --> */}
                <a id="logo" href="/"
                ><img id="logo-img" src="/public/images/logo.jpg" alt="logo"
                    /></a>

                <nav>
                    <div>
                        <a href="#">Dashboard</a>
                    </div>

                    {/* <!-- Logged-in users --> */}
                    <div class="user">
                        <a href="#">Create Offer</a>
                        <a href="#">Logout</a>
                    </div>

                    {/* <!-- Guest users --> */}
                    <div class="guest">
                        <a href="#">Login</a>
                        <a href="#">Register</a>
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