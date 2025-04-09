import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDepartamento, createDepartamento, updateDepartamento } from '../../services/departamentoService';

const DepartamentoForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isEditing = !!id;

  useEffect(() => {
    const fetchDepartamento = async () => {
      try {
        setLoading(true);
        const response = await getDepartamento(id);
        const data = response.data;
        setNombre(data.nombre || '');
      } catch (err) {
        setError('Error al cargar el departamento');
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };
  
    if (isEditing) {
      fetchDepartamento();
    }
  }, [id, isEditing]); // ✅ Ahora las dependencias están completas y no hay warnings
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditing) {
        await updateDepartamento(id, { nombre });
      } else {
        await createDepartamento({ nombre });
      }
      navigate('/departamentos');
    } catch (err) {
      setError(err.message || 'Error al guardar el departamento');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) return <div>Cargando...</div>;

  return (
    <div className="card">
      <div className="card-header">
      <h3>{isEditing ? `Editar Departamento: ${nombre || '...'}` : 'Crear Departamento'}</h3>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="nombre">Nombre del Departamento</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate('/departamentos')}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartamentoForm; 