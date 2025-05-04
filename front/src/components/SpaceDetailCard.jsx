import { useState, useEffect } from "react";
import { Review } from "./review"; // Suponiendo que Review es un componente para mostrar reseñas
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {  useParams } from "react-router-dom";

export function SpaceDetailCard({ setShowModal, id, space, setSpace, userId }) {
  const [averageRating, setAverageRating] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState('');
  const [photoIndex, setPhotoIndex] = useState(0);
  const { id: spaceWorkId } = useParams();
  const token = localStorage.getItem("authToken");
  const isLoggedIn = !!token;

  useEffect(() => {
    fetch(`http://localhost:3000/spaceWork/${id}`)
      .then((res) => res.json())
      .then((data) => setSpace(data));
  }, [id, setSpace]);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/reviews/rating/${spaceWorkId}`
        );
        const data = await res.json();
        setAverageRating(data.promedio);
      } catch (err) {
        console.error("Error al obtener el promedio:", err);
      }
    };

    fetchAverageRating();
  }, [spaceWorkId]);

  const handleSubmitReview = async(e) => {
    e.preventDefault()
    const dataReview = {
      calificacion: calificacion,
      comentario: comentario.trim(),
      spaceWorkId,
      userId
    }
    try {
        const res = await fetch(`http://localhost:3000/reviews/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataReview)
    })

        const data = await res.json()

        console.log(data)

        if(res.status === 201) {
          alert('reserva con exito')

          setSpace((prev) => ({
            ...prev,
            review: [...prev.review, data]
        }))
        setComentario("");
        setCalificacion("");

        }else {
          alert(data.message || "Error al crear la reseña");
        }

    } catch (error) {
      console.error("Error al publicar la review:", error);
    }
  }

  if (!space) return <p>Cargando...</p>;

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  const slides = space.fotos.map((foto) => ({ src: foto }));

  return (
    <div className="space-detail">
      <div className="space-card-detail">
        <h1>{space.titulo}</h1>

        <div className="img-container">
          {space.fotos.map((foto, index) => (
            <img
              src={foto}
              alt=""
              key={`${space.id}-${index}`}
              onClick={() => openLightbox(index)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>

        <div className="container-description">
          <div className="container-left-lateral">
            <p>{space.ubicacion}</p>
            <p>{space.servicios.join(", ")}</p>
            <p>
              {averageRating !== null &&
                `Promedio de calificación: ${averageRating}★ · ${space.review.length} Evaluaciones`} 
            </p>
            <p>Owner: {space?.owner?.name}</p>
            <p>Descripcion:</p>
            <p>{space.descripcion}</p>
          </div>

          <div className="container-rigth-lateral">
            {isLoggedIn ? (
              <button onClick={() => setShowModal(true)}>Reserve</button>
            ) : (
              <p>
                <em>Iniciá sesión para reservar este espacio.</em>
              </p>
            )}
          </div>
        </div>

        <div className="reviews-section">
          
          <h2>Reseñas</h2>

              <form action=""> 
              <input
                type="number"
                placeholder="Calificación (1-5)"
                value={calificacion}
                min="1"
                max="5"
                onChange={(e) => setCalificacion(parseInt(e.target.value))}
                required
              />
              <input 
                type="text"
                placeholder="Comentario"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                required>
              </input>
              <button type="submit" onClick={handleSubmitReview}>Enviar</button>
              </form> 

          {space.review && space.review.length > 0 ? (
            space.review.map((review) => (
              <Review key={review.id} review={review} />
            ))
          ) : (
            <p>No hay reseñas para este espacio.</p>
          )}
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={photoIndex}
          slides={slides}
          styles={{
            container: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
          }}
        />
      )}
    </div>
  );
}