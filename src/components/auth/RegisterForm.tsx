import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks"; // Novo hook
import { loginSuccess } from "../../store/userSlice"; // Nova action
import styles from "./RegisterForm.module.css";
import type { User } from "../../types";

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
  const dispatch = useAppDispatch(); // Novo dispatch
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    const storedUsers = localStorage.getItem("users");
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    if (users.some((u) => u.username === formData.username)) {
      setError("Usuário já existe");
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      username: formData.username,
      password: formData.password,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem("currentUser", JSON.stringify(newUser));
    dispatch(loginSuccess(newUser)); // Despacha a action de login
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Registro</h2>
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
      <div className={styles.inputGroup}>
        <label htmlFor="confirmPassword">Confirmar Senha</label>
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
        Registrar
      </button>
    </form>
  );
};

export default RegisterForm;
