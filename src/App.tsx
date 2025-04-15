import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Navbar from "./common/header/Navbar";
import Home from "./pages/Home";
import Upstox from "./pages/Upstox";
import TickerSearch from "./components/Ticker";
import { NavbarMain } from "./common/header/Navbar_Main";
// import SideNav from "./common/SideNav";

function App() {
  return (
    <Router>
      <div>
        <header className="">
          {/* <Navbar /> */}
          <NavbarMain />
          {/* <SideNav /> */}
        </header>
        <main className="mt-14">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upstox" element={<Upstox />} />
            <Route path="/ticker" element={<TickerSearch />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
