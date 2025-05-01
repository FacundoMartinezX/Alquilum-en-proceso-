import { useState } from "react"
import { useNavigate } from "react-router-dom";
import '../styles/login.css'

export function Login () {
    const [formDataLogin, setFormDataLogin] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
       
       setFormDataLogin({
        ...formDataLogin,
        [e.target.name]: e.target.value
       })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {

            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(formDataLogin)
            })

            const data = await response.json()
            console.log(data);
            

            if (response.ok) {
                console.log('Usuario logueado:', data);
                localStorage.setItem('authToken', data.token)

                setFormDataLogin({
                    email: "",
                    password: ""
                })

                navigate('/');

              } else {
                console.error('Error al loguearse:', data.message);
              }
            
        } catch (error) {
        console.error('Error en el fetch:', error);
            
        }
        
    }
    return (
        <div className="login-wrapper">
            <form action="" onSubmit={handleSubmit} className="container-form">
                <label>Email</label>
                <input type="email" name="email" value={formDataLogin.email} onChange={handleChange}/>

                <label>Password</label>
                <input type="password" name="password" value={formDataLogin.password} onChange={handleChange}/>

                <button type="submit">Login</button>

            </form>
        </div>
    )
}