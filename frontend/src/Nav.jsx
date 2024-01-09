//navbar component

import { Link } from "react-router-dom"; // <a href=> in HTML
function Navbar() {
  return (
      <header className="header">
        <ul>
          <li>
            <Link to="/home">Admin</Link>
          </li>
        </ul>
      </header>
  );
}
export default Navbar;
