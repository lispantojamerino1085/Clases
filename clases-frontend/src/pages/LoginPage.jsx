import React from 'react'; 
import Login from '../components/auth/Login'; 
 
const LoginPage = () => { 
  return ( 
    <div className="container mt-5"> 
      <div className="row justify-content-center"> 
        <div className="col-md-6"> 
          <Login /> 
        </div> 
      </div> 
    </div> 
  ); 
}; 
 
export default LoginPage; 