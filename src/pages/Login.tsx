import React from "react";
import LoginForm from "../components/auth/LoginForm";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
