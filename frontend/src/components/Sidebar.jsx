import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Sidebar() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/courses/");
      setCourses(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <aside>
      <h3 style={{ marginBottom: "20px" }}>
        📁 File Explorer
      </h3>

      <ul>
        <li>
          <Link to="/dashboard">
            🏠 Dashboard
          </Link>
        </li>

        <li>
          <Link to="/courses">
            📚 Manage Courses
          </Link>
        </li>

        {courses.map((course) => (
          <li key={course.id}>
            <Link to={`/notes?course=${course.id}`}>
              📁 {course.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;