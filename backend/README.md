
# 🎥 BookingMovieShow

A modern, full-featured web application for booking movie tickets online. Users can explore movies, view show schedules, and securely book tickets, while admins manage movies, shows, and bookings through a robust backend interface.

![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-In%20Development-orange)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)
![React](https://img.shields.io/badge/Frontend-Vite%20+%20React-61DAFB)

---

## 📑 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Routes](#-api-routes)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Authors](#-authors)
- [License](#-license)

---

## ✨ Features

- **🔐 Secure Authentication**: JWT-based user and admin authentication
- **👥 Role-Based Access**: Separate interfaces for users and admins
- **🎬 Movie & Show Management**: Browse movies and view show schedules
- **🧾 Seamless Booking**: Book tickets with real-time availability
- **💳 Payment Integration**: Secure payments via Stripe
- **📧 Email Notifications**: Automated booking confirmations using NodeMailer
- **🌐 Scalable Deployment**: Ready for Vercel with optimized configurations

---

## 📂 Project Structure

```
BookingMovieShow/
├── backend/                  # Backend source code
│   ├── configs/              # Database and email configurations
│   ├── controllers/          # Core business logic (admin, booking, user, show)
│   ├── inngest/              # Event-driven async task handling
│   ├── middleware/           # Authentication and validation middleware
│   ├── models/               # Mongoose schemas (User, Movie, Show, Booking)
│   ├── routes/               # Express API routes
│   ├── server.js             # Backend entry point
│   └── vercel.json           # Vercel deployment configuration
├── frontend/                 # Frontend source code
│   ├── public/               # Static assets (images, icons)
│   ├── src/                  # React components and logic
│   ├── vite.config.js        # Vite bundler configuration
│   ├── index.html            # Root HTML file
│   └── vercel.json           # Vercel deployment configuration
```

---

## 🛠️ Tech Stack

| Layer       | Technology          |
|-------------|---------------------|
| **Frontend** | React + Vite        |
| **Backend**  | Node.js + Express   |
| **Database** | MongoDB + Mongoose  |
| **Auth**     | JWT                 |
| **Payments** | Stripe              |
| **Email**    | NodeMailer          |
| **Deployment** | Vercel            |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 16.x)
- MongoDB (local or cloud instance)
- Git

### Clone the Repository
```bash
git clone https://github.com/YogeshKumar-saini/BookingMovieShow.git
cd BookingMovieShow
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure with your credentials
npm start
```

### Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory with the following:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

> **Note**: Ensure sensitive data like `STRIPE_SECRET_KEY` and `JWT_SECRET` are kept secure.

---

## 🌐 API Routes

| Method | Endpoint               | Description                  |
|--------|------------------------|------------------------------|
| POST   | `/api/auth/register`   | Register a new user          |
| POST   | `/api/auth/login`      | Login and receive JWT token  |
| GET    | `/api/movies`          | Fetch all available movies   |
| POST   | `/api/bookings`        | Create a new booking         |
| GET    | `/api/shows/:id`       | Get show details by ID       |
| POST   | `/api/stripe/webhook`  | Handle Stripe events         |

---

## 📸 Screenshots

![Homepage](frontend/public/homepage.png)
![Booking Page](frontend/public/booking.png)

> Place screenshot images in `frontend/public/` to display them here.

---

## 🌍 Deployment

The application is optimized for deployment on [Vercel](https://vercel.com/). Use the provided `vercel.json` files in `frontend/` and `backend/` for seamless configuration.

1. Push the repository to GitHub.
2. Connect to Vercel and deploy the `frontend/` and `backend/` directories as separate projects.
3. Configure environment variables in Vercel’s dashboard.

---

## 👨‍💻 Authors

- **Yogesh Saini** – [GitHub](https://github.com/YogeshKumar-saini)

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

