import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/spaceDetail.css'

export function SpaceDetail () {

    const { id } = useParams()
    const [space, setSpace] = useState()

    useEffect(() => {
        fetch(`http://localhost:3000/spaceWork/${id}`)
        .then(res => res.json())
        .then(data => setSpace(data))
    },[id])

    if (!space) return <p>Cargando...</p>

    return (
    <div className="space-detail" >
      <div className="space-card-detail">
    <h2>{space.titulo}</h2>

    <div className="img-container">
      {space.fotos.map((foto,index) => (
        <img src={foto} alt="" key={index}/>
      ))}
    </div>

    <p><strong>Descripción:</strong> {space.descripcion}</p>
    <p><strong>Ubicación:</strong> {space.ubicacion}</p>
    <p><strong>Precio:</strong> {space.precioPorDia} Por día</p>
    <p><strong>Capacidad:</strong> {space.capacidad} personas</p>
    <p><strong>Servicios:</strong> {space.servicios.join(', ')}</p>
    <p><strong>Estado:</strong> {space.isAvailable ? 'Disponible' : 'No disponible'}</p>
  </div>
    </div>
  )
}