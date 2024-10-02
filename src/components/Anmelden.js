import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Anmelden.css';

export default function Anmeldung() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // API-Anfrage an den Server senden
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ benutzername: username, passwort: password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Wenn der Login erfolgreich ist, weiterleiten
        navigate('/way'); 
      } else {
        // Fehlermeldung vom Server anzeigen
        setErrorMessage(data.message || 'Login fehlgeschlagen');
      }
    } catch (error) {
      console.error('Fehler beim Login:', error);
      setErrorMessage('Es gab ein Problem beim Login');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Benutzername:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Passwort:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Einloggen</button>
      </form>
    </div>
  );
}
