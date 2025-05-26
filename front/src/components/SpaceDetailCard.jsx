import { useState, useEffect } from "react";
import { Review } from "./Review"; 
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {  useParams } from "react-router-dom";

export function SpaceDetailCard({ setShowModal, id, space, setSpace, userId }) {
  const [averageRating, setAverageRating] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState('');
  const [photoIndex, setPhotoIndex] = useState(0);
  const [modalReview, setModalReview] = useState(false)
  const { id: spaceWorkId } = useParams();
  const token = localStorage.getItem("authToken");
  const isLoggedIn = !!token;

  useEffect(() => {

     const token = localStorage.getItem("authToken"); 

    const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), 
  };

    fetch(`http://localhost:3000/spaceWork/${id}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Espacio no encontrado");
        }
        return res.json();
      })
      .then((data) => setSpace(data))
      .catch((error) => {
        console.error("Error al cargar el espacio:", error);
        setSpace(null); 
      });
  }, [id, setSpace]);

  useEffect(() => {
    if (space?.review?.length > 0) {
      const total = space.review.reduce((sum, r) => sum + r.calificacion, 0);
      const promedio = total / space.review.length;
      const promedioFixed = promedio.toFixed(1)
      setAverageRating(promedioFixed);
    }
  }, [space?.review]);

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
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',

          },
          body: JSON.stringify(dataReview)
        });

        const data = await res.json()

        if(res.status === 201) {
          alert('Reseña enviada con éxito');
          setSpace((prev) => ({
            ...prev,
            review: [...prev.review, data]
          }));
          setComentario("");
          setCalificacion(0);
        } else {
          alert(data.message || "Error al crear la reseña");
        }
    } catch (error) {
      console.error("Error al publicar la reseña:", error);
    }

    setModalReview(false);
  }

  if (!space) return <p>El espacio no existe o hubo un error al cargarlo.</p>;

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
          {space.fotos.slice(0,4).map((foto, index) => (
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
            <p className="ubicacion">{space.ubicacion}</p>
            <ul className="servicios">
                {space.servicios.map((servicio, index) => (
              <li key={index} className={index === 0 ? "sin-punto" : ""}>
                {servicio}
              </li>))}
            </ul>
            <p>
              {averageRating !== null && (
                <>
                  ⭐{averageRating}
                  <a href="#section-reviews" style={{ textDecoration: "underline", cursor: "pointer", color: "black", paddingLeft: "5px" }}>
                    {space.review.length} Evaluaciones
                  </a>
                </>
              )}
            </p>

            <p className="owner">
              <span className="owner-icon">
                img
              </span>
              Owner: {space?.owner?.name}
            </p>

            <div className="description-box">
              <h5 className="description-title">Descripción:</h5>
              <p>{space.descripcion}</p>  
            </div>

            <div className="reviews-section" id="section-reviews">
              <h2>Reviews</h2>
               <div className="review-section-make-review">
                {isLoggedIn ? 
              <button onClick={() => { setModalReview(true); }} className="make-review">Make a review</button>
              : 
              <p></p>
              }
              </div> 
              
              

              {modalReview && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <h3>Escribí tu reseña</h3>
                    <form onSubmit={handleSubmitReview}>
                      <select
                        className="options-reviews"
                        value={calificacion}
                        onChange={(e) => setCalificacion(parseInt(e.target.value))}
                        required>
                        <option value="" disabled>Calificación</option>
                        <option value="1">⭐ 1</option>
                        <option value="2">⭐ 2</option>
                        <option value="3">⭐ 3</option>
                        <option value="4">⭐ 4</option>
                        <option value="5">⭐ 5</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Comentario"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        required
                      />
                      <div className="modal-buttons">
                        <button type="submit">Enviar</button>
                        <button type="button" onClick={() => setModalReview(false)}>Cancelar</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {space.review && space.review.length > 0 ? (
                space.review.map((review) => (
                  <Review key={review.id} review={review} />
                ))
              ) : (
                <p>No hay reseñas para este espacio.</p>
              )}
            </div>
          </div>

          <div className="container-rigth-lateral">
            <div className="content-rigth-lateral"> 
              <div className="container-card-reserve">
                <p>${space.precio}</p>
                <p>{new Date(space.startDate).toLocaleDateString("es-AR")} al {new Date(space.endDate).toLocaleDateString("es-AR")}</p>
              </div>
              {isLoggedIn ? (
                <button onClick={() => setShowModal(true)}>Reserve</button>
              ) : (
                <p className="margin-top-message"><em>Iniciá sesión para reservar este espacio.</em></p>
              )}
            </div>
          </div>
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