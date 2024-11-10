// components/profile/PasswordChange.jsx
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
    CheckCircle,
    AlertCircle,
    KeyRound,
    Trash2,
} from 'lucide-react';
import PasswordChange from '../../../components/profile/PasswordChange ';
import styles from './account.module.scss';
import AccountActionCard from '../../../components/profile/AccountActionCard';
import { resetPassword } from '../../../services/authService';

export default function AccountInfo() {
    const { user } = useAuth0();

    const [resetStatus, setResetStatus] = useState('idle'); // idle, loading, success, error
    const [resetMessage, setResetMessage] = useState('');

    const isThirdPartyAuth = user.sub.split('|')[0] !== 'auth0';

    const handlePasswordReset = async (e) => {
        setResetStatus('loading');
        resetPassword(user.email)
            .then(res => {
                console.log(res);
                setResetStatus('success');
                setResetMessage('Check your email for password reset instructions.');
            })
            .catch(err => {
                setResetStatus('error');
                setResetMessage('Something went wrong. Please try again later.');
                console.error('Password reset error:', err);
            });

    };

    return (
        <div className={styles.accountActionsContainer}>
            <h2>Account Information</h2>

            {!isThirdPartyAuth &&
                //<PasswordChange />
                <AccountActionCard
                    icon={KeyRound}
                    title="Change Password"
                    status={resetStatus}
                    message={resetMessage}
                    description="Need to update your password? We'll send you a secure link to reset it."
                    buttonText="Reset Password"
                    buttonVariant="primary"
                    onClick={handlePasswordReset}
                    loadingText="Initiating Reset..."
                    infoText="For security reasons, you'll receive an email with instructions to reset your password."
                />
            }

            {/* 
                Set first name
                Set last name
                Delete acc
             */}
        </div>
    );

};