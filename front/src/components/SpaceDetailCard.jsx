import { useEffect } from "react";

export function SpaceDetailCard ({setShowModal, id, space, setSpace}) {
  const token = localStorage.getItem('authToken');
  const isLoggedIn = !!token;

      useEffect(() => {
          fetch(`http://localhost:3000/spaceWork/${id}`)
          .then(res => res.json())
          .then(data => setSpace(data))
      },[id,setSpace])
  
      if (!space) return <p>Cargando...</p>
  
            return (
        <div className="space-detail" >
      <div className="space-card-detail">
    <h2>{space.titulo}</h2>

    <div className="img-container">
      {space.fotos.map((foto,index) => (
        <img src={foto} alt="" key={`${space.id}-${index}`}/>
      ))}
    </div>
    <div className="container-description">
    <p><strong>Descripción:</strong> {space.descripcion}</p>
    <p><strong>Ubicación:</strong> {space.ubicacion}</p>
    <p><strong>Precio:</strong> {space.precioPorDia} Por día</p>
    <p><strong>Capacidad:</strong> {space.capacidad} personas</p>
    <p><strong>Servicios:</strong> {space.servicios.join(', ')}</p>
    <p><strong>Estado:</strong> {space.isAvailable ? 'Disponible' : 'No disponible'}</p>
    {isLoggedIn ? (
  <button onClick={() => setShowModal(true)}>Reserve</button>
) : (
  <p><em>Iniciá sesión para reservar este espacio.</em></p>
)}
    </div>
  </div>
    </div>
    )
}