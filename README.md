# 🌊 Maritime Operations Dashboard

This is a full-stack application developed as part of the **Fathom Marine Consultants Full-Stack Developer Assessment**. The app allows users to sign up, log in, and view mock ship data on a responsive dashboard.

### 🔧 Live Demo
- Frontend (Netlify): [maritimeod.netlify.app](https://lively-cascaron-1f549d.netlify.app/login)
- Backend (Render): [maritimeod.onrender.com](https://maritimeod.onrender.com)

---

## 🛠 Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB, JWT, Bcrypt
- **Tools:** Postman (API Testing), Render (Backend Hosting), Netlify (Frontend Hosting)

---

## 🚀 Features

### ✅ Authentication
- Sign up / Login with JWT-based sessions
- Bcrypt-hashed passwords
- Protected routes with middleware
- Error handling (duplicate users, invalid credentials)

### 📊 Dashboard
- Responsive layout (mobile + desktop)
- Welcome message with user name
- Ship data in card and table formats
- Search functionality to filter ships by name
- "Last Updated" timestamp

### 🛰 Marine Data API
- Mock data returned from `/api/ships?name=...`
- Ships include: Name, Type, IMO, Flag
- API does **not use Equasis** due to login requirement

---

## 🖥️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Git

### 🔁 Backend Setup

```bash
git clone https://github.com/aloki9singh/maritimeOD.git
cd maritimeOD/backend
npm install
```

Create a `.env` file in `backend/`:

```
JWT_SECRET=your_secret_key
```

Update MongoDB URI in `server.js` if not using default local MongoDB:

```js
const MONGO_URI = 'mongodb://127.0.0.1:27017/maritime';
```

Start backend:
```bash
npm start
```

### 🔁 Frontend Setup

```bash
cd ../frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Edit Tailwind config:**
```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: [],
};
```

**Edit index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Update API URLs in:**
- `App.jsx`
- `Login.jsx`
- `Signup.jsx`

Replace:
```js
http://localhost:5000
```
With:
```js
https://maritimeod.onrender.com
```

Start frontend:
```bash
npm start
```

---

## 📱 Access on Mobile

- Ensure phone & PC are on the same Wi-Fi
- Use your system IP (like `http://192.168.1.100:3000`) to access on mobile
- Open ports 3000 and 5000 in firewall if needed

---

## 🔍 API Testing (Postman)

Import `Maritime_Dashboard_API.postman_collection.json`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register new user |
| `POST` | `/api/auth/login` | Login & receive JWT |
| `GET`  | `/api/auth/user` | Get user info (requires token) |
| `GET`  | `/api/ships?name=Icon` | Fetch ship data by name |

---

## 📸 Screenshots

- ✅ Dashboard (Desktop & Mobile)
- ✅ Login / Signup pages
- ✅ API testing in Postman  
(Screenshots included in `/screenshots/` folder)

---

## 📁 Project Structure

```
maritimeOD/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── tailwind.config.js
│   └── package.json
├── Maritime_Dashboard_API.postman_collection.json
└── README.md
```

---

## ⚠️ Notes

- Marine data is mocked due to restrictions on Equasis API access.
- React Router is used — Netlify deploy needs `_redirects` file in `/public/`:
  ```
  /* /index.html 200
  ```

---

## 👨‍💻 Author
**Alok Singh** — [GitHub](https://github.com/aloki9singh)

---

## 📜 License
This project is licensed under the ISC License.