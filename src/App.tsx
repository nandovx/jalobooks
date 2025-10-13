import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import InitializeApp from "./components/common/InitializeApp";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdvancedSearch from "./pages/AdvancedSearch";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InitializeApp>
          <Router>
            <div className="app-container">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />

                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route path="/book/:id" element={<BookDetail />} />
                  <Route path="/search" element={<AdvancedSearch />} />
                  <Route path="/perfil" element={<Perfil />}></Route>
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </InitializeApp>
      </PersistGate>
    </Provider>
  );
}

export default App;
