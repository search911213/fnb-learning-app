# Event Program QR SaaS  

This project is a SaaS platform that allows event organizers to upload their event programs and share them digitally via a **QR code**. Attendees can simply scan the QR code and view the event program on their phones, reducing the need for printed copies.

---

## 📂 Project Structure  

/project-root
/backend → Node.js + Express (API & file storage)
/frontend → React (user interface for uploading & viewing programs)
README.md


---

## ✨ Features (MVP)  
- Upload event program (PDF, DOCX, or text-based content)  
- Generate a unique link & QR code for the program  
- Attendees scan QR code to access the program instantly  
- Mobile-friendly frontend for easy access  

---

## 🛠 Tech Stack  
- **Frontend:** React (Create React App)  
- **Backend:** Node.js + Express  
- **Database (planned):** MongoDB or Firebase (for events & program data)  
- **QR Generation:** [`qrcode`](https://www.npmjs.com/package/qrcode) npm package  

---

## 🚀 Running Locally  

### 1. Clone the repo  
```bash
git clone <repo-url>
cd project-root


Start the Backend

cd backend
npm install
npm start

Runs at http://localhost:5000

3. Start the Frontend

cd frontend
npm install
npm start

Runs at http://localhost:3000

4. Usage Flow

Organizer uploads a program via the frontend

Backend generates a unique link & QR code

QR code is displayed and can be shared/printed

Attendees scan QR to view the event program



📌 Next Steps

Add user authentication (organizers sign in)

Store programs in cloud storage (AWS S3, Firebase, or GCP)

Build an admin dashboard to manage uploaded programs

Add analytics (track QR code scans & views)

License

This project is licensed under the MIT License – feel free to use and modify.


---

✅ This way Copilot, contributors, and even potential testers immediately understand what the app is, how it’s structured, and how to run it.  

Do you want me to also **set up a backend skeleton folder** (`/backend`) with a basic Express server so you don’t just have frontend code sitting there? That way, your project structure matches this README exactly.
