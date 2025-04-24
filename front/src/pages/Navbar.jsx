import '../styles/Navbar.css'

export function Navbar() {
    return (
        <div className="app-container">
        <header className="navbar">
          <nav>
              <div className='logo'>Logo</div>
            <ul className="navbar-list">
              <li className="navbar-item">Coworking Spaces</li>
              <li className="navbar-item">Perfil</li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }