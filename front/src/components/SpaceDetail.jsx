import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import '../styles/spaceDetail.css'
import '../styles/ModalReserve.css'
import "react-datepicker/dist/react-datepicker.css";
import { SpaceDetailCard } from "./SpaceDetailCard";

export function SpaceDetail () {

    const { id } = useParams()
    const [space, setSpace] = useState()
    const [showModal, setShowModal] = useState(false)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


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
    if(!startDate && !endDate) {
      alert('selecciona las fechas')
      return;
    }

    const reservationData = {
      spaceWorkId: space.id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      userId: "1c4f2d35-172f-4b6a-9e2f-199ab33ce088"
    }

    fetch("http://localhost:3000/reserve", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
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
    <SpaceDetailCard id={id} showModal={showModal} setShowModal={setShowModal} space={space} setSpace={setSpace}/>
    
    {
      showModal && (
        <div className="modal-container" onClick={closeModal}>
        <form action="" onClick={(e) => e.stopPropagation()}>
          <h4>Reserve</h4>
          <label htmlFor="opciones">Elige una opción:</label>
              <select id="opciones" name="opcion">
                <option value="">-- Selecciona --</option>
              </select>
              <label>Fecha de inicio:</label>
                 <DatePicker
                   selected={startDate}
                   onChange={(date) => setStartDate(date)}
                   selectsStart
                   startDate={startDate}
                   endDate={endDate}
                   minDate={startDate}
                   placeholderText="Seleccioná una fecha"
                 />

                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="Fin"
                  />

          <button type="submit" onClick={handleReservation}>Reserve</button>
        </form>
        </div>
      )
    }

  </> 
  )
}