import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import InitializeApp from "./components/common/AppInitializer";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
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
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/search" element={<AdvancedSearch />} />
                <Route path="/perfil" element={<Perfil />} />
              </Route>
            </Routes>
          </Router>
        </InitializeApp>
      </PersistGate>
    </Provider>
  );
}

export default App;
