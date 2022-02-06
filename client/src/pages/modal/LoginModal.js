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

function LoginModal() {
    // useNavigate declare
    const navigate = useNavigate()

    let api = API();

  const [state1, dispatch1] = useContext(UserContext);

  const [message1, setMessage1] = useState(null);
  const [form1, setForm1] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form1;  

  const handleChange1 = (e) => {
    setForm1({
      ...form1,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Data body
      const body = JSON.stringify(form1);

      // Configuration
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      };

      // Insert data for login process
      const response = await api.post("/login", config);

      console.log(response);

      // Checking process
      if (response.status === "success") {
        // Send data to useContext
        dispatch1({
          type: "LOGIN_SUCCESS",
          payload: response.data,
        });

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage1(alert);
        
        navigate("/")

      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed success
          </Alert>
        );
        setMessage1(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage1(alert);
      console.log(error);
    }
  });

  return (     
    <>                                        
      {/* Modal Login */}              
      <form onSubmit={(e) => handleSubmitLogin.mutate(e)}>
            {message1 && message1}
            <div className="mt-4 mb-4">                
                <input 
                type="email" 
                className="form-control bg-dark text-white p-3" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Email" 
                value={email}
                name="email"
                onChange={handleChange1}
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
                onChange={handleChange1}
                />
            </div>              
            <div className="mb-1">              
                <button className="text-center" style={{background: 'linear-gradient(90deg, #4DD4F7 0%, #9090FB 36.46%, #FF6B81 71.35%, #FBDF63 100%)', borderRadius: '5px', border: 'none', color: 'white', textDecoration: 'none', paddingTop: '1rem', paddingBottom: '1rem', paddingLeft: '3rem', paddingRight: '3rem', display: 'block', width: '100%'}}>              
                <span style={{color: 'white', fontSize: '17px'}}>
                    <b>Login</b>
                </span>              
                </button>                 
            </div>
        </form>          
    </>
  )
}

export default LoginModal;