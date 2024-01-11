import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Info from "./pages/Info";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
            <p>
              <Link to="/">Play </Link>
              <span className="material-symbols-outlined"> raven </span>{" "}
              <Link to="/admin">Admin </Link>{" "}
              <span className="material-symbols-outlined"> raven </span>{" "}
              <Link to="/info">Info</Link>
            </p>{" "}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
