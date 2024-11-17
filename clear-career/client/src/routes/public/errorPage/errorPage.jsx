import { ERROR_MESSAGES } from '../../../constants/messages';
import styles from './errorPage.module.scss';
import { useNavigate, useRouteError } from "react-router-dom";


export default function ErrorPage({
    message = ERROR_MESSAGES.defaultMessage,
    errorCode = ERROR_MESSAGES.defaultCode
}) {
    const error = useRouteError();
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate('/');
    }

    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorContent}>
                <h1 className={styles.errorCode}>{error.status || errorCode}</h1>
                <p className={styles.errorMessage}>{error.statusText || message}</p>
                <p className={styles.errorDescription}>
                    {error.data || ERROR_MESSAGES.defaultDescription}
                </p>
                <button className={styles.retryButton} onClick={handleGoHome}>
                    Go to Home
                </button>
            </div>
            <div className={styles.animation}>
                <div className={styles.animatedIcon}>🚀</div>
            </div>
        </div>
    );
}