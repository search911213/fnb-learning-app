# Event Program QR SaaS

This project is a SaaS platform that allows event organizers to upload their event programs and share them digitally via a **QR code**. Attendees can simply scan the QR code and view the event program on their phones, reducing the need for printed copies.

---

## Project structure

/project-root
/backend → Node.js + Express (API & file storage)
/frontend → React (user interface for uploading & viewing programs)

---

## Features (MVP)

- Upload event program (PDF, DOCX, or text-based content)
- Generate a unique link & QR code for the program
- Attendees scan QR code to access the program instantly
- Mobile-friendly frontend for easy access

---

## Tech stack

- Frontend: React (Create React App)
- Backend: Node.js + Express
- Database: MongoDB (local or cloud)
- QR generation: qrcode npm package

---

## Running locally

1. Start the backend

```powershell
cd backend
npm install
npm start
```

Runs at http://localhost:5000

2. Start the frontend

```powershell
cd frontend
npm install
npm start
```

Runs at http://localhost:3000

---

## Next steps

- Add user authentication for organizers
- Store programs in cloud storage (S3 / Firebase)
- Add analytics to track QR scans

---

License: MIT
