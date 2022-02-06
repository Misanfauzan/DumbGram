import React, {Component} from "react"

import homeCSS from "../assets/css/Home.css"

import 'bootstrap'
import { Image } from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faHome, faPlusSquare, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from "react-router-dom"

import MessageSidebar from "./helper/MessageSidebar"
import Navbar from "./helper/Navbar"

function Message() {
    // useNavigate declare
     const navigate = useNavigate()

    // Handler Navigate  
    const handleNavigateToHome = () => {
        navigate("/");
    }
    const handleNavigateToMessage = () => {
        navigate("/message");
    }
    // End Handler Navigate            

  return (        
    <>           
        <div className="row m-0 vh-100">        
        {/* Left Content */}
        <div className="col-4 border-end">      
          <MessageSidebar/>                                                 
        </div> 
        {/* End Left Content */}
        {/* Right Content */}
        <div className="col-8">
          <div className="container">
            <Navbar/>
            <div className="row">            
              <div className="d-flex justify-content-center align-items-center" style={{height: '85vh', fontSize: '20px'}}>
                <b>No Message</b>         
              </div>                                                        
            </div>                      
          </div>
        </div>                                  
      </div>
    </>
  )
}

export default Message;