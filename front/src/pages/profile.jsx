import { useEffect, useState } from "react";
import '../styles/profile.css';

export function Profile() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  })
  

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetch('http://localhost:3000/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Not authorized');
        return res.json();
      })
     .then(data => {
       console.log('Usuario cargado:', data);
        setUser(data);
        setFormData({
          name: data.name,
          email: data.email,
          address: data.address || ''
        });
      })
      .catch(err => console.error(err));
  }, []);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

  if (!user) return <p className="loading">Cargando perfil...</p>;

   const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch(`http://localhost:3000/users/${user.userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
          if (!res.ok) throw new Error('cannot edit profile');

         const updatedUser = await res.json();
         setUser(updatedUser);
         handleCloseModal();

      } catch (error) {
        console.error(error)
      }
  }

  const onChangeFile = async (e) => {
    console.log(user.userId);

    
  const file = e.target.files[0];
  if (!file) return;

  const token = localStorage.getItem("authToken");
  const formData = new FormData();
  formData.append('image', file);
  try {
    const res = await fetch(`http://localhost:3000/files/uploadImageProfile/${user.userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setUser(prev => ({ ...prev, user_img: data.user_img })); 
      window.location.reload();
    } else {
      alert('Error al subir imagen: ' + data.message);
    }
  } catch (err) {
    console.error('Error al subir imagen:', err);
    alert('Error de red al subir imagen');
  }
};

  return (
    <section className="main">
        <div className="profile-main">
      <header className="profile-header">
        <h1>About me</h1>
        <button className="btn-edit"  onClick={handleOpenModal}>
          Edit profile
        </button>
      </header>

      <div className="profile-wrapper">
        <div className="profile-img">
          <div> 
          <img
            src={`${user.user_img}?t=${Date.now()}`}
            alt={`${user.name} profile`}
          />
          </div>
          <label htmlFor="photo-upload" className="btn-upload">Change photo</label>
          <input id="photo-upload" type="file" style={{ display: 'none' }} onChange={onChangeFile}/>
        </div>
        <div className="profile-content">
          <div className="profile-item">
            <h2>Name</h2>
            <p>{user.name}</p>
          </div>

          <div className="profile-item">
            <h2>Email</h2>
            <p>{user.email}</p>
          </div>

          <div className="profile-item">
            <h2>Address</h2>
            <p>{user.address || 'No especificada'}</p>
          </div>
        </div>
      </div>
      </div>

     {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Editar perfil</h2>
            <label>
              Nombre:
              <input name="name" value={formData.name}  onChange={handleChange}/>
            </label>
            <label>
              Email:
              <input name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label>
              Dirección:
              <input name="address" value={formData.address} onChange={handleChange}/>
            </label>
            <div className="modal-buttons">
              <button onClick={handleSave}>Guardar</button>
              <button onClick={handleCloseModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
