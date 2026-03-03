import './notFound.scss';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div id="notFound">
    <div className="not-found-container">
      <span className="not-found-code">404</span>
      <h1 className="not-found-title">Page not found</h1>
      <p className="not-found-message">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="not-found-link">Go back home</Link>
    </div>
  </div>
);

export default NotFound;
