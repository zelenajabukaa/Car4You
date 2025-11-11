'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
    const pathname = usePathname();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>CAR</span>
                    <span className={styles.logoNumber}>4</span>
                    <span className={styles.logoText}>YOU</span>
                </Link>

                <nav className={styles.nav}>
                    <Link
                        href="/about"
                        className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}
                    >
                        ABOUT US
                    </Link>
                    <Link
                        href="/rent"
                        className={`${styles.navLink} ${pathname === '/rent' ? styles.active : ''}`}
                    >
                        RENT A CAR
                    </Link>
                    <Link
                        href="/profile"
                        className={`${styles.navLink} ${pathname === '/profile' ? styles.active : ''}`}
                    >
                        My Profile
                    </Link>
                </nav>
            </div>
        </header>
    );
}
