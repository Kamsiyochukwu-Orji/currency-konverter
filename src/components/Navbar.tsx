import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">₿</span>
        <span className="brand-name">Converto</span>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Converter
        </NavLink>
        <NavLink to="/rates" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Live Rates
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          History
        </NavLink>
      </div>
    </nav>
  );
}
