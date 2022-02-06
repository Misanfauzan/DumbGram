import React, { useContext, useState } from "react"

import homeCSS from "../../assets/css/Home.css"
import navbarCSS from "../../assets/css/Navbar.css"

import 'bootstrap'
import { Image, Modal, Button, ModalBody } from "react-bootstrap"

import Masonry from 'react-masonry-css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faCompass, faHeart, faHome, faPaperPlane, faPlusSquare, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from "react-router-dom"

import { useQuery } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

function MainSidebar() {
    let api = API();
    const [state, dispatch] = useContext(UserContext);

    // useNavigate declare
     const navigate = useNavigate()

    // Handler Navigate  
    const handleNavigateToMessage = () => {
        navigate("/message");
    }       
    const handleNavigateToCreate = () => {
        navigate("/create");
    }
    // End Handler 
    
    // Modal
    const [show, setShow] = useState(false);    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let id  = localStorage.id;

    let { data: notif} = useQuery("notifCache", async () => {
        const config = {
          method: "GET",
          headers: {
            Authorization: "Basic " + localStorage.token,
          },
        };
        const response = await api.get("/comment-user", config);
        return response.data;
    });

    return (        
      <>           
        <Modal show={show} onHide={handleClose}  dialogClassName="modal-notif" >          
          <div style={{ position: 'fixed',right: '21.5%',top: '11.5%' }}>
            <div style={{width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '20px solid #212529'}} />
          </div>          
          <Modal.Body className="bg-dark">
          {notif?.length !== 0 ? (
            <ul className="p-0 mt-3" style={{ listStyle:'none', width:'30vh'}}>
              {notif?.slice(-3).map((item, index) => (    
                <li className="mb-3">                                  
                {(() => { 
                  if (item.idUser == id ) {                            
                    return(
                      <div className="text-white" style={{fontSize: '12px'}} >
                        <div className="row">
                          <div className="col-3 text-center">
                            <img src={item.image} className="rounded-circle" alt="" style={{ height: '1.5rem', width:'1.5rem' }} />
                          </div>
                          <div className="col-9">
                            <span>{item.username}</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3 text-center" />
                          <div className="col-9">
                            <span>
                              Komentar: <span style={{color: 'gray'}}>{item.comment}</span>
                            </span>
                          </div>
                        </div>
                      </div>  
                    )
                  }                               
                })()}
                </li>                 
              ))}                          
            </ul>
            ) : (                  
              <div>No Have Any Comment</div>                
            )} 
          </Modal.Body>     
        </Modal>       
        <nav className="navbar" style={{height: '15vh'}}>            
          <form>                       
            {/* <input class="form-control bg-dark fa" type="search" placeholder="&#xf002;" aria-label="Search">             */}
            <div className="input-group">
              <span className="input-group-text bg-dark" id="basic-addon1" style={{border: 'none', color: 'white'}}>                    
                <FontAwesomeIcon icon={faSearch} />                                                               
              </span>
              <input type="text" className="form-control bg-dark" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" style={{border: 'none', color: 'white', width: '25rem'}} />
            </div>
          </form>            
          <div className="d-flex" style={{alignItems: 'center'}}>
            <div className="btn-group">  
              <button onClick={handleShow} className="navbar-brand" href="#"  data-bs-toggle="dropdown" aria-expanded="false" style={{background: 'none', border: 'none'}}>
                <img src={require('../../assets/image/bell1.png')} style={{width: '80%'}} />
              </button>                                      
            </div>  
            <button className="navbar-brand" href="Message-none.html" style={{background: 'none', border: 'none'}}>                
              <img src={require('../../assets/image/paper-plane1.png')} style={{width: '80%'}} onClick={handleNavigateToMessage} />
            </button>               
            <button className="text-center" onClick={handleNavigateToCreate} style={{background: 'linear-gradient(90deg, #4DD4F7 0%, #9090FB 36.46%, #FF6B81 71.35%, #FBDF63 100%)', borderRadius: '5px', border: 'none', color: 'white', textDecoration: 'none', paddingTop: '0.3rem', paddingBottom: '0.3rem', paddingLeft: '1rem', paddingRight: '1rem'}}>              
              <FontAwesomeIcon icon={faPlusSquare} style={{color: 'rgba(0, 0, 0, 0.25)'}}/>                  
              <span style={{paddingLeft: '10px', color: 'white', fontSize: '17px', fontWeight:'bold' }}> Create Post</span>
            </button>                                               
          </div>
        </nav>                            
      </>              
     )
}

export default MainSidebar;