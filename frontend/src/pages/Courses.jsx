import { useEffect, useState } from "react";
import api from "../api/axios";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/courses/");
      setCourses(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <h1>Courses</h1>

      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              {course.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Courses;