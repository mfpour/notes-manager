# Notes Manager

## What it does

### Auth
- Register / Login
- JWT authentication
- Logout

### Courses
- Create / edit / delete courses
- See all your courses in one list

### Notes
- Create / edit / delete notes
- Each note belongs to a course
- Filter notes by course

### Files
- Upload a file to a note
- Download attached files
- Automatically remove uploaded files when the related note is deleted

### Markdown editor
- Write notes using Markdown
- Live preview while typing
- Render Markdown correctly when viewing saved notes

### UI
- Dashboard
- Sidebar navigation
- Responsive layout

---

## Stack

**Backend:** Python, Django, Django REST Framework, Simple JWT, SQLite

**Frontend:** React, React Router, Axios, React Markdown, UIW Markdown Editor

**Containerization:** Docker, Docker Compose

---

## Project structure

```
backend/
    accounts/
    courses/
    notes/
    media/
    config/
    Dockerfile

frontend/
    src/
        api/
        layouts/
        pages/
        components/
    Dockerfile

docker-compose.yml
```

---

## How to run it

### Clone

```bash
git clone https://github.com/mfpour/notes-manager
cd notes-manager
```

### Run with Docker

Make sure Docker Desktop is installed and running.

```bash
docker compose up --build
```

After the containers start:

- Frontend: http://localhost:5173
- Backend: http://127.0.0.1:8000

To stop the project:

```bash
docker compose down
```

---

## API 

**Auth**
- Register
- Login
- Logout

**Courses**
- GET
- POST
- PUT
- DELETE

**Notes**
- GET
- POST
- PUT
- DELETE

---

## Pages

- Login
- Register
- Dashboard
- Courses
- Notes