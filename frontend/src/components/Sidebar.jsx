import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside>
      <ul>
        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/courses">
            Courses
          </Link>
        </li>

        <li>
          <Link to="/notes">
            Notes
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;