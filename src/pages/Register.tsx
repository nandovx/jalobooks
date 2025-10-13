import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import styles from "./Register.module.css";

const Register: React.FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
