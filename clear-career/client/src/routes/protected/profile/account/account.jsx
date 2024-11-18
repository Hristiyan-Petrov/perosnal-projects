import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
    KeyRound,
    Trash2,
} from 'lucide-react';
import AccountActionCard from '../../../../components/common/AccountActionCard/AccountActionCard'
import styles from './account.module.scss';
import authService from '../../../../services/authService';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import ConfirmDialog from '../../../../components/ConfirmDialog';
import { CONFIRMATION_DIALOG_RESOURCES } from '../../../../constants/messages';

export default function AccountInfo() {
    const { user, getAccessTokenSilently, logout } = useAuth0();

    const [resetStatus, setResetStatus] = useState('idle'); // idle, loading, success, error
    const [resetMessage, setResetMessage] = useState('');

    const [deleteStatus, setDeleteStatus] = useState('idle'); // idle, loading, success, error
    const [deleteMessage, setDeleteMessage] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isThirdPartyAuth = user.sub.split('|')[0] !== 'auth0';

    // Change password

    const handlePasswordReset = async (e) => {
        setResetStatus('loading');
        authService.resetPassword(user.email)
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

    // Delete account

    const openDeleteDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDialogOpen(false);
    };

    const handleAccountDelete = async e => {
        setDeleteStatus('loading');
        setDeleteMessage('');
        closeDeleteDialog();

        const accessToken = await getAccessTokenSilently();

        authService.deleteAccount(user.sub, accessToken)
            .then(res => {
                console.log(res);
                setDeleteStatus('success');
                setDeleteMessage('Account successfully deleted. You will be logged out shortly...');
                setTimeout(() => {
                    logout({ logoutParams: { returnTo: window.location.origin } });
                }, 3000);
            })
            .catch(err => {
                setDeleteStatus('error');
                setDeleteMessage(err.message || 'Failed to delete account. Please try again later.');
                console.error('Account deletion error:', err);
            });

    }

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
                    onClickHandler={handlePasswordReset}
                    loadingText="Initiating Reset..."
                    infoText="For security reasons, you'll receive an email with instructions to reset your password."
                />
            }

            {/* Account Deletion Card */}
            <AccountActionCard
                icon={Trash2}
                title="Delete Account"
                status={deleteStatus}
                message={deleteMessage}
                description="Warning: This action cannot be undone. All your data will be permanently removed."
                buttonText="Delete Account"
                buttonVariant="danger"
                onClickHandler={openDeleteDialog}
                loadingText="Deleting Account..."
                infoText="Please note: This will permanently delete all your data, including your profile, applications, and saved jobs."
            />

            <ConfirmDialog
                id={CONFIRMATION_DIALOG_RESOURCES.ACCOUNT_DELETE_ID}
                isOpen={isDialogOpen}
                onClose={closeDeleteDialog}
                onConfirm={handleAccountDelete}
                title={CONFIRMATION_DIALOG_RESOURCES.ACCOUNT_DELETE_TITLE}
                contentText={CONFIRMATION_DIALOG_RESOURCES.ACCOUNT_DELETE_CONTENT_TEXT}
                confirmButtonText={deleteStatus === 'loading' ? CONFIRMATION_DIALOG_RESOURCES.ACCOUNT_DELETE_CONFIRM_BUTTON_TEXT_LOADING : CONFIRMATION_DIALOG_RESOURCES.ACCOUNT_DELETE_CONFIRM_BUTTON_TEXT}
                loading={deleteStatus === 'loading'}
            />
        </div>
    );
};