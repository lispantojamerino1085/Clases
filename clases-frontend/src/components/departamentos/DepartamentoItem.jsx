import React from 'react'; 
import { Link } from 'react-router-dom'; 
 
const DepartamentoItem = ({ departamento, onDelete }) => { 
  return ( 
    <tr> 
      <td>{departamento.id}</td> 
      <td>{departamento.nombre}</td> 
      <td>{departamento.descripcion}</td> 
      <td> 
        <Link to={`/departamentos/editar/${departamento.id}`} className="btn btn-sm btn-primary me-2"> 
          Editar 
        </Link> 
        <button onClick={() => onDelete(departamento.id)} className="btn btn-sm btn-danger"> 
          Eliminar 
        </button> 
      </td> 
    </tr> 
  ); 
}; 
 
export default DepartamentoItem;  