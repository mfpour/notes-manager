import { useEffect, useState } from "react";
import api from "../api/axios";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [courses, setCourses] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [course, setCourse] = useState("");
  const [file, setFile] = useState(null);

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchNotes();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/courses/");
      setCourses(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await api.get("/notes/");
      setNotes(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCourse("");
    setFile(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !course) return;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("course", course);

    if (file) {
      formData.append("file", file);
    }

    try {
      if (editingId) {
        await api.put(`/notes/${editingId}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.post("/notes/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      resetForm();
      fetchNotes();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setCourse(note.course);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}/`);
      fetchNotes();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div>
      <h1>Notes</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br />

        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          <option value="">Select Course</option>

          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>

        <br />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br />

        <button type="submit">
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </form>

      <hr />

      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.file}</p>

              <p>{note.content}</p>

              {note.file && (
                <a
                  href={`http://127.0.0.1:8000${note.file}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download File
                </a>
              )}

              <br />

              <button onClick={() => handleEdit(note)}>
                Edit
              </button>

              <button onClick={() => handleDelete(note.id)}>
                Delete
              </button>

              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notes;