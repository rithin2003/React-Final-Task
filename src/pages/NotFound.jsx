
import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="empty-state page-container">
    <div className="empty-icon">🎬</div>
    <h1>404 — Scene Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to="/" className="primary-button">Back to Home</Link>
  </main>
);

export default NotFound;
