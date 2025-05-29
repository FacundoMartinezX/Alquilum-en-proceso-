import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import '../styles/createSpaceWork.css';

export function CreateSpaceWork() {
  const [spaceWork, setSpaceWork] = useState({});

  const token = localStorage.getItem('authToken'); 
  let decode = null;

  try {
    if (token) {
      decode = jwtDecode(token);
    }
  } catch (error) {
    console.error("Token inválido:", error.message);
  }

  const userId = decode?.id || decode?.sub || decode?.userId || null;

  const handleSubmitSpaceWork = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('No se pudo obtener el usuario. Iniciá sesión de nuevo.');
      return;
    }

    const payload = { ...spaceWork, userId };
    payload.fotos = [];

    const formData = new FormData()
    try {
      const res = await fetch('http://localhost:3000/spaceWork', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {


        if(spaceWork.fotos?.length) {
          for (let i = 0; i < spaceWork.fotos.length; i++) {
            formData.append('image', spaceWork.fotos[i]);
            
          }
        }
        const uploadRes = await fetch(`http://localhost:3000/files/uploadImage/${data.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const uploadData = await uploadRes.json();
    if (uploadRes.ok) {
      alert('Fotos subidas con éxito!');
    } else {
      alert('Error al subir imágenes: ' + uploadData.message);
    }

    
        alert('Espacio creado con éxito!');


      } else {
        alert('Error del servidor: ' + (data.message || 'Error desconocido'));
      }

    } catch (error) {
      alert('Error al crear el espacio: ' + error.message);
    }
  };

  const onchangeSpaceWork = (e) => {
    const { name, value, files } = e.target;

    setSpaceWork((prev) => {
      if (name === 'precio' || name === 'capacidad') {
        return { ...prev, [name]: Number(value) };
      }

      if (name === 'servicios') {
        return { ...prev, servicios: value.split(',').map((s) => s.trim()) };
      }

      if (name === 'image') {
        return { ...prev, fotos: files ? Array.from(files) : [] };
      }


      if (name === 'startDate' || name === 'endDate') {
        return { ...prev, [name]: new Date(value) };
      }

      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Publicá tu espacio de trabajo</h2>
      <form className="form-spacework" onSubmit={handleSubmitSpaceWork}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input id="title" type="text" name='titulo' placeholder="Ej: Oficina en Palermo" onChange={onchangeSpaceWork}/>
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea id="description" name='descripcion' rows="4" placeholder="Describí tu espacio..." onChange={onchangeSpaceWork}></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="location">Ubicación</label>
          <input id="location" type="text" name='ubicacion' placeholder="Ej: Av. Santa Fe 1234, CABA" onChange={onchangeSpaceWork}/>
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio por día (ARS)</label>
          <input id="price" type="number" name='precio' placeholder="Ej: 2500" onChange={onchangeSpaceWork}/>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Fecha de inicio</label>
            <input id="startDate" type="date" name='startDate' onChange={onchangeSpaceWork}/>
          </div>

          <div className="form-group">
            <label htmlFor="endDate">Fecha de fin</label>
            <input id="endDate" type="date" name='endDate' onChange={onchangeSpaceWork}/>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Capacidad</label>
          <input id="capacity" type="number" name='capacidad' placeholder="Ej: 10 personas" onChange={onchangeSpaceWork}/>
        </div>

        <div className="form-group">
          <label htmlFor="services">Servicios incluidos</label>
          <input id="services" type="text" name='servicios' placeholder="Ej: Wifi, café, sala de reuniones" onChange={onchangeSpaceWork}/>
        </div>

        <div className="form-group">
          <label htmlFor="photo">Links a fotos</label>
          <input id="photo" type="file" name='image' multiple onChange={onchangeSpaceWork}/>
        </div>

        <button type="submit" className='button-post'>Publicar espacio</button>
      </form>

    </div>
  );
}