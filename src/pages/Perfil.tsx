import React, { useState } from "react";
import { useAppSelector } from "../store/hooks";
import {
  selectBorrowedBooks,
  selectReservedBooks,
  selectWishlistBooks,
} from "../store/userBooksSlice";
import BookCarousel from "../components/book/BookCarousel";
import { auth } from "../services/authService";
import styles from "./Perfil.module.css";

const Perfil = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const borrowedBooks = useAppSelector(selectBorrowedBooks);
  const reservedBooks = useAppSelector(selectReservedBooks);
  const wishlistBooks = useAppSelector(selectWishlistBooks);

  const [userData, setUserData] = useState({
    username: currentUser?.username || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      const updatedUser = { ...currentUser, username: userData.username };
      auth.update(updatedUser);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Perfil</h1>

      <div className={styles.container}>
        {/* Card de edição do usuário */}
        <section className={styles.profileCard}>
          <h2>Modificar Dados</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <fieldset>
              <div className={styles.formGroup}>
                <label htmlFor="username">Nome de Usuário</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={userData.username}
                  onChange={handleChange}
                  placeholder="Digite seu nome"
                />
              </div>
              <button type="submit" className={styles.saveButton}>
                Salvar Alterações
              </button>
            </fieldset>
          </form>
        </section>

        {/* Carrosséis de livros */}
        <section className={styles.bookSection}>
          <BookCarousel
            books={borrowedBooks}
            context="loan"
            title="Livros Emprestados"
          />

          <BookCarousel
            books={reservedBooks}
            context="reservation"
            title="Livros Reservados"
          />
          <BookCarousel
            books={wishlistBooks}
            context="wishlist"
            title="Lista de Desejos"
          />
        </section>
      </div>
    </div>
  );
};

export default Perfil;
