import { useEffect, useState } from "react";
import api from "../api/axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");

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
      await api.post("/courses/", {
        title: title.trim(),
      });

      setTitle("");
      fetchCourses();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
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
          Add Course
        </button>
      </form>

      <hr />

      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <strong>{course.title}</strong>

              {course.semester && (
                <>
                  {" "}
                  - {course.semester}
                </>
              )}

              {course.description && (
                <>
                  <br />
                  {course.description}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Courses;