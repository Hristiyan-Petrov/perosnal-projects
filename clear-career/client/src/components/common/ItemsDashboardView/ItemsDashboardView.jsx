import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import DashboardCardView from "../DashboardCardView/DashboardCardView";
import styles from './ItemsDashboardView.module.scss';

export default function ItemsDashboardView({
    loading = false,
    items = [],
    emptyMessage,
    buttonLabel,
    buttonClickHandler,
    title,
    type,
}) {
    if (loading) return <LoadingAnimation />;

    if (items.length === 0) {
        return (
            <div>
                <h2>{emptyMessage}</h2>
                {buttonLabel && buttonClickHandler && (

                    <div className={styles.btnContainer}>
                        <button
                            className={`${styles.btn} ${styles.large} ${styles.centered} ${styles.pulse}`}
                            onClick={buttonClickHandler}
                        >
                            {buttonLabel}
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <h2>{title}</h2>
            <div className={styles.offersContainer}>
                {items.map(item => (
                    <DashboardCardView
                        key={item._id}
                        type={type}
                        {...item}
                    />
                ))}
            </div>
            {buttonLabel && buttonClickHandler && (
                <div className={styles.btnContainer}>
                    <button className={styles.btn} onClick={buttonClickHandler}>
                        {buttonLabel}
                    </button>
                </div>
            )}
        </div>
    );
}