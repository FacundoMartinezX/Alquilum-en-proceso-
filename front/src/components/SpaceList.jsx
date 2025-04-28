import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import '../styles/MainContent.css'


export function SpaceList () {

    const [space, setSpace] = useState([])


    useEffect(() => {
        fetch('http://localhost:3000/spaceWork')
        .then(res => {
            return res.json(); 
        })
        .then(data => setSpace(data)) 
        .catch(error => console.error('Error en la petición:', error));
    }, []);

    return (
        <>
        <div className="main-content">
            {
                space.map(spa => (
                    <Link to={`/space/${spa.id}`} key={spa.id} target="_blank" className="link-reset">
                      <div className="space-card">
                        <img src={spa.fotos[0]} alt={spa.titulo} className="img-card-space"/>
                        <p>{spa.ubicacion}</p>
                        <p>{spa.precioPorDia} Por día</p>
                        <p>{spa.capacidad} Personas</p>
                        <p>{spa.isAvailable ? 'Disponible' : 'No disponible'}</p>
                      </div>
                    </Link>
                  ))
            }
            </div>
        </>
    );


}