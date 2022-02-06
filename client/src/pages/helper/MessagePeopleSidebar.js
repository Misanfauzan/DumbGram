import React, {Component} from "react"

import 'bootstrap'
import { Image } from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faHome, faPlusSquare, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from "react-router-dom"

function MessageSidebar() {
    // useNavigate declare
    const navigate = useNavigate()

    // Handler Navigate  
    const handleNavigateToHome = () => {
        navigate("/");
    }
    const handleNavigateToMessageTrigger = () => {
        navigate("/messageTrigger");
    }
    // End Handler Navigate
    return(
        <>
            <nav className="navbar" style={{height: '15vh'}}>            
                <button className="navbar-brand" href="#" style={{background: 'none', border: 'none'}}>
                    <img src={require('../../assets/image/Icon.png')} onClick={handleNavigateToHome} alt="" />
                </button>              
            </nav>
          {/* Message */}        
            <ul>
                <li style={{listStyle: 'none'}}>
                    <a onClick={handleNavigateToMessageTrigger} style={{textDecoration: 'none', color: 'white', cursor:'pointer',}}>
                        <div className="row mt-4" style={{alignItems: 'center', fontSize: '12px'}}>                            
                        <div className="col-2">            
                            <img src={require('../../assets/image/c2.png')} className="rounded-circle" alt="" style={{ height: '3rem', width:'3rem' }} />
                        </div>   
                        <div className="col-10">
                            <div className="row">
                            <div className="col">egi_lol</div>                    
                            </div>
                            <div className="row text-muted mt-1">
                            <div className="col">Hello Lisa</div>                    
                            </div>
                        </div>                                                                             
                        </div> 
                    </a>                
                </li>            
                <li style={{listStyle: 'none'}}>
                    <a style={{textDecoration: 'none', color: 'white', cursor:'pointer',}}>
                        <div className="row mt-4" style={{alignItems: 'center', fontSize: '12px'}}>                            
                            <div className="col-2">            
                                <img src={require('../../assets/image/c3.png')} className="rounded-circle" alt="" style={{ height: '3rem', width:'3rem' }} />
                            </div>   
                            <div className="col-10">
                                <div className="row">
                                <div className="col">beach_lover</div>                    
                                </div>
                                <div className="row text-muted mt-1">
                                <div className="col">Hello Lisa, when do you go to the beach</div>                    
                                </div>
                            </div>                                                                             
                        </div> 
                    </a>                
                </li>
                <li style={{listStyle: 'none'}}>
                    <a style={{textDecoration: 'none', color: 'white', cursor:'pointer',}}>
                        <div className="row mt-4" style={{alignItems: 'center', fontSize: '12px'}}>                            
                            <div className="col-2">            
                                <img src={require('../../assets/image/c1.png')} className="rounded-circle" alt="" style={{ height: '3rem', width:'3rem' }} />
                            </div>   
                            <div className="col-10">
                                <div className="row">
                                    <div className="col">zayn</div>                    
                                </div>
                                <div className="row text-muted mt-1">
                                    <div className="col"></div>                    
                                </div>
                            </div>                                                                             
                        </div> 
                    </a>                
                </li>
            </ul>    
        </>
    )
}

export default MessageSidebar