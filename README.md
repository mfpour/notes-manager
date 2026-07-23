# Notes Manager


## What it does

### Auth
- Register / Login
- JWT authentication
- Logout (properly clears the session)

### Courses
- Create / edit / delete courses
- See all your courses in one list

### Notes
- Create / edit / delete notes
- Each note belongs to a course
- You can filter notes by course

### Files
- Upload a file to a note
- Download it later
- If you delete the note, the file gets deleted too (didn't want leftover junk in the media folder)

### Markdown editor
- Notes are written in Markdown
- There's a live preview while typing
- When you open a saved note it renders properly instead of showing raw text

### UI
- Dashboard
- Sidebar to browse courses
- Navbar
- Tried to make it responsive, works okay on smaller screens too

---

## Stack

**Backend:** Python, Django, Django REST Framework, Simple JWT, SQLite

**Frontend:** React, React Router, Axios, React Markdown, UIW Markdown Editor

---

## Project structure

```
backend/
    accounts/
    courses/
    notes/
    media/
    config/

frontend/
    src/
        api/
        layouts/
        pages/
        components/
```

---

## How to run it

### Clone

```bash
git clone https://github.com/YOUR_USERNAME/academic-notes-manager.git
```

### Backend

Make a virtual environment first:

```bash
python -m venv .venv
```

Activate it.

Windows:
```bash
.venv\Scripts\activate
```

Linux / macOS:
```bash
source .venv/bin/activate
```

Install requirements and run migrations:

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
npm install
npm run dev
```

---

## URLs

- Frontend: `http://localhost:5173`
- Backend: `http://127.0.0.1:8000`

---

## API (quick overview)

**Auth:** register, login, logout

**Courses:** GET, POST, PUT, DELETE

**Notes:** GET, POST, PUT, DELETE

---

## Pages

- Login
- Register
- Dashboard
- Courses
- Notes

