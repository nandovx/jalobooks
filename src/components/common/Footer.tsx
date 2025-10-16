import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} BookJalo - University Library. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
