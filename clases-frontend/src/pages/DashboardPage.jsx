import React, { useContext } from 'react'; 
import { AuthContext } from '../context/AuthContext'; 
import { Link, useNavigate } from 'react-router-dom'; 
 
const DashboardPage = () => { 
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Esta función debe eliminar el token y limpiar el estado
    navigate('/login'); // Redirige al login
  };
 
 
  return ( 
    <div className="container mt-4"> 
      <div className="row"> 
        <div className="col-12"> 
          <div className="card"> 
            <div className="card-header"> 
              <h2>Dashboard</h2> 
            </div> 
            <div className="card-body"> 
              <h5>Bienvenido, {currentUser?.name || 'Usuario'}</h5> 
              <p>Selecciona una opción:</p> 
               
              <div className="row mt-4"> 
                <div className="col-md-6"> 
                  <div className="card mb-3"> 
                    <div className="card-body"> 
                      <h5 className="card-title">Departamentos</h5> 
                      <p className="card-text"> 
                        Gestiona los departamentos de la empresa. 
                      </p> 
                      <Link to="/departamentos" className="btn btn-primary"> 
                        Ver Departamentos 
                      </Link> 
                    </div> 
                  </div> 
                </div> 
                 
                <div className="col-md-6"> 
                  <div className="card mb-3"> 
                    <div className="card-body"> 
                      <h5 className="card-title">Trabajadores</h5> 
                      <p className="card-text"> 
                        Gestiona los trabajadores de la empresa. 
                      </p> 
                      <Link to="/trabajadores" className="btn btn-primary"> 
                        Ver Trabajadores 
                      </Link> 
                    </div> 
                  </div> 
                </div> 


                {/* Botón de cerrar sesión */}
                <div className="col-md-12">
                  <div className="text-center mt-3">
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Cerrar Sesión
                    </button>
                  </div>
                </div>                

              </div> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div>
  ); 
};

export default DashboardPage;