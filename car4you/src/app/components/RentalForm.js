'use client';

import { useState, useEffect } from 'react';
import styles from './RentalForm.module.css';
import Image from 'next/image';

const carCategories = [
    { id: 'city', name: 'City', examples: 'Fiat 500', price: 45, image: '/pics/city.png' },
    { id: 'family', name: 'Family', examples: 'VW Touran', price: 70, image: '/pics/family.png' },
    { id: 'suv', name: 'SUV', examples: 'VW Tiguan', price: 90, image: '/pics/suv.png' },
    { id: 'sport', name: 'Sport', examples: 'Audi TT', price: 120, image: '/pics/sport.png' },
    { id: 'ecar', name: 'E-Car', examples: 'Tesla Model 3', price: 100, image: '/pics/ecar.png' },
];

const colors = ['Schwarz', 'Weiss', 'Grau', 'Blau', 'Rot', 'Silber'];

const extras = [
    { id: 'kindersitz', label: 'Kindersitz', price: 5 },
    { id: 'zusatzfahrer', label: 'Zusatzfahrer', price: 15 },
    { id: 'navi', label: 'Navigationssystem', price: 8 },
    { id: 'dachbox', label: 'Dachbox', price: 20 },
    { id: 'vollkasko', label: 'Vollkasko', price: 25 },
];

