import React, { useState, useContext } from "react"
import { UserContext } from "../context/userContext";


import homeCSS from "../assets/css/Home.css"
import landingCSS from "../assets/css/Landing.css"

import 'bootstrap'
import { Modal, Alert } from "react-bootstrap"

import Masonry from 'react-masonry-css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faHome, faPlusSquare, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from "react-router-dom"

import { useMutation } from "react-query";
import { API } from "../config/api";

import LoginModal from "./modal/LoginModal";
import RegisterModal from "./modal/RegisterModal";

function Landing() {
  const title = "Login";
  document.title = "DumbGram | " + title;

  // useNavigate declare
  const navigate = useNavigate()  

  // Modal Login
  const [show, setShow] = useState(false);    
  const handleClose1 = () => setShow(false);
  const handleShow1 = () => {
    handleClose2(false)
    setShow(true)
  };  

  // //

  // Modal Register
  const [show2, setShow2] = useState(false);    
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    handleClose1(false)
    setShow2(true)
  };       

  return (     
    <>                                   
      <div className="container" style={{marginTop: '4rem'}}>
          <div className="row">
            {/* Kiri */}
            <div className="col-6">             
              <img src={require('../assets/image/group5.png')} alt="" style={{marginLeft: '-25px'}} />                     
              <div className="row" style={{marginTop: '2rem'}}>
                <span style={{fontWeight: 'bold', fontSize: '50px'}}>Share your best</span>
                <span style={{fontWeight: 'bold', fontSize: '50px'}}>photos or videos</span>
              </div>            
              <div className="row" style={{marginTop: '2rem'}}>
                <span style={{color: 'gray', fontSize: '15px'}}>Join now, share your creations with another</span>              
                <span style={{color: 'gray', fontSize: '15px'}}>people and enjoy other creations.</span>              
              </div>
              <div className="row" style={{fontWeight: 'bold', alignItems: 'center'}}>
                <div className="col-3 mt-5">
                  <button onClick={handleShow1} type="button" className="text-center text-white" style={{background: 'linear-gradient(90deg, #4DD4F7 0%, #9090FB 36.46%, #FF6B81 71.35%, #FBDF63 100%)', borderRadius: '5px', border: 'none', color: 'white', textDecoration: 'none', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '3rem', paddingRight: '3rem'}} data-bs-toggle="modal" data-bs-target="#exampleModal">                
                    <span style={{color: 'white', fontSize: '17px'}}>
                      <b>Login</b>
                    </span>              
                  </button>                            
                </div>
                <div className="col-9 mt-5">              
                  <div style={{borderRadius: '5px', border: 'none', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '3rem', paddingRight: '3rem'}} data-bs-toggle="modal" data-bs-target="#exampleModal1">              
                    <span onClick={handleShow2} style={{cursor: 'pointer', fontSize: '17px', color: 'gray'}}>Register</span>              
                  </div>
                </div>
              </div>
            </div>    
            {/* Kanan */}
            <div className="col-6">          
              <div className="row">            
                <div className="col-4">        
                  <img src={require('../assets/image/c1.png')} className="img-fluid mb-4" alt="" />
                  <img src={require('../assets/image/c2.png')} className="img-fluid mb-4" alt="" />       
                  <img src={require('../assets/image/c3.png')} className="img-fluid mb-4" alt="" />       
                </div>                    
                {/*Grid column*/}
                <div className="col-4">        
                  <img src={require('../assets/image/c4.png')} className="img-fluid mb-4" alt="" />
                  <img src={require('../assets/image/c5.png')} className="img-fluid mb-4" alt="" />                     
                </div>              
                {/*Grid column*/}
                <div className="col-4">
                  <img src={require('../assets/image/c6.png')} className="img-fluid mb-4" alt="" />
                  <img src={require('../assets/image/c7.png')} className="img-fluid mb-4" alt="" />       
                  <img src={require('../assets/image/c8.png')} className="img-fluid mb-4" alt="" /> 
                </div>                                                                                    
              </div> 
            </div>
          </div> 
      </div> 

      {/* Modal Login */}        
      <Modal show={show} onHide={handleClose1} aria-labelledby="contained-modal-title-vcenter" centered>                 
        <Modal.Body className="bg-dark" >
        <div className="container">
        <div className="row mt-3">
            <h1><b>Login</b></h1>
        </div>
        <div className="row mt-1 mb-2">
            <LoginModal/>
            <p className="text-center text-muted">
                Don't Have an account? Click 
                <span style={{cursor: 'pointer', fontSize: '17px', color: 'gray'}} onClick={handleShow2}>
                <b> Here</b>
                </span>                  
            </p>
        </div>
        </div> 
        </Modal.Body>                  
      </Modal>

      {/* Modal Register */}
      <Modal show={show2} onHide={handleClose2} aria-labelledby="contained-modal-title-vcenter" centered>         
        <Modal.Body className="bg-dark">
          <div className="container">
            <div className="row mt-3">
              <h1><b>Register</b></h1>
            </div>
            <div className="row mt-1 mb-2">
                <RegisterModal/>
                <p className="text-center text-muted">
                  Already have Account ? Click
                  <span onClick={handleShow1} style={{cursor: 'pointer', fontSize: '17px', color: 'gray'}} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <b> Here</b>
                  </span>
                </p>
            </div>
          </div>
        </Modal.Body>          
      </Modal>
    </>
  )
}

export default Landing;