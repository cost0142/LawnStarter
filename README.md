
# SWStarter Fullstack App

This project is a fullstack Star Wars-themed application built with:

- **Frontend**: React (without Vite), styled using SCSS.
- **Backend**: Node.js with Express, connecting to a MySQL database.
- **Dockerized**: Runs using Docker Compose.

## 🔧 Requirements

- Node.js (if running without Docker)
- MySQL (if running without Docker)
- Docker & Docker Compose (recommended)

---

## 🚀 How to Run

## Quick Start

1) cd backend
   brew install colima

Starts Colima (with Dockes Support):
1.1) colima start

	x86_64
1.2) colima start --arch x86_64 --memory 4

2) cd .. 
	 docker-compose up --build

3) npm install --legacy-peer-deps

4) cd frontend
   npm start


### Option 1: Docker (Recommended)

> This will start the backend, MySQL, and optionally the frontend (if configured).


1. Run the following command from the project root:

```bash
docker-compose up --build
```

3. Backend: [http://localhost:3001](http://localhost:3001)
4. Frontend: [http://localhost:3000](http://localhost:3000) (if configured)

### Option 2: Manual Setup (Frontend & Backend separately)

---

## 📦 Backend

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Start the server

```bash
npm start
```

### 3. Test the API

Test using:

```
curl -X POST http://localhost:3001/api/metrics   -H "Content-Type: application/json"   -d '{"metric_type":"search","metric_data":"Skywalker"}'
```

---

## 💻 Frontend

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Start the application

```bash
cd 
```

Then open:

[http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
project-root/
│
├── backend/
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   └── database/
│
├── frontend/
│   ├── src/
│   │   ├── Pages/
│   │   ├── components/
│   │   ├── styles/
│   │   └── ...
│   └── package.json
│
└── docker-compose.yml
```

---

## 📘 Notes

- Make sure MySQL is running and accessible if not using Docker.
- The database schema is created automatically on the first request if missing.
- All metrics are stored in the `metrics` table in the MySQL database.

---

## 🧑‍💻 Author

Developed by Hygor Costa.












