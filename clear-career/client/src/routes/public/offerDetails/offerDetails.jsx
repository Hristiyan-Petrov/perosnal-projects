import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import styles from './OfferDetails.module.scss';

export default function OfferDetails() {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const { userRole } = useUserRole();
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const demoOffer = {
        _id: '1',
        title: 'Software Engineer',
        salary: '8000-9000',
        company: {
            name: 'PayHawk',
            imageUrl: '../../public/images/example1.png',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro voluptates sequi illo iusto. Aperiam eveniet expedita at est. At temporibus cupiditate illo voluptatum dignissimos amet modi excepturi in repellat iure quidem cum error, laboriosam vitae ipsam commodi dicta fugit a delectus architecto consequuntur. Enim, explicabo. Temporibus quas magni nam laudantium!'
        },
        field: 'IT',
        experience: 2,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum eum fugit officiis est quam, magnam inventore cupiditate voluptates atque cumque at. Aliquam, amet eum reiciendis eveniet ex hic. Sit consequatur optio mollitiapraesentium fugiat perspiciatis! Sunt distinctio aperiam, sapiente voluptates neque dolores rerum vero vitae saepe beatae earum assumenda molestias nemo? Rerum, atque adipisci praesentium ipsum doloribus quia reprehenderit commodi earum dignissimos laudantium ex nulla, eum debitis doloremque? Libero praesentium mollitia facere non aut distinctio aperiam optio, omnis exercitationem asperiores laboriosam aspernatur nulla fugit repudiandae magni nihil iusto ut cupiditate vero eum? Obcaecati aut quasi nobis laudantium, enim nulla molestiae hic. Repellat qui necessitatibus est similique doloribus, repellendus architecto dolore magnam quaerat quasi maxime, aperiam quia laboriosam quae sequi. Excepturi ipsum quae natus vel minus cupiditate optio adipisci pariatur officia, necessitatibus quibusdam animi, repellat, ipsa illum quasi ad? Laudantium consequatur facere.',
        creator: {
            // auth0Id: user?.sub + 1
            // auth0Id: user?.sub
        },
        requirements: 'JavaScript, React, Node.js, MongoDB, 2+ years experience',
    };

    const isJobSeeker = userRole === 'job-seeker' || false;
    const isOwnOffer = user?.sub === demoOffer.creator?.auth0Id || false;

    const formatSalary = (salary) => {
        const [minSalary, maxSalary] = salary.split('-');
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        return `${formatter.format(minSalary)} - ${formatter.format(maxSalary)}`;
    };

    const handleSaveToggle = () => setIsSaved(!isSaved);  // Handle delete SaveToggle logic
    const handleApply = () => setIsApplied(true);  // Handle delete Apply logic
    const handleEdit = () => navigate(`/offers/${demoOffer._id}/edit`);  // Handle delete Edit logic
    const handleDelete = () => setIsDeleteDialogOpen(true);  // Handle delete Delete logic
    const handleDeleteConfirm = () => {
        setIsDeleteDialogOpen(false);
        // Handle delete logic
    };
    const handleMoreOffersClick = () => navigate(`/offers?field=${demoOffer.field}`);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.companyInfo}>
                    <div className={styles.logoContainer}>
                        <img src={demoOffer.company.imageUrl} alt={demoOffer.company.name} />
                    </div>
                    <div>
                        <h1 className={styles.title}>{demoOffer.title}</h1>
                        <div className={styles.company}>
                            <Building2 size={18} />
                            <span>{demoOffer.company.name}</span>
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
                                        onClick={() => loginWithRedirect()}
                                    >
                                        Sign in to Apply
                                    </button>
                                )
                                : isJobSeeker
                                    ? (
                                        <>
                                            <button
                                                className={`${styles.actionButton} ${styles.primary} ${isSaved ? styles.saved : ''}`}
                                                onClick={handleSaveToggle}
                                            >
                                                {isSaved ? <BookmarkCheck size={20} /> : <BookmarkPlus size={20} />}
                                                {isSaved ? 'Saved' : 'Save'}
                                            </button>
                                            <button
                                                className={`${styles.actionButton} ${styles.primary}`}
                                                onClick={handleApply}
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
                                onClick={handleDelete}
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
                        <h3>About {demoOffer.company.name}</h3>
                        <p>{demoOffer.company.description}</p>
                        <button
                            className={`${styles.actionButton} ${styles.primary}`}
                            onClick={handleMoreOffersClick}
                        >
                            More Offers From {demoOffer.company.name}
                            <ArrowRight size={18} />
                        </button>
                    </div>


                    <div className={styles.infoCard}>
                        <h3>Overview</h3>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <strong>Experience</strong>
                                <span>{demoOffer.experience} years</span>
                            </div>
                            <div className={styles.infoItem}>
                                <strong>Salary Range</strong>
                                <span className={styles.salary}>{formatSalary(demoOffer.salary)}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <strong>Field</strong>
                                <span>{demoOffer.field}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.description}>
                        <h3>Description</h3>
                        <p>{demoOffer.description}</p>
                    </div>

                    <div className={styles.requirements}>
                        <h3>Requirements</h3>
                        <ul>
                            {demoOffer.requirements.split(', ').map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Dialog
                open={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this job offer? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button
                        className={styles.cancelButton}
                        onClick={() => setIsDeleteDialogOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className={styles.confirmDeleteButton}
                        onClick={handleDeleteConfirm}
                    >
                        Delete
                    </button>
                </DialogActions>
            </Dialog>
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