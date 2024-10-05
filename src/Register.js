import bcrypt from 'bcryptjs';
import { useState } from 'react';

export default function RegistrationForm() {
        const [formData, setFormData] = useState({
          vorname: '',
          nachname: '',
          geschlaecht: '',
          geborenam: '',
          benutzername: '',
          passwort: ''
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
          
    // Verschlüssele das Passwort mit bcrypt
    const hashedPassword = await bcrypt.hash(formData.passwort, 10);

    // Datum im Format jj-mm-tt umwandeln
    const formattedDate = new Date(formData.geborenam).toISOString().split('T')[0];

// Formulardaten an das Backend senden
    const submissionData = {
      ...formData,
      geborenam: formattedDate, // Datum im richtigen Format
      passwort: hashedPassword
        };

        try {
            // Sende die Daten an das Backend
            const response = await fetch('http://localhost:8080/api/insertUser', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(submissionData) // Sende die Daten als JSON
            });
      
            if (response.ok) {
              const result = await response.json();
              console.log('Erfolgreich registriert:', result);
              // Optional: Erfolgsmeldung oder Weiterleitung
            } else {
              console.error('Registrierung fehlgeschlagen');
            }
          } catch (err) {
            console.error('Fehler bei der Anfrage:', err);
          }
        };

    return (
        <div>
            <div>
                <h1>Registrierung</h1>
            </div>
            <form onSubmit={handleSubmit}>
            <div>
                <p>Bitte geben Sie an:</p>
                <ul>
                    <li>Vorname: 
                        <input 
                        type='text' 
                        name='vorname' 
                        value={formData.vorname}
                        onChange={handleChange}
                        required 
                        />
                    </li>
                    <li>Nachname: 
                        <input 
                        type='text' 
                        name='nachname'
                        value={formData.nachname}
                        onChange={handleChange}
                        required 
                        />
                    </li>
                    <li>Geschlecht: 
                        <select
                        name='geschlaecht' 
                        value={formData.geschlaecht}
                        onChange={handleChange}
                        required>
                            <option value="">Bitte wählen...</option>
                            <option value="Männlich">Männlich</option>
                            <option value="Weiblich">Weiblich</option>
                        </select>
                    </li>
                    <li>Geboren am: 
                        <input 
                        type='date'
                        name='geborenam' 
                        value={formData.geborenam}
                        onChange={handleChange}
                        required 
                        />
                    </li>
                    <li>Benutzername: 
                        <input 
                        type='text' 
                        name='benutzername' 
                        value={formData.benutzername}
                        onChange={handleChange}
                        required 
                        />
                    </li>
                    <li>Passwort: 
                        <input 
                        type='password' 
                        name='passwort' 
                        value={formData.passwort}
                        onChange={handleChange}
                        required 
                        />
                    </li>
                </ul>
            </div>
            <div>
                <button type='submit'>Registrieren</button>
            </div>
            </form>
        </div>
    );
}
