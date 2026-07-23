import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api/axios";

function Sidebar() {
    const [courses, setCourses] = useState([]);
    const location = useLocation();

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

    const activeCourse = new URLSearchParams(location.search).get("course");

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

                <hr />

                {courses.map((course) => (
                    <li key={course.id}>
                        <Link
                            to={`/notes?course=${course.id}`}
                            className={
                                activeCourse === String(course.id)
                                    ? "active-folder"
                                    : ""
                            }
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <span>📁 {course.title}</span>

                                <span
                                    style={{
                                        background: "#2563eb",
                                        color: "white",
                                        borderRadius: "20px",
                                        padding: "2px 8px",
                                        fontSize: "12px",
                                    }}
                                >
                                    {course.notes_count}
                                </span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar;