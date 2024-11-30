import bcrypt from 'bcryptjs';
import { useState } from 'react';

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        vorname: '',
        nachname: '',
        geschlaecht: '',
        geborenam: '',
        benutzername: '',
        passwort: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Geburtsdatum validieren
        const isFutureDate = new Date(formData.geborenam) > new Date();
        if (isFutureDate) {
            alert("Das Geburtsdatum darf nicht in der Zukunft liegen.");
            return;
        }

        // Passwort verschlüsseln
        const hashedPassword = await bcrypt.hash(formData.passwort, 10);

        // Geburtsdatum formatieren
        const formattedDate = new Date(formData.geborenam).toISOString().split('T')[0];

        const submissionData = {
            ...formData,
            geborenam: formattedDate,
            passwort: hashedPassword
        };

        try {
            const response = await fetch('http://localhost:8080/api/insertUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submissionData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Erfolgreich registriert:', result);
            } else {
                const error = await response.json();
                console.error('Registrierung fehlgeschlagen:', error.message || 'Unbekannter Fehler');
            }
        } catch (err) {
            console.error('Fehler bei der Anfrage:', err);
        }
    };

    return (
        <div>
            <h1>Registrierung</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        Vorname:
                        <input type="text" name="vorname" value={formData.vorname} onChange={handleChange} required />
                    </li>
                    <li>
                        Nachname:
                        <input type="text" name="nachname" value={formData.nachname} onChange={handleChange} required />
                    </li>
                    <li>
                        Geschlecht:
                        <select name="geschlaecht" value={formData.geschlaecht} onChange={handleChange} required>
                            <option value="">Bitte wählen...</option>
                            <option value="Männlich">Männlich</option>
                            <option value="Weiblich">Weiblich</option>
                        </select>
                    </li>
                    <li>
                        Geboren am:
                        <input type="date" name="geborenam" value={formData.geborenam} onChange={handleChange} required />
                    </li>
                    <li>
                        Benutzername:
                        <input type="text" name="benutzername" value={formData.benutzername} onChange={handleChange} required />
                    </li>
                    <li>
                        Passwort:
                        <input
                            type="password"
                            name="passwort"
                            value={formData.passwort}
                            onChange={handleChange}
                            pattern=".{8,}"
                            title="Passwort muss mindestens 8 Zeichen lang sein."
                            required
                        />
                    </li>
                    <li>
                        E-Mail:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </li>
                </ul>
                <button type="submit" disabled={!formData.vorname || !formData.email || !formData.passwort}>
                    Registrieren
                </button>
            </form>
        </div>
    );
}
