import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { calcularDias } from "../utils/dateCalc";
import "../styles/MainContent.css";

export function SpaceList() {
  const [space, setSpace] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem("authToken");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), 
  };

  fetch("http://localhost:3000/spaceWork", {
    method: "GET",
    headers,
  })
    .then((res) => {
      if (!res.ok) throw new Error("No se encontraron espacios");
      return res.json();
    })
    .then((data) => {
      setSpace(Array.isArray(data) ? data : data.data || []);
      setError(null);
    })
    .catch((error) => {
      console.error("Error en la petición:", error);
      setError(error.message);
    });
}, []);

  return (
    <div className="main-content">
      {error ? (
        <p style={{ textAlign: "center", width: "100%", color: "red" }}>
          {error}
        </p>
      ) : space.length === 0 ? (
        <p style={{ textAlign: "center", width: "100%" }}>
          No hay espacios disponibles por el momento.
        </p>
      ) : (
        space.map((spa) => (
          <Link
            to={`/space/${spa.id}`}
            key={spa.id}
            target="_blank"
            className="link-reset"
          >
            <div className="space-card">
              <div className="container-image">
                <img
                  src={spa.fotos?.[0]}
                  alt={spa.titulo}
                  className="img-card-space"
                />
              </div>
              <h4>{spa.ubicacion}</h4>
              <p>
                {spa.precio} por{" "}
                {calcularDias(spa.startDate, spa.endDate)} días
              </p>
              <p>{spa.isAvailable ? "Disponible" : "No disponible"}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}