import React from "react";
import LoginForm from "../components/auth/LoginForm";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
