import { useState } from 'react';
import '../styles/Navbar.css'
import { Link, useNavigate } from "react-router-dom";


export function Navbar() {
  const token = localStorage.getItem('authToken')
  const isLoggedIn = !!token
  const [dropDown, setDropDown] = useState(false)
  const navigate = useNavigate();

   const handleDropDown = () => {
      localStorage.removeItem('authToken')
      setDropDown(false)
      navigate('/')
      window.location.reload();
   }


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

        {
          isLoggedIn ? (
            <div className="navbar-right">
              <div
                className="navbar-item perfil-container"
                onClick={() => setDropDown(!dropDown)}>
                Perfil ⌄
                {
                  dropDown && (
                    <div className="dropdown">
                      <button onClick={handleDropDown}>Cerrar sesión</button>
                    </div>
                  )
                }
              </div>
            </div>
          ) : (
            
          <div className="navbar-right">
            <Link to="/signup" className="navbar-item">SignUp</Link>
            <Link to="/login" className="navbar-item">Login</Link>
          </div>
          )

        }

        </nav>

      </header>
    );
  }