import { useEffect, useState } from "react"
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
            {
                space.map(spa => {
                    return (
                        <div className="space-card" key={spa.id}>
                            <img 
                                src={spa.fotos[0]} 
                                alt={spa.titulo}
                                className="img-card-space"
                            />
                            <h3>{spa.titulo}</h3>
                            <p>Ubicación: {spa.ubicacion}</p>
                            <p>{spa.precioPorDia} Por día</p>
                            <p>{spa.capacidad} Personas</p>
                            <p>Servicios: {spa.servicios.join(', ')}</p>
                            <p>{spa.isAvailable ? 'Disponible' : 'No disponible'}</p>
                        </div>
                    );
                })
            }
        </>
    );


}