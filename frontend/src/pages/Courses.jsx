import { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";
function Courses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      if (editingId) {
        await api.put(`/courses/${editingId}/`, {
          title,
        });
      } else {
        await api.post("/courses/", {
          title,
        });
      }

      setTitle("");
      setEditingId(null);
      fetchCourses();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleEdit = (course) => {
    setTitle(course.title);
    setEditingId(course.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/courses/${id}/`);
      fetchCourses();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <MainLayout>
      <div>
        <h1>Courses</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button type="submit">
            {editingId ? "Update Course" : "Add Course"}
          </button>
        </form>

        <hr />

        {courses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          <ul>
            {courses.map((course) => (
              <div className="course-card" key={course.id}>
                {course.title}
                <div className="actions">
                  <button onClick={() => handleEdit(course)}>
                    Edit
                  </button>
                </div>
                <div className="actions">
                  <button onClick={() => handleDelete(course.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  );
}

export default Courses;