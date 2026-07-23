import { useEffect, useState } from "react";
import api from "../api/axios";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [courses, setCourses] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [course, setCourse] = useState("");

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
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !course) return;

    const data = {
      title,
      content,
      course,
    };

    try {
      if (editingId) {
        await api.put(`/notes/${editingId}/`, data);
      } else {
        await api.post("/notes/", data);
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
          placeholder="Note title"
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
          <option value="">
            Select Course
          </option>

          {courses.map((course) => (
            <option
              key={course.id}
              value={course.id}
            >
              {course.title}
            </option>
          ))}
        </select>

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
              <strong>{note.title}</strong>

              {note.content && (
                <>
                  <br />
                  {note.content}
                </>
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