import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDepartamentos, deleteDepartamento } from '../../services/departamentoService';
import DepartamentoItem from './DepartamentoItem';

const DepartamentosList = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDepartamentos = async () => {
    try {
      setLoading(true);
      const data = await getDepartamentos();
      setDepartamentos(data);
      setError('');
    } catch (err) {
      setError('Error al cargar departamentos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este departamento?')) {
      try {
        await deleteDepartamento(id);
        setDepartamentos(departamentos.filter(dep => dep.id !== id));
      } catch (err) {
        setError('Error al eliminar el departamento');
      }
    }
  }; 

  if (loading) return <div>Cargando departamentos...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="departamentos-list">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Listado de Departamentos</h2>
        <Link to="/departamentos/Crear" className="btn btn-success">
          Crear Departamento
        </Link>
      </div>
      
      {departamentos.length === 0 ? (
        <div className="alert alert-info">No hay departamentos registrados</div>
        ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {departamentos.map((departamento) => (
              <DepartamentoItem 
                key={departamento.id} 
                departamento={departamento} 
                onDelete={handleDelete} 
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DepartamentosList;