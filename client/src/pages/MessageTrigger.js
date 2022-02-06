import React, { useState } from "react"

import homeCSS from "../assets/css/Home.css"

import 'bootstrap'
import { Image } from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faHome, faPlusSquare, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { useNavigate, useParams } from "react-router-dom"

import MessageSidebar from "./helper/MessageSidebar"
import Navbar from "./helper/Navbar"

import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

function MessageTrigger() {
    let id = useParams().id    
    let userId = localStorage.id
    let api = API();   

    // useNavigate declare
     const navigate = useNavigate()

    // Handler Navigate  
    const handleNavigateToHome = () => {
        navigate("/");
    }    
    // End Handler Navigate            

    let { data: messageUser } = useQuery("messageUserCache", async () => {
        const config = {
          method: "GET",
          headers: {
            Authorization: "Basic " + localStorage.token,
          },
        };
        const response = await api.get("/message-user/" + id, config);        
        return response.data;
    });        

    const [form, setForm] = useState({
        message: "",             
        sourceIdMessage: userId,
        targetIdMessage: id,         
      }); //Store product data
  
      const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
            
      };
    
      const handleSubmit = useMutation(async (e) => {
        try {    
          e.preventDefault();
          // Store data with FormData as object
          const body = JSON.stringify(form);       
    
          // Configuration
          const config = {
            method: "POST",
            headers: {
              Authorization: "Basic " + localStorage.token,
              "Content-type": "application/json",
            },
            body: body,
          };
    
          // Insert product data
          const response = await api.post("/message/" + id, config);
    
          navigate("/message-user/" + id);
        } catch (error) {
          console.log(error);
        }
      });

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
                    <div className="overflow-auto" style={{height: '75vh'}}> 
                        <ul className="p-0">
                            {messageUser?.map((item) => ( 
                                <li className="mb-4" style={{listStyle: 'none'}}> 
                                {(() => {
                                    if (item.sourceIdMessage == id) {
                                        return(
                                            <>                                                
                                                <div className="row" style={{alignItems: 'center'}}>
                                                    <div className="col-1">
                                                        <img src={item.sourceMessage.image} className="rounded-circle" alt="" style={{ height: '3rem', width:'3rem' }} />
                                                    </div>
                                                    <div className="col-10">
                                                        <span>{item.sourceMessage.username}</span>
                                                    </div>
                                                </div>
                                                <div className="row" style={{alignItems: 'center'}}>
                                                    <div className="col-1"></div>
                                                    <div className="col-10">
                                                        <span>{item.message}</span>
                                                    </div>
                                                </div>                                                
                                            </>                                                  
                                        ) 
                                    } else{
                                        return (
                                            <>
                                            <div class="d-flex flex-row-reverse" style={{ alignItems: 'center' }}>
                                                <div className="p-2">
                                                    <img src={item.sourceMessage.image} className="rounded-circle" alt="" style={{ height: '3rem', width:'3rem' }} />
                                                </div>
                                                <div className="p-2">
                                                    <span>Me</span>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row-reverse"  style={{ alignItems: 'center', paddingRight: '8%' }}>                                                                                               
                                                <div className="p-2">
                                                    <span>{item.message}</span>                                                  
                                                </div>
                                            </div>
                                            </>
                                        )
                                    }
                                })()}                                                                    
                                </li>                                                
                            ))}                
                        </ul>
                                                                              
                    </div>                      
                    <div style={{height: '10vh', paddingTop: '1rem'}}>
                        <form onSubmit={(e) => handleSubmit.mutate(e)}>                                          
                            <input 
                            type="text" 
                            className="form-control bg-dark" 
                            placeholder="Search" 
                            aria-label="Username" 
                            aria-describedby="basic-addon1" 
                            style={{border: 'none', color: 'white'}} 
                            name="message" 
                            onChange={handleChange}    
                            />                    
                        </form> 
                    </div> 
                </div>                      
            </div>
            </div>                                  
        </div>
    </>
  )
}

export default MessageTrigger;