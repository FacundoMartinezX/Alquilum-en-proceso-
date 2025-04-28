import '../styles/Navbar.css'
import { Link } from "react-router-dom";


export function Navbar() {
    return (
        
      <header className='navbar'>
        <nav className='navbar-container'>
          <div className='navbar-left'>
            <Link to="/" className='link-reset'>
              <div className='logo'>Logo</div>
            </Link>
          </div>

          <div className='navbar-center'>
              <Link to="/" className='link-reset'>
                <div className="navbar-item">Coworking Spaces</div>
              </Link>
          </div>

          <div className="navbar-right">
            <Link to="/signup" className="navbar-item">SignUp</Link>
            <Link to="/login" className="navbar-item">Login</Link>
          </div>
        </nav>

      </header>
    );
  }