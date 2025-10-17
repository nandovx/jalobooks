import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/userSlice";
import { FaHome, FaUser, FaUserPlus } from "react-icons/fa";
import styles from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link
          to="/"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.3rem",
          }}
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src={"/src/assets/icon.png"}
            alt="Logo da Biblioteca"
            className={styles.logo}
          />

          <h1>BookJalo</h1>
        </Link>
      </div>

      {/* Botão do Menu Hambúrguer */}
      <div
        className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      >
        <div className={styles.hamburgerLine}></div>
        <div className={styles.hamburgerLine}></div>
        <div className={styles.hamburgerLine}></div>
      </div>

      {/* Menu Móvel */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
        <Link
          to="/"
          className={styles.mobButton}
          onClick={() => setIsMenuOpen(false)}
        >
          <FaHome className={styles.icon} /> Home
        </Link>

        {isAuthenticated ? (
          <>
            <Link
              to="/perfil"
              className={styles.mobButton}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUser className={styles.icon} /> Perfil
            </Link>

            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={styles.mobButton}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUser className={styles.icon} /> Login
            </Link>
            <Link
              to="/register"
              className={styles.mobButton}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUserPlus className={styles.icon} /> Register
            </Link>
          </>
        )}
      </div>

      {/* Menu Desktop (oculto em mobile) */}
      <div className={styles.navigationBar}>
        <Link to="/" className={styles.navButton}>
          <FaHome className={styles.icon} />
          Home
        </Link>

        {isAuthenticated ? (
          <Link to="/perfil" className={styles.navButton}>
            <FaUser className={styles.icon} />
            Perfil
          </Link>
        ) : (
          ""
        )}
      </div>

      <div className={styles.loginWrapper}>
        {isAuthenticated ? (
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className={styles.loginButton}>
              Login
            </Link>
            <Link to="/register" className={styles.registerButton}>
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
