import { AlertCircle, CheckCircle } from 'lucide-react';
import styles from './AccountActionCard.module.scss';

export default function AccountActionCard({
    icon: Icon,
    title,
    status,
    message,
    description,
    buttonText,
    buttonVariant = 'primary', // primary, danger, warning, success
    onClick: onClickHandler,
    isLoading = false,
    loadingText,
    infoText,
    disabled = false,
}) {
    return (
        <div className={styles.actionCard}>
            <div className={styles.cardHeader}>
                {Icon && <Icon size={24} />}
                <h2>{title}</h2>
            </div>

            <div className={styles.cardContent}>
                <p className={styles.description}>{description}</p>

                <button
                    onClick={onClickHandler}
                    disabled={disabled || status === 'loading'}
                    className={`${styles.actionButton} ${styles[buttonVariant]}`}
                >
                    {status === 'loading' ? loadingText : buttonText}
                </button>

                {status === 'success' && (
                    <div className={styles.statusMessage + ' ' + styles.success}>
                        <CheckCircle size={20} />
                        <p>{message}</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className={styles.statusMessage + ' ' + styles.error}>
                        <AlertCircle size={20} />
                        <p>{message}</p>
                    </div>
                )}

                {infoText && (
                    <div className={styles.infoText}>
                        <p>{infoText}</p>
                    </div>
                )}
            </div>
        </div>
    );
};