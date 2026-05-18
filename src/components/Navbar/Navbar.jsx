import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import { Link } from "react-router";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return(
    <nav>
      {user ? (
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/hoots">HOOTS</Link>
          </li>
          {/* Add the NEW HOOT link */}
          <li>
            <Link to="/hoots/new">NEW HOOT</Link>
          </li>
          <li>
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/sign-in">SIGN IN</Link>
          </li>
          <li>
            <Link to="/sign-up">SIGN UP</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
