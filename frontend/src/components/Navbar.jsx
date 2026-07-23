import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/accounts/logout/", {
        refresh: localStorage.getItem("refresh"),
      });
    } catch {}

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        📚 Notes Manager
      </div>

      <nav className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/notes">Notes</Link>
      </nav>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
}

export default Navbar;