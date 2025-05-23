import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import "../styles/filters.css";

export function Filtros({ onFilterChange }) {
  const [filters, setFilters] = useState({
    ubicacion: "",
    startDate: "",
    endDate: "",
    capacidad: "",
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
    ubicacion: "",
    startDate: "",
    endDate: "",
    capacidad: "",
  })
  }

  return (
    <>
      
    <div className="filtros">
      <div className="filtro-item">
        <FaMapMarkerAlt className="icon" />
        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación"
          value={filters.ubicacion}
          autoComplete="off"
          onChange={handleChange}
        />
      </div>

      <div className="filtro-item">
        <FaCalendarAlt className="icon" />
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
        />
      </div>

      <div className="filtro-item">
        <FaCalendarAlt className="icon" />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
        />
      </div>

      <div className="filtro-item">
        <FaUsers className="icon" />
        <input
          type="number"
          name="capacidad"
          placeholder="Capacidad"
          autoComplete="off"
          value={filters.capacidad}
          onChange={handleChange}
        />
      </div>
      <button className="clear-filters" onClick={handleClearFilters} disabled={
    !filters.ubicacion &&
    !filters.startDate &&
    !filters.endDate &&
    !filters.capacidad
  }>Clean filters</button>
    </div>
 </>
  );
}