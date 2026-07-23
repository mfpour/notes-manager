import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api/axios";

function Sidebar() {
  const [courses, setCourses] = useState([]);
  const [notes, setNotes] = useState([]);
  const [openFolders, setOpenFolders] = useState({});

  const location = useLocation();

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

  const toggleFolder = (id) => {
    setOpenFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const activeCourse =
    new URLSearchParams(location.search).get("course");

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">
        📁 File Explorer
      </h2>

      <div className="sidebar-menu">
        <Link to="/dashboard">
          🏠 Dashboard
        </Link>

        <Link to="/courses">
          📚 Courses
        </Link>
      </div>

      <div className="sidebar-divider" />

      {courses.map((course) => (
        <div key={course.id}>
          <div
            className={`folder ${
              activeCourse === String(course.id)
                ? "active-folder"
                : ""
            }`}
            onClick={() => toggleFolder(course.id)}
          >
            <span>
              {openFolders[course.id]
                ? "📂"
                : "📁"}{" "}
              {course.title}
            </span>

            <span className="badge">
              {course.notes_count}
            </span>
          </div>

          {openFolders[course.id] &&
            notes
              .filter(
                (note) => note.course === course.id
              )
              .map((note) => (
                <Link
                  key={note.id}
                  className="note-item"
                  to={`/notes?course=${course.id}`}
                >
                  📄 {note.title}
                </Link>
              ))}
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;