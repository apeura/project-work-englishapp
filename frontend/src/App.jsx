import { useState, useEffect } from "react";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Info from "./pages/Info";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  // render current page based on which page you're on
  useEffect(() => {
    const currentPath = window.location.pathname.replace("/", "");
    setCurrentPage(currentPath || "home");
  }, []); // Empty dependency array to run this effect only once on mount

  const handleNavLinkClick = (page) => {
    setCurrentPage(page);
    window.history.pushState(null, null, `/${page}`);
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "admin":
        return <Admin />;
      case "info":
        return <Info />;
    }
  };

  return (
    <div>
      <nav>
        <p>
          <span className="navLink" onClick={() => handleNavLinkClick("home")}>
            Play
          </span>
          <span className="material-symbols-outlined"> raven </span>
          <span className="navLink" onClick={() => handleNavLinkClick("admin")}>
            Admin
          </span>
          <span className="material-symbols-outlined"> raven </span>
          <span className="navLink" onClick={() => handleNavLinkClick("info")}>
            Info
          </span>
        </p>
      </nav>
      {renderPage()}
    </div>
  );
};

export default App;
