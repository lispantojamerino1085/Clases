import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTrabajador,createTrabajador, updateTrabajador } from '../../services/trabajadorService'; // <== asegúrate de importar este

const TrabajadorForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    correo: '',
    telefono: '',
    id_departamento: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // <- leer el id de la URL para saber si estamos editando

  useEffect(() => {
    if (id) {
      // Modo edición: cargar los datos del trabajador
      getTrabajador(id)
        .then(data => {
          console.log('Trabajador cargado:', data);
          setFormData(data);
        })
        .catch(err => {
          setError('Error al cargar el trabajador');
          console.error(err);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // Editar trabajador
        await updateTrabajador(id, formData);
      } else {
        // Crear nuevo
        await createTrabajador(formData);
      }
      navigate('/trabajadores');
    } catch (err) {
      setError('Error al guardar el trabajador');
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate('/trabajadores');
  };

  if (!formData || Object.keys(formData).length === 0) {
    return <div>Cargando...</div>; // o un spinner si prefieres
  }
  
  return (
    <div className="container mt-4">
      <h2>Registrar Nuevo Trabajador</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Apellido:</label>
          <input
            type="text"
            className="form-control"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección:</label>
          <input
            type="text"
            className="form-control"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>


        <div className="mb-3">
          <label className="form-label">Correo electrónico:</label>
          <input
            type="email"
            className="form-control"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono:</label>
          <input
            type="text"
            className="form-control"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>


        <div className="mb-3">
          <label className="form-label">Departamento (ID):</label>
          <input
            type="number"
            className="form-control"
            name="id_departamento"
            value={formData.id_departamento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex justify-content-start gap-2">
          <button type="submit" className="btn btn-success">Guardar</button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default TrabajadorForm;