export default function RentalForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        pickupDate: '',
        pickupTime: '',
        returnDate: '',
        returnTime: '',
        category: '',
        transmission: 'manual',
        color: '',
        selectedExtras: [],
        priceRange: 60,
        priority: 'price',
        remarks: '',
    });

    const [errors, setErrors] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                selectedExtras: checked
                    ? [...prev.selectedExtras, name]
                    : prev.selectedExtras.filter(item => item !== name)
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    useEffect(() => {
        calculatePrice();
    }, [formData.category, formData.pickupDate, formData.returnDate, formData.selectedExtras]);

    const calculatePrice = () => {
        if (!formData.category || !formData.pickupDate || !formData.returnDate) return;

        const category = carCategories.find(cat => cat.id === formData.category);
        const days = Math.ceil(
            (new Date(formData.returnDate) - new Date(formData.pickupDate)) / (1000 * 60 * 60 * 24)
        );

        let total = category.price * days;

        formData.selectedExtras.forEach(extraId => {
            const extra = extras.find(e => e.id === extraId);
            if (extra) total += extra.price * days;
        });

        setTotalPrice(total);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'Vorname erforderlich';
        if (!formData.lastName.trim()) newErrors.lastName = 'Nachname erforderlich';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Gültige E-Mail-Adresse erforderlich';
        }

        if (!formData.phone.trim()) newErrors.phone = 'Telefonnummer erforderlich';
        if (!formData.pickupDate) newErrors.pickupDate = 'Abholdatum erforderlich';
        if (!formData.pickupTime) newErrors.pickupTime = 'Abholzeit erforderlich';
        if (!formData.returnDate) newErrors.returnDate = 'Rückgabedatum erforderlich';
        if (!formData.returnTime) newErrors.returnTime = 'Rückgabezeit erforderlich';

        if (formData.pickupDate && formData.returnDate) {
            const pickup = new Date(formData.pickupDate + 'T' + formData.pickupTime);
            const returnD = new Date(formData.returnDate + 'T' + formData.returnTime);

            if (returnD <= pickup) {
                newErrors.returnDate = 'Rückgabedatum muss nach Abholdatum liegen';
            }
        }

        if (!formData.category) newErrors.category = 'Bitte wählen Sie eine Kategorie';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Form submitted:', formData);
            alert(`Reservation erfolgreich!\nGesamtpreis: CHF ${totalPrice}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>Fahrzeug Reservieren</h1>

            {/* Hier ist die section für Persönliche Daten */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Persönliche Daten</h2>

                <div className={styles.grid}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Vorname *</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                            placeholder="Max"
                        />
                        {errors.firstName && (
                            <p className={styles.error}>{errors.firstName}</p>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Nachname *</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                            placeholder="Muster"
                        />
                        {errors.lastName && (
                            <p className={styles.error}>{errors.lastName}</p>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>E-Mail-Adresse *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                            placeholder="max.muster@example.com"
                        />
                        {errors.email && (
                            <p className={styles.error}>{errors.email}</p>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Telefonnummer *</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                            placeholder="+41 79 123 45 67"
                        />
                        {errors.phone && (
                            <p className={styles.error}>{errors.phone}</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Hier wird die Mietdauer festgelegt */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Mietdauer</h2>

                <div className={styles.grid}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Abholdatum *</label>
                        <input
                            type="date"
                            name="pickupDate"
                            value={formData.pickupDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            className={`${styles.input} ${errors.pickupDate ? styles.inputError : ''}`}
                        />
                        {errors.pickupDate && (
                            <p className={styles.error}>{errors.pickupDate}</p>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Abholzeit *</label>
                        <input
                            type="time"
                            name="pickupTime"
                            value={formData.pickupTime}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.pickupTime ? styles.inputError : ''}`}
                        />
                        {errors.pickupTime && (
                            <p className={styles.error}>{errors.pickupTime}</p>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Rückgabedatum *</label>
                        <input
                            type="date"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleChange}
                            min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                            className={`${styles.input} ${errors.returnDate ? styles.inputError : ''}`}
                        />
                        {errors.returnDate && (
                            <p className={styles.error}>{errors.returnDate}</p>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Rückgabezeit *</label>
                        <input
                            type="time"
                            name="returnTime"
                            value={formData.returnTime}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.returnTime ? styles.inputError : ''}`}
                        />
                        {errors.returnTime && (
                            <p className={styles.error}>{errors.returnTime}</p>
                        )}
                    </div>
                </div>
            </section>

            {/* hier befindet sich die Fahrzeugwahl */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Fahrzeugwahl</h2>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Fahrzeugkategorie *</label>
                    <div className={styles.categoryGrid}>
                        {carCategories.map((cat) => (
                            <div
                                key={cat.id}
                                className={styles.categoryWrapper}
                                onMouseEnter={() => setHoveredCategory(cat.id)}
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormData(prev => ({ ...prev, category: cat.id }));
                                        setErrors(prev => ({ ...prev, category: '' }));
                                    }}
                                    className={`${styles.categoryCard} ${formData.category === cat.id ? styles.categoryCardActive : ''
                                        }`}
                                >
                                    <div className={styles.categoryName}>{cat.name}</div>
                                    <div className={styles.categoryExample}>{cat.examples}</div>
                                    <div className={styles.categoryPrice}>CHF {cat.price}/Tag</div>
                                </button>

                                {/* Hover Image Tooltip */}
                                {hoveredCategory === cat.id && (
                                    <div className={styles.imageTooltip}>
                                        <Image
                                            src={cat.image}
                                            alt={`${cat.name} Fahrzeug`}
                                            width={300}
                                            height={200}
                                            className={styles.tooltipImage}
                                            priority={false}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {errors.category && (
                        <p className={styles.error}>{errors.category}</p>
                    )}
                </div>

                <div className={styles.grid}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Getriebe *</label>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="transmission"
                                    value="manual"
                                    checked={formData.transmission === 'manual'}
                                    onChange={handleChange}
                                    className={styles.radio}
                                />
                                <span>Manuell</span>
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="transmission"
                                    value="automatic"
                                    checked={formData.transmission === 'automatic'}
                                    onChange={handleChange}
                                    className={styles.radio}
                                />
                                <span>Automatik</span>
                            </label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Fahrzeugfarbe (Optional)</label>
                        <select
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            className={styles.select}
                        >
                            <option value="">Keine Präferenz</option>
                            {colors.map((color) => (
                                <option key={color} value={color}>{color}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>

            {/* hier sind die Extras */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Extras</h2>
                <div className={styles.extrasGrid}>
                    {extras.map((extra) => (
                        <label key={extra.id} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name={extra.id}
                                checked={formData.selectedExtras.includes(extra.id)}
                                onChange={handleChange}
                                className={styles.checkbox}
                            />
                            <span className={styles.checkboxText}>{extra.label}</span>
                            <span className={styles.extraPrice}>+CHF {extra.price}/Tag</span>
                        </label>
                    ))}
                </div>
            </section>

            {/* hier ist das Budget und die Priorität */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Budget & Prioritäten</h2>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Preisrahmen pro Tag: CHF {formData.priceRange}
                    </label>
                    <input
                        type="range"
                        name="priceRange"
                        min="40"
                        max="120"
                        value={formData.priceRange}
                        onChange={handleChange}
                        className={styles.slider}
                    />
                    <div className={styles.sliderLabels}>
                        <span>CHF 40</span>
                        <span>CHF 120</span>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Wichtigste Priorität *</label>
                    <div className={styles.priorityGrid}>
                        {[
                            { value: 'price', label: 'Preis' },
                            { value: 'comfort', label: 'Komfort' },
                            { value: 'sustainability', label: 'Nachhaltigkeit' },
                            { value: 'design', label: 'Design' }
                        ].map((priority) => (
                            <label key={priority.value} className={styles.radioCard}>
                                <input
                                    type="radio"
                                    name="priority"
                                    value={priority.value}
                                    checked={formData.priority === priority.value}
                                    onChange={handleChange}
                                    className={styles.radio}
                                />
                                <span>{priority.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </section>

            {/* hier können Bemerkungen */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Bemerkungen</h2>
                <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    maxLength={250}
                    rows={4}
                    className={styles.textarea}
                    placeholder="Zusätzliche Wünsche oder Informationen..."
                />
                <div className={styles.charCount}>
                    {formData.remarks.length}/250 Zeichen
                </div>
            </section>

            {/* Preis Anzeige */}
            {totalPrice > 0 && (
                <div className={styles.priceBox}>
                    <span className={styles.priceLabel}>Geschätzter Gesamtpreis:</span>
                    <span className={styles.priceAmount}>CHF {totalPrice}</span>
                </div>
            )}

            {/* Submit Button */}
            <button type="submit" className={styles.submitBtn}>
                Jetzt Reservieren
            </button>
        </form>
    );
}
