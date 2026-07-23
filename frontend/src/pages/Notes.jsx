import { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import { useSearchParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import ReactMarkdown from "react-markdown";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchParams] = useSearchParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [course, setCourse] = useState("");
  const [file, setFile] = useState(null);

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchNotes();
  }, [searchParams]);

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
      const courseId = searchParams.get("course");

      const url = courseId
        ? `/notes/?course=${courseId}`
        : "/notes/";

      const response = await api.get(url);

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

  const handleDownload = async (note) => {
    try {
      const response = await api.get(note.file, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");

      link.href = url;
      link.download = note.file.split("/").pop();

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div>
        <h1 className="page-title">Notes</h1>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">Select Course</option>

              {courses.map((course) => (
                <option
                  key={course.id}
                  value={course.id}
                >
                  {course.title}
                </option>
              ))}
            </select>

            <div data-color-mode="light">
              <MDEditor
                value={content}
                onChange={(value) => setContent(value || "")}
                height={300}
              />
            </div>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button type="submit">
              {editingId ? "Update Note" : "Add Note"}
            </button>
          </form>
        </div>

        {notes.length === 0 ? (
          <div className="empty-state">No notes found.</div>
        ) : (
          <div className="grid grid-2">
            {notes.map((note) => (
              <div
                className="note-card"
                key={note.id}
              >
                <h3>{note.title}</h3>

                <div
                  style={{
                    background: "#fff",
                    padding: "18px",
                    borderRadius: "10px",
                    margin: "15px 0",
                  }}
                >
                  <ReactMarkdown>
                    {note.content}
                  </ReactMarkdown>
                </div>

                {note.file && (
                  <button
                    type="button"
                    onClick={() => handleDownload(note)}
                  >
                    Download File
                  </button>
                )}

                <div className="list-actions">
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => handleEdit(note)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Notes;