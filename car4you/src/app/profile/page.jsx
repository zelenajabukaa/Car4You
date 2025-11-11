import Header from '../components/Header';
import styles from './profile.module.css';

export default function ProfilePage() {
    return (
        <div>
            <Header />
            <main className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Mein Profil</h1>
                    <p className={styles.text}>
                        Diese Seite befindet sich noch in Entwicklung.
                    </p>
                </div>
            </main>
        </div>
    );
}
