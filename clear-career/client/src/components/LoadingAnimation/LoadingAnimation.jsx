import styles from './LoadingAnimation.module.scss';

export default function LoadingAnimation() {
    return (
        <div className={styles.loadingAnimationContainer}>
            <div className={styles.loadingCircle}></div>
        </div>
    )
}