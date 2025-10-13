import React, { useState } from "react";
import { useAppSelector } from "../store/hooks";
import {
  selectBorrowedBooks,
  selectReservedBooks,
  selectWishlistBooks,
} from "../store/userBooksSlice";
import BookCarousel from "../components/book/BookCarousel";

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
    // Atualizar dados do usuário (ex: no localStorage ou backend)
    if (currentUser) {
      const updatedUser = { ...currentUser, username: userData.username };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      // Atualizar estado do Redux (opcional)
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Perfil</h1>

      {/* Formulário para modificar dados do usuário */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Modificar Dados do Usuário</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="username">Nome de Usuário:</label>
            <input
              id="username"
              name="username"
              type="text"
              value={userData.username}
              onChange={handleChange}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </div>
          <button type="submit" style={{ padding: "5px 10px" }}>
            Salvar
          </button>
        </form>
      </div>

      {/* Carrosséis de livros */}
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
    </div>
  );
};

export default Perfil;
