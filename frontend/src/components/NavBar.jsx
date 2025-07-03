import { Link, useNavigate } from 'react-router-dom';
import '../css/navbar.css';

export default function NavBar() {
  const navigate = useNavigate();

  function handleHomeClick() {
    navigate('/', { state: { refresh: true } });
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo-link" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
          🎬 Movie App
        </span>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favorite" className="nav-link">Favorites</Link>
      </div>
    </nav>
  );
}