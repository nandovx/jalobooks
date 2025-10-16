import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { loginSuccess } from "../../store/userSlice";
import { auth } from "../../services/authService";
import styles from "./RegisterForm.module.css";

interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const user = auth.register({
      username: formData.username,
      password: formData.password,
    });

    if (user) {
      dispatch(loginSuccess(user));
      navigate("/");
    } else {
      setError("User already exists");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Registro</h2>
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
      <div className={styles.inputGroup}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className={styles.button}>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
