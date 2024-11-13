import 'react-toastify/dist/ReactToastify.css';
import { Fragment, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import LoadingAnimation from '../components/LoadingAnimation';
import { useAuth0 } from '@auth0/auth0-react';
import * as authService from '../services/authService';

export default function Layout() {
    const {isLoading} = useAuth0();
    
    if (isLoading) {
        return (
            <LoadingAnimation />
        )
    }

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