import { useState, useEffect } from "react";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Info from "./pages/Info";
import "./App.css";

/**
 * Functional component representing the main application.
 * @component
 */
const App = () => {
  /**
   * State hook to manage the current page of the application.
   * @type {[string, Function]}
   */
  const [currentPage, setCurrentPage] = useState("home");

  /**
   * useEffect hook to set the initial page based on the URL path.
   */
  useEffect(() => {
    const currentPath = window.location.pathname.replace("/", "");
    setCurrentPage(currentPath || "home");
  }, []);

  /**
   * Function to handle navigation link clicks and update the current page.
   * @param {string} page - The target page to navigate to.
   */
  const handleNavLinkClick = (page) => {
    setCurrentPage(page);
    window.history.pushState(null, null, `/${page}`);
  };

  /**
   * Function to render the appropriate page based on the current page state.
   * @returns {JSX.Element} - React element representing the rendered page.
   */
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

  /**
   * Render method of the App component.
   * @returns {JSX.Element} - React element representing the App component.
   */
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
      <footer>© Anni Peura</footer>
    </div>
  );
};

export default App;
