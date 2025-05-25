
# ENSA Events Management System

A full-stack web application for managing events at ENSA (École Nationale des Sciences Appliquées). Built with a Laravel RESTful API backend and a ReactJS frontend, it supports multi-role authentication and robust CRUD functionality.

## Home Page
![ENSA Events Screenshot](/images/Home.png)

## Dashboard
![ENSA Events Screenshot](/images/Dashboard.png)

## 🚀 Features

### 👤 User (Student) Portal

* View all upcoming events
* Filter and search events by category
* View event details
* Register and cancel registration for events
* View registered events in their profile
* Update personal information (e.g., name)

### 🔐 Admin Panel

* Access dashboard with event statistics
* Create, update, and delete events
* Upload event images and manage capacity
* View registered students per event
* Update admin profile information

## Architecture
![Image](https://github.com/user-attachments/assets/08daa363-b1d3-4547-9c8e-780352a9b196)

## 🛠️ Tech Stack

### Backend

* **Framework:** Laravel 10
* **Authentication:** Laravel Sanctum
* **Database:** MySQL
* **Routing:** RESTful API (via routes/api.php)

### Frontend

* **Framework:** React + Vite
* **UI:** Tailwind CSS
* **Routing:** React Router DOM
* **HTTP Requests:** Axios


## 🧱 System Requirements

* PHP >= 8.0
* Composer
* Node.js >= 14
* npm or yarn
* MySQL >= 5.7

## 🧩 Installation Instructions

### 🔧 Backend (Laravel)

```bash
# Clone the repository
git clone https://github.com/azzehy/ensa-events.git
cd ensa-events/backend

# Install dependencies
composer install

# Create environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env file
# Run migrations and seeders
php artisan migrate --seed

# Install Laravel Sanctum (already installed if using Laravel Breeze or Jetstream)
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Serve the backend
php artisan serve
```

### 🌐 Frontend (React)

```bash
# Go to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📁 Project Structure Overview

```
ensa-events/
├── backend/ (Laravel API)
│   ├── app/
│   ├── routes/
│   │   └── api.php
│   ├── database/
│   └── ...
└── frontend/ (React App)
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    └── ...
```

## 🔐 Authentication & Authorization

* Laravel Sanctum for API authentication
* Role-based access:

  * **Admin**: Full access to all CRUD operations
  * **User**: Can view and register for events only
* Profile updates available for both roles

## 📡 API Endpoints (Excerpt)

| Method | URI                                  | Description                     |
| ------ | ------------------------------------ | ------------------------------- |
| GET    | /api/events                          | List all events                 |
| GET    | /api/events/{id}                     | Show event details              |
| POST   | /api/events/register                 | Register for event              |
| DELETE | /api/events/register                 | Cancel registration             |
| GET    | /api/admin/events                    | Admin: List all events          |
| POST   | /api/admin/events                    | Admin: Create event             |
| PUT    | /api/admin/events/{id}               | Admin: Update event             |
| DELETE | /api/admin/events/{id}               | Admin: Delete event             |
| GET    | /api/admin/events/{id}/registrations | Admin: View event registrations |
| POST   | /api/register                        | Register new user               |
| POST   | /api/login                           | Login                           |
| POST   | /api/logout                          | Logout                          |
| PUT    | /api/profile                         | Update user/admin profile       |
| GET    | /api/user/events                     | View user-registered events     |

## 🧪 Sample SQL

The `ensa_events.sql` file is included to help you set up your database structure quickly, including tables for `users`, `events`, and `registrations`.

## 🤪 Demo Credentials

| Role  | Email                                   | Password |
| ----- | --------------------------------------- | -------- |
| Admin | [admin@ensa.ma](mailto:admin@ensa.ma) | password123 |
| User  | [student@ensa.ma](mailto:user@ensa.ma)   | password123  |

*(You can change or add accounts in the database or seeder file.)*


## 📹 Demo Video

* 🎥 ![Demo video](/images/ENSAEVENTS.mp4)


## 🧑‍🤝‍🧑 Contributors

* [Younes Azzehizi](https://github.com/azzehy)
* [Amira Mariam Elazizi](https://github.com/amiraelazizi04)

---

For any setup help or issues, feel free to open an issue on the repository.
