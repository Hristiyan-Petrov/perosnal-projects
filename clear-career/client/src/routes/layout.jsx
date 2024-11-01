import 'react-toastify/dist/ReactToastify.css';
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export default function Layout() {
    return (
        <Fragment>
            <Header />
            <ToastContainer />
            <main>
                <Outlet />
            </main>
            <Footer />
        </Fragment>
    )
}