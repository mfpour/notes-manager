import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await api.post("/accounts/login/", form);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      navigate("/dashboard");
    } catch {
      setError("Username or password is incorrect.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">


        <div>
          <h1>Login</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />

            <br />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <br />

            <button type="submit">
              Login
            </button>
          </form>

          {error && <p>{error}</p>}

          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;