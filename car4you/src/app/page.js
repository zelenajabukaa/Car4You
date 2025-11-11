import Header from '../app/components/Header';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Header />
      <main className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.logoText}>CAR</span>
            <span className={styles.logoNumber}>4</span>
            <span className={styles.logoText}>YOU</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Ihr zuverlässiger Partner für Autovermietung
          </p>
          <Link href="/rent" className={styles.ctaButton}>
            Auto jetzt mieten
          </Link>
        </div>
      </main>
    </div>
  );
}
