import '../styles/Navbar.css'
import { Link } from "react-router-dom";


export function Navbar() {
    return (
        <div className="app-container">
        <header className="navbar">
          <nav>
            <Link to={'/'}  className='link-reset'>
              <div className='logo'>Logo</div>
            </Link>
            <ul className="navbar-list">
              <li className="navbar-item">Coworking Spaces</li>
              <li className="navbar-item">Perfil</li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }