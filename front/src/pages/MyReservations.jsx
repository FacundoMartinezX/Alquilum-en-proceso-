  import { jwtDecode } from 'jwt-decode';
  import { useEffect, useState } from 'react';
  import '../styles/Reservations.css';

  export function MyReservations() {
    const [reservations, setReservations] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const id = decoded?.sub || decoded?.id || decoded?.userId;
        if (id) setUserId(id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }, []);

    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (!userId || !token) return;

      fetch('http://localhost:3000/reserve', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("There are no reservations");
          const data = await res.json();

          const filtered = data.filter(r => {
            const reservationUserId = r.user?.id || r.user?.userId || r.userId;
            return reservationUserId === userId;
          });

          setReservations(filtered);
        })
        .catch((error) => {
          console.error("Error en la petición:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [userId]);

    const handleCancelReserve = async (id) => {
      const token = localStorage.getItem("authToken");

      try {
        const res = await fetch(`http://localhost:3000/reserve/cancel/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) throw new Error('Error al cancelar la reserva');

        setReservations(prevReservations => 
          prevReservations.map(r =>
            r.id === id ? { ...r, status: false } : r
          )
        );

        alert('Reserva cancelada con éxito');

      } catch (error) {
        console.log("Error al cancelar la reserva:", error);
      }
    };

    return (
    <div className="reservations-container">
      <h2>My Reservations</h2>

      {loading && <p>Cargando reservas...</p>}

      {!loading && reservations.map((reservation) => {

        const isExpired = new Date() > new Date(reservation.endDate)
  
        return (
          <div 
            key={reservation.id} 
            className={`reservation-card ${!reservation.status ? 'cancelled' : ''}`}
          >
            <div className="reservation-info">
              <div><strong>Id:</strong> {reservation.id}</div>
              <div><strong>From:</strong> {new Date(reservation.startDate).toLocaleDateString()}</div>
              <div><strong>To:</strong> {new Date(reservation.endDate).toLocaleDateString()}</div>
              <div><strong>Space:</strong> {reservation.spaceWork?.titulo}</div>
              <div><strong>Price:</strong> ${reservation.spaceWork?.precio}</div>
              <div><strong>Status:</strong> {reservation.status ? 'Confirmed' : 'Cancelled'}</div>
            </div>

            {!isExpired && reservation.status && (
              <button 
                className="cancel-button" 
                onClick={() => handleCancelReserve(reservation.id)}>
                Cancel Reservation
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
  }