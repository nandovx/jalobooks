import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks"; // Novo hook
import { loginSuccess } from "../../store/userSlice"; // Nova action
import styles from "./LoginForm.module.css";
import type { User } from "../../types";

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
  const dispatch = useAppDispatch(); // Novo dispatch
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUsers = localStorage.getItem("users");
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    const user = users.find(
      (u) =>
        u.username === formData.username && u.password === formData.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      dispatch(loginSuccess(user)); // Despacha a action de login
      navigate("/");
    } else {
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.inputGroup}>
        <label htmlFor="username">Usuário</label>
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
        <label htmlFor="password">Senha</label>
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
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;
