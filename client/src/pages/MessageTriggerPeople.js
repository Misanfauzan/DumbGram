import React, {Component} from "react"

import homeCSS from "../assets/css/Home.css"

import 'bootstrap'
import { Image } from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faHome, faPlusSquare, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from "react-router-dom"

import MessagePeopleSidebar from "./helper/MessagePeopleSidebar"
import Navbar from "./helper/Navbar"

function MessageTriggerPeople() {
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
            <MessagePeopleSidebar/>                                                 
            </div> 
            {/* End Left Content */}
            {/* Right Content */}
            <div className="col-8">
            <div className="container">
                <Navbar/>
                <div className="row">
                    <div className="overflow-auto" style={{height: '75vh'}}>                               
                        {/* <ul>
                            <li style={{listStyle: 'none'}}>
                                <div className="row" style={{alignItems: 'center'}}>
                                    <div className="col-1">
                                    <img src={require('../assets/image/Ellipse4.png')} alt="" width="100%" />
                                    </div>
                                    <div className="col">
                                        <span>Hello Lisa</span>
                                    </div>
                                </div>
                            </li>                                                
                        </ul> */}
                    </div>                                 
                    <div style={{height: '10vh', paddingTop: '1rem'}}>
                    <form className>                                          
                        <input type="text" className="form-control bg-dark" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" style={{border: 'none', color: 'white'}} />                    
                    </form> 
                    </div> 
                </div>                      
            </div>
            </div>                                  
        </div>
    </>
  )
}

export default MessageTriggerPeople;