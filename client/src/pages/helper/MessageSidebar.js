import React, { useContext } from "react"

import 'bootstrap'
import { Image } from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faHome, faPlusSquare, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { useNavigate, Link } from "react-router-dom"

import { useQuery } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

function MessageSidebar() {
    const title = "Message";
    document.title = "DumbGram | " + title;
    
    let api = API();
    const [state, dispatch] = useContext(UserContext);
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

    let id  = localStorage.id;

    let { data: users} = useQuery("usersCache", async () => {
        const config = {
          method: "GET",
          headers: {
            Authorization: "Basic " + localStorage.token,
          },
        };
        const response = await api.get("/message/" + id, config);
        return response.data;
    });

    return(
        <>          
        <nav className="navbar" style={{height: '15vh'}}>            
            <button className="navbar-brand" href="#" style={{background: 'none', border: 'none'}}>
                <img src={require('../../assets/image/Icon.png')} onClick={handleNavigateToHome} alt="" />
            </button>              
        </nav>
          {/* Message */} 
            <div className="overflow-auto" style={{height: '85vh'}}>
                {users?.length !== 0 ? (
                <ul>
                    {users?.map((item, index) => (
                    <li style={{listStyle: 'none'}}>
                        <Link to={`/message-user/${item.sourceIdMessage}`} style={{textDecoration: 'none', color: 'white', cursor:'pointer',}}>
                            <div className="row mt-4 me-0" style={{alignItems: 'center', fontSize: '14px'}}>                            
                                <div className="col-2">                                    
                                    <img src={item.image} className="rounded-circle" alt="" style={{ height: '3rem', width:'3rem' }} />
                                </div>   
                                <div className="col-10">
                                    <div className="row">
                                        <div className="col">{item.username}</div>                    
                                    </div>                                    
                                </div>                                                                             
                            </div> 
                        </Link>                
                    </li>                     
                    ))}                                               
                </ul>
                ) : (                  
                    <div></div>                
                )}                       
            </div>
        </>
    )
}

export default MessageSidebar