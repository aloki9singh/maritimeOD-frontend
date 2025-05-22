Maritime Operations Dashboard
This project is a full-stack application developed for the Fathom Marine Consultants Full-Stack Developer Assessment. It includes user authentication, a responsive dashboard displaying marine data, and a mock API for ship details. The app is built to be accessible on both desktop and mobile devices.
Tech Stack

Backend: Node.js, Express, MongoDB, bcrypt, JWT
Frontend: React, React Router, Tailwind CSS, Axios
Tools: Postman for API testing

Features

User Authentication:
Signup and login with email and password.
Passwords are hashed using bcrypt.
JWT is used for session management.
Error handling for duplicate users, invalid credentials, etc.


Dashboard:
Responsive layout with a top navbar (hamburger menu on mobile).
Welcome message displaying the user's name after login.
Displays marine data in both card and table formats.
Cards show ship details (Name, Type, IMO, Flag) in a grid layout.
Table provides a detailed view of ship data, scrollable on mobile.
Includes a search feature to filter ships by name.
Shows a "Last updated" timestamp for data freshness.


Marine Data API:
Mock API (/api/ships) to fetch ship details by name.
Returns mock data since the Equasis website (https://www.equasis.org) requires authentication.


Responsiveness:
Fully responsive design using Tailwind CSS.
Navbar switches to a hamburger menu on mobile.
Forms and tables are touch-friendly and adapt to screen sizes.



Setup Instructions
Prerequisites

Node.js (v16 or higher)
MongoDB (local or cloud instance)
Git

Backend Setup

Clone the repository:git clone <your-repo-link>
cd maritime-dashboard


Navigate to the backend directory:cd backend


Install dependencies:npm install


Create a .env file in the backend directory with:JWT_SECRET=your_jwt_secret_key

Replace your_jwt_secret_key with a secure key (e.g., a random string).
Start MongoDB locally or update the MongoDB connection string in server.js if using a cloud instance (default: mongodb://127.0.0.1:27017/maritime).
Run the backend:npm start

The server runs on http://<your-ip>:5000 (e.g., http://192.168.1.100:5000). Find your local IP address using ipconfig (Windows) or ifconfig (Mac/Linux).

Frontend Setup

Navigate to the frontend directory:cd frontend


Install dependencies, including Tailwind CSS:npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


Update the API URLs in App.jsx, Login.jsx, and Signup.jsx:
Replace http://<your-ip>:5000 with your local IP address (e.g., http://192.168.1.100:5000).
Example in Login.jsx:const res = await axios.post('http://192.168.1.100:5000/api/auth/login', { email, password });




Ensure tailwind.config.js includes:module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: [],
};


Ensure src/index.css includes:@tailwind base;
@tailwind components;
@tailwind utilities;


Start the frontend:npm start

The app runs on http://<your-ip>:3000 (e.g., http://192.168.1.100:3000).

Accessing on Mobile

Ensure your phone is on the same Wi-Fi network as your development machine.
Use your local IP address to access the app (e.g., http://192.168.1.100:3000 on your phone’s browser).
Update firewall settings if needed to allow ports 3000 and 5000.

API Testing

Import the Maritime_Dashboard_API.postman_collection.json (located in the project root) into Postman.
Test the following endpoints:
POST http://<your-ip>:5000/api/auth/signup: Create a new user (e.g., { "name": "John Doe", "email": "john@example.com", "password": "password123" }).
POST http://<your-ip>:5000/api/auth/login: Login and get JWT (e.g., { "email": "john@example.com", "password": "password123" }).
GET http://<your-ip>:5000/api/auth/user: Get user info (requires Bearer token in headers).
GET http://<your-ip>:5000/api/ships?name=<ship_name>: Get ship details (e.g., ?name=Icon).


Screenshots of API testing are included in the screenshots/ directory (if applicable).

Usage

Signup: Go to http://<your-ip>:3000/signup, enter your name, email, and password, and submit. You’ll be redirected to the dashboard.
Login: Go to http://<your-ip>:3000/login, enter your email and password, and submit. You’ll be redirected to the dashboard.
Dashboard:
View the welcome message ("Welcome, ").
Search for ships by name (e.g., "Icon").
View ship details in both card and table formats.
Check the "Last updated" timestamp for data freshness.
Use the navbar (hamburger menu on mobile) to navigate or logout.



Screenshots

Desktop View: Dashboard with navbar, cards, and table.
Mobile View: Login page, dashboard with hamburger menu open.
API Testing: Screenshots of Postman requests (signup, login, ship data).
(Located in the screenshots/ directory or submitted separately.)

Notes

The Equasis website (https://www.equasis.org) requires authentication, so a mock API was implemented with sample ship data (e.g., "Icon of the Seas", Type: "Cruise Ship", IMO: "1234567", Flag: "Bahamas").
Tailwind CSS is installed as a dependency for better performance and offline development.
The app is fully responsive, with a hamburger menu for mobile views, touch-friendly forms, and a scrollable table.
The code is modularized with separate files for routes, models, and middleware in the backend, and clear component separation in the frontend.

Folder Structure
maritime-dashboard/
├── backend/
│   ├── middleware/
│   │   ├── auth.js
│   │   └── error.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── ships.js
│   ├── server.js
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── ErrorAlert.jsx
│   │   ├── index.jsx
│   │   ├── index.css
│   │   └── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── ...
├── Maritime_Dashboard_API.postman_collection.json
└── README.md

https://maritimeod.onrender.com/