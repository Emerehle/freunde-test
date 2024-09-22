import bcrypt from 'bcryptjs';
import { useState } from 'react';

export default function Register() {
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Das Passwort hashen, bevor es an den Server gesendet wird
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Hier sendest du das gehashte Passwort an deinen Backend-Server
        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ passwort: hashedPassword }),
        });

        const data = await response.json();
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passwort eingeben"
            />
            <button type="submit">Registrieren</button>
        </form>
    );
}
