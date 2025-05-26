import { useState, useEffect, useRef } from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'

export function Navbar() {
  const token = localStorage.getItem('authToken');
  const isLoggedIn = !!token;
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const perfilRef = useRef(null); 

  const handleDropDown = () => {
    localStorage.removeItem('authToken');
    setDropDown(false);
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        perfilRef.current &&
        !perfilRef.current.contains(event.target)
      ) {
        setDropDown(false);
      }
    };

    if (dropDown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropDown]);

  return (
    <header className='navbar'>
      <nav className='navbar-container'>

        <div className='navbar-section left'>
          <Link to="/" className='link-reset'>
            <span className="navbar-logo" href="/">
              <img src={logo} alt="logo" />
            </span>
          </Link>
        </div>

        <div className='navbar-section center'>
        </div>

        <div className='navbar-section right'>
          {isLoggedIn && (
            <Link to="/createSpaceWork" className='link-reset'>
              <div className="navbar-item cys">Create your space</div>
            </Link>
          )}

          {isLoggedIn ? (
            <div
              ref={perfilRef}
              className="navbar-item perfil-container"
              onClick={() => setDropDown(!dropDown)}
            >
              Perfil
            </div>
          ) : (
            <>
              <Link to="/signup" className="navbar-item">SignUp</Link>
              <Link to="/login" className="navbar-item">Login</Link>
            </>
          )}
        </div>
      </nav>

      {isLoggedIn && dropDown && (
        <div className="navbar-dropdown-container" ref={dropdownRef}>
          <div className='navbar-dropdown'>
            <Link to="/myReservations" onClick={() => setDropDown(false)} className='my-reservations'>
              My reservations
            </Link>
            <button onClick={handleDropDown}>Log out</button>
          </div>
        </div>
      )}
    </header>
  );
}