import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Upstox from "./pages/Upstox";
import { NavbarMain } from "./common/header/Navbar_Main";
import store from "./app/store";
import { Provider } from "react-redux";
import { ModalProvider } from "./components/ui/animated-modal";

function App() {
  return (
    <Provider store={store}>
      <div className="h-screen py-10">
        <AppContent />
      </div>
    </Provider>
  );
}

const AppContent = () => {
  return (
    <ModalProvider>
      <Router>
        <div>
          <header> 
            <NavbarMain />
          </header>
          <main className="mt-14">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Home />} />
              <Route path="/upstox" element={<Upstox />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ModalProvider>
  );
};

export default App;
