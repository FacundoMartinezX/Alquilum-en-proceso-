import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/spaceDetail.css'
import '../styles/ModalReserve.css'
import "react-datepicker/dist/react-datepicker.css";
import { SpaceDetailCard } from "./SpaceDetailCard";
import { jwtDecode } from 'jwt-decode';
import { calcularDias } from "../utils/dateCalc";


export function SpaceDetail () {
    const { id } = useParams()
    const [space, setSpace] = useState()
    const [showModal, setShowModal] = useState(false)

  const token = localStorage.getItem('authToken');
  let decode = null;

  try {
    if(token) {
      decode = jwtDecode(token)
    }
  } catch (error) {
    console.error("Token inválido:", error.message);
  }

  const userId = decode?.id 
  

    useEffect(() => {
      if (showModal) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, [showModal]);

    const closeModal = (e) => {
      if (e.target === e.currentTarget) {
          setShowModal(false);
      }
  };
  
 
  const handleReservation = (e) => {

    e.preventDefault()

    const reservationData = {
      spaceWorkId: space.id,
      startDate: new Date(space?.startDate).toISOString(),
      endDate: new Date(space?.endDate).toISOString(),
      userId: userId
    }

    fetch("http://localhost:3000/reserve", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-type": "application/json",
        
      },
      body: JSON.stringify(reservationData)
    })
    .then( async (response) => {
      const data = await response.json()

      
  if (!response.ok) {
    alert(`Error: ${data.message || 'Algo salió mal'}`);
    return;
  }
  alert('Reserva realizada con éxito');
  setShowModal(false);

    })
    .catch((error) => {
  console.error("Error de red o servidor:", error);
  alert("Error de red. Intenta nuevamente.");
});


  }
  
    return (
      <>
    <SpaceDetailCard id={id} showModal={showModal} setShowModal={setShowModal} space={space} setSpace={setSpace} userId={userId}/>
    
    { 
      showModal && (
        <div className="modal-container" onClick={closeModal}>
  <form className="modal-reserve-form" onClick={(e) => e.stopPropagation()}>
    <h4>Confirmar Reserva</h4>
    <p>
      Fecha de reserva: del <strong>{new Date(space.startDate).toLocaleDateString("es-AR")}</strong> al <strong>{new Date(space.endDate).toLocaleDateString("es-AR")}</strong>
    </p>
    <p>
      Total de días:<strong>{calcularDias(space?.startDate, space?.endDate)}</strong>
    </p>
    <button type="submit" onClick={handleReservation}>
      Confirmar Reserva
    </button>
  </form>
</div>
      )
    }

  </> 
  )
}
