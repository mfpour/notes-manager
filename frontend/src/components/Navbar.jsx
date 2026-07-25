import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    const refresh = localStorage.getItem("refresh");

    if (refresh) {
      await api.post("/accounts/logout/", {
        refresh,
      });
    }
  } catch (error) {
    console.log(error.response?.data);
  }

  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  navigate("/");
};

  return (
    <header className="navbar">
      <div className="navbar-logo">
         Notes Manager
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
