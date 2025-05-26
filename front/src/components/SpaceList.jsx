import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { calcularDias } from "../utils/dateCalc";
import "../styles/MainContent.css";
import { Filtros } from "./Filtros";

export function SpaceList() {
  const [space, setSpace] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    ubicacion: "",
    startDate: "",
    endDate: "",
    capacidad: "",
  });

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
    })
    .finally(() => {
      setIsLoading(false);
    });
}, []);

const espaciosFiltrados = space.filter((spa) => {
  const matchUbicacion = !filters.ubicacion || spa.ubicacion.toLowerCase().includes(filters.ubicacion.toLowerCase());
  const matchStartDate = !filters.startDate || new Date(spa.startDate) >= new Date(filters.startDate)
  const matchEndDate = !filters.endDate || new Date(spa.endDate) <= new Date(filters.endDate)
  const matchCapacidad = !filters.capacidad || spa.capacidad >= parseInt(filters.capacidad);

    return matchUbicacion && matchStartDate && matchEndDate && matchCapacidad;

})

  return (
  <>
    {isLoading ? (
      <div className="no-results">
        <p style={{ color: "grey" }}>Loading...</p>
      </div>
    ) : error ? (
      <div className="no-results">
        <p style={{ color: "grey" }}>No spaces found</p>
      </div>
    ) : (
      <div className="main-wrapper">
        <Filtros onFilterChange={setFilters} />
        {espaciosFiltrados.length === 0 ? (
          <div className="no-results">
            <p>No spaces were found that match your filters.</p>
          </div>
        ) : (
          <div className="main-content">
            {espaciosFiltrados.map((spa) => (
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
                    {spa.precio} por {calcularDias(spa.startDate, spa.endDate)} días
                  </p>
                  <p>{spa.isAvailable ? "Disponible" : "No disponible"}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    )}
  </>
);
}