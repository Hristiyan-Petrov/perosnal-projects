import 'react-toastify/dist/ReactToastify.css';
import { Fragment } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import LoadingAnimation from '../components/LoadingAnimation';
import { useAuth0 } from '@auth0/auth0-react';
import * as authService from '../services/authService';

export default function Layout() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    if (isAuthenticated) {
        authService.getUser(user.sub)
            .then(res => res.json())
            .then(userData => {
                if (!userData.role) {
                    navigate('/set-role');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

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