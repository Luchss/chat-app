# Chat App

Ein moderner Fullstack-Chat mit Benutzerverwaltung

## Features
- Registrierung & Login mit Passwort-Hashing
- Profilverwaltung (Username, E-Mail, Passwort ändern)
- Echtzeit-Chat mit WebSockets
- Nachrichtenverlauf (letzte 50 Nachrichten)
- Fehlerbehandlung & Validierung (Frontend & Backend)
- Logout-Funktion

## Technologien
- **Frontend:** React, React Context, React Router, Axios, CSS
- **Backend:** Node.js, Express, express-validator, bcrypt, WebSocket (ws)
- **Datenbank:** MySQL (über mysql2)

## Projektstruktur
```
backend/
  server.js         # Express-Server & WebSocket-Server
  users.js          # Datenbankfunktionen
  validation/       # Validierungsschemas
frontend/
  src/
    components/     # React-Komponenten (Chat, Login, Register, Profile, Navbar)
    context/        # AuthContext für Login-State
    styles/         # CSS-Dateien
```

### Voraussetzungen
- Node.js (empfohlen: v18+)
- MySQL-Server (Datenbank anlegen, Zugangsdaten in backend/db.js eintragen)

### Projekt starten
Im Hauptverzeichnis (`Chat App`) ausführen:
```powershell
npm start
```

Frontend und Backend werden automatisch gestartet.

Frontend läuft auf [http://localhost:3000](http://localhost:3000)
Backend auf [http://localhost:3001](http://localhost:3001)

## Screenshots
/

## Hinweise
- Keine echten Passwörter oder sensible Daten in das Repository hochladen!
- Für produktive Nutzung sollten Authentifizierung und Sicherheit weiter verbessert werden (z.B. JWT, HTTPS).

## Lizenz
Dieses Projekt ist zu Lernzwecken entstanden.
