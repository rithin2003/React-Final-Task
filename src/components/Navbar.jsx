
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const watchlist = useSelector(state => state.watchlist);
  const { theme, dispatch } = useTheme();

  const links = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Genres", path: "/genres" },
    { name: "Contact", path: "/contact" },
    { name: "Profile", path: "/profile" }
  ];

  return (
    <header className="navbar">
      <Link to="/" className="logo">Movie<span>World</span></Link>

      <nav className="nav-links">
        {links.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            {link.name}
          </NavLink>
        ))}

        <NavLink to="/watchlist" className="nav-link">
          Watchlist ({watchlist.length})
        </NavLink>

        <button
          className="theme-button"
          onClick={() => dispatch({ type: "TOGGLE" })}
          aria-label="Toggle theme"
        >
          {theme.dark ? "☀️" : "🌙"}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
