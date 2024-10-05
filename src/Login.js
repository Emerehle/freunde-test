import React from "react";
import Anmeldung from "./components/Anmelden"
import "./Login.css"

export default function App() {
  return (
    <div className="login">
      <Anmeldung />
    <div>
      <a href="/registriere">Passwort vergessen oder neuer User</a>
    </div>
    </div>
  );
}
