import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/accounts/logout/", {
        refresh: localStorage.getItem("refresh"),
      });

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <h1>Academic Notes Organizer</h1>

      <Link to="/courses">
        <button>Courses</button>
      </Link>

      <br />
      <br />

      <Link to="/notes">
        <button>Notes</button>
      </Link>

      <br />
      <br />

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;