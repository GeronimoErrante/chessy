# ♟ Chessy

**Chessy** es una plataforma web para organizar y administrar torneos de ajedrez. El proyecto está compuesto por:

- ⚙️ Backend en **Django**
- 💻 Frontend en **React** (con Vite)
- 🐘 Base de datos **PostgreSQL**
- 🐳 Orquestación mediante **Docker Compose**

Repositorio oficial: [https://github.com/GeronimoErrante/chessy](https://github.com/GeronimoErrante/chessy)

---

## 📦 Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🚀 Guía de instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/GeronimoErrante/chessy.git
cd chessy

```
### 2. Contruir la imagen de los servicios e instalar dependencias
```
docker compose build
docker compose run --rm frontend npm i
```
### 3. Levantar la aplicación completa
```
docker compose up
```

---

## 🔐 Archivos `.env` necesarios

Asegurate de crear los siguientes archivos `.env` antes de levantar los servicios:

### 📁 `frontend/.env`

```env
VITE_APP_API_URL=http://localhost:8000
VITE_APP_API_TIMEOUT=5000

VITE_APP_ENV=development
VITE_APP_ENABLE_AUTH=true
VITE_APP_ENABLE_TOURNAMENTS=true

VITE_APP_WS_URL=ws://localhost:8000/ws/
```

### 📁 `backend/.env`

```env
DEBUG=1
SECRET_KEY=django-insecure-your-secret-key-here-change-in-production
ALLOWED_HOSTS=localhost,127.0.0.1

DATABASE_URL=postgres://postgres:postgres@db:5432/chess_tournament

CORS_ALLOWED_ORIGINS=http://localhost:3000
CORS_ALLOW_CREDENTIALS=True

JWT_SECRET_KEY=your-jwt-secret-key-here-change-in-production
JWT_ACCESS_TOKEN_LIFETIME=5
JWT_REFRESH_TOKEN_LIFETIME=1
```

