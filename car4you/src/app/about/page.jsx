import Header from '../components/Header';
import styles from './about.module.css';

export default function AboutPage() {
    return (
        <div>
            <Header />
            <main className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Über CAR4YOU</h1>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Wer wir sind</h2>
                        <p className={styles.text}>
                            CAR4YOU ist Ihr vertrauenswürdiger Partner für flexible und komfortable
                            Autovermietung in der Schweiz. Seit unserer Gründung setzen wir auf
                            Qualität, Transparenz und erstklassigen Kundenservice.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Unsere Mission</h2>
                        <p className={styles.text}>
                            Wir möchten jedem Kunden das perfekte Fahrzeug für seine Bedürfnisse
                            bereitstellen – ob für Geschäftsreisen, Familienurlaub oder spontane
                            Wochenendausflüge. Mit einer vielfältigen Fahrzeugflotte und einem
                            einfachen Buchungsprozess machen wir Mobilität unkompliziert.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Unsere Fahrzeugkategorien</h2>
                        <div className={styles.categoryList}>
                            <div className={styles.categoryItem}>
                                <h3>City</h3>
                                <p>Kompakte Stadtautos für urbane Mobilität</p>
                                <span className={styles.price}>Ab CHF 45/Tag</span>
                            </div>
                            <div className={styles.categoryItem}>
                                <h3>Family</h3>
                                <p>Geräumige Familienautos mit viel Platz</p>
                                <span className={styles.price}>Ab CHF 70/Tag</span>
                            </div>
                            <div className={styles.categoryItem}>
                                <h3>SUV</h3>
                                <p>Robuste SUVs für jedes Gelände</p>
                                <span className={styles.price}>Ab CHF 90/Tag</span>
                            </div>
                            <div className={styles.categoryItem}>
                                <h3>Sport</h3>
                                <p>Sportliche Fahrzeuge für besondere Anlässe</p>
                                <span className={styles.price}>Ab CHF 120/Tag</span>
                            </div>
                            <div className={styles.categoryItem}>
                                <h3>E-Car</h3>
                                <p>Nachhaltige Elektrofahrzeuge</p>
                                <span className={styles.price}>Ab CHF 100/Tag</span>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Warum CAR4YOU?</h2>
                        <ul className={styles.benefitsList}>
                            <li>✓ Große Auswahl an gepflegten Fahrzeugen</li>
                            <li>✓ Transparente Preise ohne versteckte Kosten</li>
                            <li>✓ Flexible Mietzeiten</li>
                            <li>✓ 24/7 Kundenservice</li>
                            <li>✓ Einfache Online-Buchung</li>
                            <li>✓ Versicherungsoptionen für sorgenfreies Fahren</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Kontakt</h2>
                        <div className={styles.contactInfo}>
                            <p><strong>Adresse:</strong> Musterstrasse 123, 8400 Winterthur</p>
                            <p><strong>Telefon:</strong> +41 52 123 45 67</p>
                            <p><strong>E-Mail:</strong> info@car4you.ch</p>
                            <p><strong>Öffnungszeiten:</strong> Mo-Fr 08:00-18:00, Sa 09:00-16:00</p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
