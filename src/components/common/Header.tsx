import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks"; // Novo hook
import { logout } from "../../store/userSlice"; // Nova action
import { FaHome, FaUser, FaUserPlus } from "react-icons/fa";
import styles from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.user); // Novo estado
  const dispatch = useAppDispatch(); // Novo dispatch
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout()); // Despacha a action de logout
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img
          src={"/src/assets/icon.png"}
          alt="Logo da Biblioteca"
          className={styles.logo}
        />
        <h1>BookJalo</h1>
      </div>

      {/* Botão do Menu Hambúrguer com animação */}
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
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <FaHome /> Home
        </Link>

        {isAuthenticated ? (
          <>
            <Link to="/perfil" onClick={() => setIsMenuOpen(false)}>
              <FaUser /> Perfil
            </Link>

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <FaUser /> Login
            </Link>
            <Link to="/register" onClick={() => setIsMenuOpen(false)}>
              <FaUserPlus /> Register
            </Link>
          </>
        )}
      </div>

      {/* Menu Desktop (oculto em mobile) */}
      <div className={styles.navigationBar}>
        <Link to="/">Home</Link>

        {isAuthenticated ? <Link to="/perfil">Perfil</Link> : ""}
      </div>

      <div className={styles.loginWrapper}>
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
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
