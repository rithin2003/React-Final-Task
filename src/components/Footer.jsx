
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
    <Link to="/" className="logo">Movie<span>World</span></Link>
    <p>Discover stories. Explore movies. Build your watchlist.</p>
    <p>© 2026 MovieWorld · Created with React</p>
  </footer>
);

export default Footer;
