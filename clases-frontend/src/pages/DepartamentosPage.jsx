import React from 'react'; 
import DepartamentosList from '../components/departamentos/DepartamentosList'; 
import { Link } from 'react-router-dom'; 
 
const DepartamentosPage = () => { 
  return ( 
    <div className="container mt-4"> 
      <div className="row"> 
        <div className="col-12"> 
          <div className="card"> 
            <div className="card-header d-flex justify-content-between align-items-center"> 
              <h2>Departamentos</h2> 
              <Link to="/dashboard" className="btn btn-secondary"> 
                Volver al Dashboard 
              </Link> 
            </div> 
            <div className="card-body"> 
              <DepartamentosList /> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
}; 
  
export default DepartamentosPage; 