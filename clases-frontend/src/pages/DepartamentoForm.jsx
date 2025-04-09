import React,{useState, useEffect } from "react";
import {useNavigate, useParams } from "react-router-dom";
import {getDepartamento, createDepartamento, updateDepartamento} from '../../services/departamentosService';

const DepartamentoForm = () => { 
    const {id}=useParams();
    const navigate = useParams();
    const [nombre, setNombre] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    const isEditing = !!id;

    useEffect(() => {
        if (isEditing){
            loadDepartamento();
        }
    },[id]);

    const loadDepartamento = async () => {
        try {
            setLoading(true);
            const data = await getDepartamento(id);
            setNombre(data.nombre || '');
        }   catch (err) {
            setError('Error al cargar el departamento');
            console.error(err);
        }   finally {
            setLoading(false);
        }
    };

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
            navigate('/departamento');
        }   catch (err) {
            setError(err.message || 'Error al guardar el departamento');
        }finally {
            setLoading(false);
        }
    };

    if (loading && isEditing) return <div>cargando...</div>;

    return ( 
      <div className="card"> 
        <div className="card-header">
            <h3>{isEditing ? 'Editar' : 'Crear'} Departamento </h3>
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
                    onChange={(e)=> setNombre(e.target.value)}
                    required
                /> 
            </div>
            <div className="d-flex justify-content-between">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/departamentos')}
                >
                    cancelar
                </button>
                <button
                    type="submit"
                    className="btn btn-prymary"
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

