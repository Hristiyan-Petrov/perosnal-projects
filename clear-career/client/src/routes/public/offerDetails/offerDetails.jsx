import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import useUserRole from '../../../hooks/useUserRole';
import {
    Building2,
    BookmarkPlus,
    BookmarkCheck,
    Send,
    Edit,
    Trash2,
    ArrowRight,
    CheckCircle2,
} from 'lucide-react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import styles from './OfferDetails.module.scss';
import offerService from '../../../services/offerService';
import { toast } from 'react-toastify';
import formatSalary from '../../../utils/formatSalary';
import LoadingAnimation from '../../../components/LoadingAnimation/LoadingAnimation';
import { CONFIRMATION_DIALOG_RESOURCES, LOCAL_STORAGE_KEYS } from '../../../constants/messages';
import authService from '../../../services/authService';
import ConfirmDialog from '../../../components/ConfirmDialog';

export default function OfferDetails() {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const { userRole } = useUserRole();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSaved, setIsSaved] = useState(false);

    const [isApplied, setIsApplied] = useState(false);
    const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
    const [isApplyLoading, setIsApplyLoading] = useState(false);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const { offerId } = useParams();
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffer = () => {
            offerService.getOne(offerId)
                .then(offerData => {
                    setOffer(offerData);
                    setIsSaved(offerData.savedFromUsers.some(u => u.auth0Id === user.sub));
                })
                .catch(err => {
                    console.log(err);
                    toast.error('Error when acce offer')
                })
                .finally(() => {
                    setLoading(false);
                })
        };

        fetchOffer();
    }, []);

    if (loading) return <LoadingAnimation />

    const isJobSeeker = userRole === 'job-seeker' || false;
    const isOwnOffer = user?.sub === offer.creator?.auth0Id || false;

    const onSaveToggleClickHandler = () => {  // Handle delete SaveToggle logic
        authService.saveToggleOffer(user.sub, offerId)
            .then(res => {
                setIsSaved(res.user.savedOffers.some(o => o._id === offerId));
                toast.success(res.message);

                // Disable button for 2 seconds
                const toggleDisableButton = () => {
                    document.getElementById('save-toggle-button').disabled = true;
                    setTimeout(() => {
                        document.getElementById('save-toggle-button').disabled = false;
                    }, 2000);
                };

                toggleDisableButton();
            })
            .catch(error => {
                console.log(error);
                toast.error(ERROR_MESSAGES.saveToggleOffer);
            });
    };

    const handleMoreOffersClick = () => navigate(`/offers?field=${offer.field}`);

    const handleSignInToApplyClick = () => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.navigate, location.pathname);
        loginWithRedirect();
    }

    const handleEdit = () => navigate(`/offers/${offer._id}/edit`);  // Handle delete Edit logic


    // DELETE HANDLERS
    const openDeleteDialog = () => setIsDeleteDialogOpen(true);  // Handle delete Delete logic
    const handleOfferDelete = () => {
        setIsDeleteLoading(true);

        setTimeout(() => {
            setIsDeleteLoading(false);
        }, 2000);

        // Handle delete logic
    };
    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };


    // APPLY HANDLERS
    const openApplyDialog = () => setIsApplyDialogOpen(true);  // Handle delete Delete logic
    const handleApply = () => {
        setIsApplyLoading(true);

        setTimeout(() => {
            setIsApplyLoading(false);
            setIsApplied(true);
            closeApplyDialog()
            toast.success(CONFIRMATION_DIALOG_RESOURCES.OFFER_APPLY_SUCCESS_MESSAGE)
        }, 2000);
        // Handle applying logic
    };
    const closeApplyDialog = () => {
        setIsApplyDialogOpen(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.companyInfo}>
                    <div className={styles.logoContainer}>
                        <img src={offer.company.imageUrl} alt={offer.company.title} />
                    </div>
                    <div>
                        <h1 className={styles.title}>{offer.title}</h1>
                        <div className={styles.company}>
                            <Building2 size={18} />
                            <span>{offer.company.title}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    {!isOwnOffer && (
                        <>
                            {!isAuthenticated ?
                                (
                                    <button
                                        className={`${styles.actionButton} ${styles.primary}`}
                                        onClick={handleSignInToApplyClick}
                                    >
                                        Sign in to Apply
                                    </button>
                                )
                                : isJobSeeker
                                    ? (
                                        <>
                                            <button
                                                id='save-toggle-button'
                                                className={`${styles.actionButton} ${styles.primary} ${isSaved ? styles.saved : ''}`}
                                                onClick={onSaveToggleClickHandler}
                                            >
                                                {isSaved ? <BookmarkCheck size={20} /> : <BookmarkPlus size={20} />}
                                                {isSaved ? 'Saved' : 'Save'}
                                            </button>
                                            <button
                                                className={`${styles.actionButton} ${styles.primary}`}
                                                onClick={openApplyDialog}
                                                disabled={isApplied}
                                            >
                                                {isApplied ? <CheckCircle2 size={20} /> : <Send size={20} />}
                                                {isApplied ? 'Applied' : 'Apply Now'}
                                            </button>
                                        </>
                                    )
                                    : ''
                            }
                        </>
                    )}
                    {isOwnOffer && (
                        <>
                            <button
                                className={`${styles.actionButton} ${styles.primary}`}
                                onClick={handleEdit}
                            >
                                <Edit size={20} />
                                Edit
                            </button>
                            <button
                                className={`${styles.actionButton} ${styles.danger}`}
                                onClick={openDeleteDialog}
                            >
                                <Trash2 size={20} />
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.primaryInfo}>

                    <div className={styles.companyCard}>
                        <h3>About {offer.company.title}</h3>
                        <p>{offer.company.description}</p>
                        <button
                            className={`${styles.actionButton} ${styles.primary}`}
                            onClick={handleMoreOffersClick}
                        >
                            More Offers From {offer.company.title}
                            <ArrowRight size={18} />
                        </button>
                    </div>


                    <div className={styles.infoCard}>
                        <h3>Overview</h3>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <strong>Experience</strong>
                                <span>{offer.experience} years</span>
                            </div>

                            <div className={styles.infoItem}>
                                {offer.salary
                                    ? <>
                                        <strong>Salary Range</strong>
                                        <span className={styles.salary}>{formatSalary(salary)}</span>
                                    </>
                                    : <strong>Salary Not Anounced</strong>
                                }

                            </div>


                            <div className={styles.infoItem}>
                                <strong>Field</strong>
                                <span>{offer.category}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.description}>
                        <h3>Description</h3>
                        <p>{offer.description}</p>
                    </div>

                    <div className={styles.requirements}>
                        <h3>Requirements</h3>
                        <ul>
                            {offer.requirements.split(', ').map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <ConfirmDialog
                id={CONFIRMATION_DIALOG_RESOURCES.OFFER_APPLY_ID}
                isOpen={isApplyDialogOpen}
                onClose={closeApplyDialog}
                onConfirm={handleApply}
                title={CONFIRMATION_DIALOG_RESOURCES.OFFER_APPLY_TITLE}
                confirmButtonText={isApplyLoading ? CONFIRMATION_DIALOG_RESOURCES.OFFER_APPLY_CONFIRM_BUTTON_TEXT_LOADING : CONFIRMATION_DIALOG_RESOURCES.OFFER_APPLY_CONFIRM_BUTTON_TEXT}
                loading={isApplyLoading}
                buttonColor={CONFIRMATION_DIALOG_RESOURCES.MATERIAL_BUTTON_COLOR_PRIMARY}
            />

            <ConfirmDialog
                id={CONFIRMATION_DIALOG_RESOURCES.OFFER_DELETE_ID}
                isOpen={isDeleteDialogOpen}
                onClose={closeDeleteDialog}
                onConfirm={handleOfferDelete}
                title={CONFIRMATION_DIALOG_RESOURCES.OFFER_DELETE_TITLE}
                contentText={CONFIRMATION_DIALOG_RESOURCES.OFFER_DELETE_CONTENT_TEXT}
                confirmButtonText={isDeleteLoading ? CONFIRMATION_DIALOG_RESOURCES.OFFER_DELETE_CONFIRM_BUTTON_TEXT_LOADING : CONFIRMATION_DIALOG_RESOURCES.OFFER_DELETE_CONFIRM_BUTTON_TEXT}
                loading={isDeleteLoading}
            />
        </div>
    );
}

// include company name and logo
// then company description

// Offer fields:
// title, salary, description, requirements

// Interactive interesting Button or image/ icon -> show more jobs offers from this field => leave logic for me

// Order them as you think is most appropriate

// IF (not own) {
// IF (not logged in) {
//     Show call to action to login if the user wants to save or apply
// }
// IF (logged in) {
// IF not saved -> show button save with lucide icon ELSE unsave it  (do not create api requset just the visuals)
// IF not applied - show button apply with lucide icon THAN disable it AND SHOW indicator for that (do not create api requset just the visuals)
// }
// }
// IF (own) {
// show button edit with lucide icon (do not create api requset just the visuals)
// show button delete with lucide icon THEN show confirmation dialog (do not create api requset just the visuals)
// }

// projects has mui/material installed and has used: (saying in order to not install new libraries)
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';