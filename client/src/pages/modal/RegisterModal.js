import React, { useState, useContext } from "react"
import { UserContext } from "../../context/userContext";


import homeCSS from "../../assets/css/Home.css"
import landingCSS from "../../assets/css/Landing.css"

import 'bootstrap'
import { Modal, Alert } from "react-bootstrap"

import Masonry from 'react-masonry-css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faHome, faPlusSquare, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from "react-router-dom"

import { useMutation } from "react-query";
import { API } from "../../config/api";

function RegisterModal() {    

    let api = API();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const { fullName, username, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRegister = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Data body
      const body = JSON.stringify(form);

      // Configuration Content-type
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      };

      // Insert data user to database
      const response = await api.post("/register", config);

      console.log(response);

      // Notification
      if (response.status === "success...") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success, Go To Login
          </Alert>
        );
        setMessage(alert);       
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed Register
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (     
    <>                                        
      {/* Modal Reegister */}              
        <form onSubmit={(e) => handleSubmitRegister.mutate(e)}>
            <div className="mt-4 mb-4">                
            {message && message}        
                <input 
                type="email" 
                className="form-control bg-dark text-white p-3" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Email" 
                value={email}
                name="email"
                onChange={handleChange}
                />                
            </div>
            <div className="mb-4">                
                <input 
                type="text" 
                className="form-control bg-dark text-white p-3" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Name" 
                value={fullName}
                name="fullName"
                onChange={handleChange}
                />                
            </div>
            <div className="mb-4">                
                <input 
                type="text" 
                className="form-control bg-dark text-white p-3" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp"
                placeholder="Username"                   
                value={username}
                name="username"
                onChange={handleChange}                    
                />                
            </div>
            <div className="mb-5">                
                <input 
                type="password" 
                className="form-control bg-dark text-white p-3" 
                id="exampleInputPassword1" 
                placeholder="Password" 
                value={password}
                name="password"
                onChange={handleChange} 
                />
            </div>              
            <div className="mb-1">              
                <button className="text-center" style={{background: 'linear-gradient(90deg, #4DD4F7 0%, #9090FB 36.46%, #FF6B81 71.35%, #FBDF63 100%)', borderRadius: '5px', border: 'none', color: 'white', textDecoration: 'none', paddingTop: '1rem', paddingBottom: '1rem', paddingLeft: '3rem', paddingRight: '3rem', display: 'block', width: '100%'}}>              
                <span style={{color: 'white', fontSize: '17px'}}>
                    <b>Register</b>
                </span>              
                </button>                 
            </div>
        </form>         
    </>
  )
}

export default RegisterModal;