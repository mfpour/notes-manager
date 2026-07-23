import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/accounts/logout/");
    } catch {}

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>{" | "}
      <Link to="/courses">Courses</Link>{" | "}
      <Link to="/notes">Notes</Link>{" | "}

      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;