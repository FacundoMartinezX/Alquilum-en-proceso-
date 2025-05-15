import { useState } from "react"
import '../styles/SignUp.css'
import { useNavigate } from "react-router-dom";
    

        export function SignUp () {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSumbit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/auth/signup',{
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(formData)
            }) 
            
            const data = await response.json()

            if (response.ok) {
                console.log('Usuario registrado:', data);

                setFormData({
                    name: "",
                    email: "",
                    address: "",
                    password: "",
                    
                })

                navigate('/login')
            } else {
                console.error('Error al registrarse:', data.message);
            }
            
        } catch (error) {
            console.error('Error en el fetch:', error);
        }

        
    }

        return (
            <div className="signup-wrapper">
                <form action="" className="signup-form" onSubmit={handleSumbit}> 
                    <label required >Name</label >
                    <input type="text" name="name" value={formData.name} onChange={handleChange}/>

                    <label required >Email</label >
                    <input type="email" name="email" value={formData.email} onChange={handleChange}/>
            
                    <label required >Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange}/>

                    <label required >Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange}/>
                    <button type="submit">Registrarse</button>
                </form>
            </div>
        )       
        }