import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { loginSuccess } from "../../store/userSlice";
import { auth } from "../../services/authService";
import styles from "./LoginForm.module.css";

interface LoginFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.login(formData.username, formData.password);

    if (user) {
      dispatch(loginSuccess(user));
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.inputGroup}>
        <label htmlFor="username">User</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className={styles.button}>
        Enter
      </button>
    </form>
  );
};

export default LoginForm;
