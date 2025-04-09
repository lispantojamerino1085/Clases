import React from 'react'; 
import { Link } from 'react-router-dom'; 
import DepartamentoForm from '../components/departamentos/DepartamentoForm'; 
 
const DepartamentoCreatePage = () => { 
  return ( 
    <div className="container mt-4"> 
      <div className="row"> 
        <div className="col-12"> 
          <div className="card"> 
            <div className="card-header d-flex justify-content-between align-items-center"> 
              <h2>Crear Departamento</h2> 
              <Link to="/departamentos" className="btn btn-secondary"> 
                Volver a la lista 
              </Link> 
            </div> 
            <div className="card-body"> 
              <DepartamentoForm /> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
}; 
 
export default DepartamentoCreatePage;  