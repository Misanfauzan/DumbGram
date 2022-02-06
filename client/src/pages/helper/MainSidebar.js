import React, { useContext } from "react"

import homeCSS from "../../assets/css/Home.css"

import 'bootstrap'
import { Image } from "react-bootstrap"

import Masonry from 'react-masonry-css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faHome, faPlusSquare, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import imgBlank from "../../assets/image/blank-profile.png";

function MainSidebar() {
    let api = API();

    
    // useNavigate declare
    const navigate = useNavigate()

    const [state, dispatch] = useContext(UserContext);
    const logout = () => {
        console.log(state);
        dispatch({
          type: "LOGOUT",
        });
        navigate("/landing");
    };
    
    let id  = localStorage.id;
    // Handler Navigate  
    const handleNavigateToHome = () => {
        navigate("/");
    }   
    const handleNavigateToEditProfile = () => {
        navigate(`/edit-profile`);
    }
    const handleNavigateToFeed = () => {
        navigate("/feed");
    }
    const handleNavigateToExplore = () => {
        navigate("/explore");
    }    
    // End Handler Navigate         


    let { data: users} = useQuery("usersCache", async () => {
        const config = {
          method: "GET",
          headers: {
            Authorization: "Basic " + localStorage.token,
          },
        };
        const response = await api.get("/users/" + id, config);
        return response.data;
    });

    let { data: following } = useQuery("followingCache", async () => {
        const config = {
          method: "GET",
          headers: {
            Authorization: "Basic " + localStorage.token,
          },
        };
        const response = await api.get("/following-count/" + id, config);
        return response.data;
    });

    let { data: follower } = useQuery("followerCache", async () => {
        const config = {
          method: "GET",
          headers: {
            Authorization: "Basic " + localStorage.token,
          },
        };
        const response = await api.get("/follower-count/" + id, config);
        return response.data;
    });

    return (        
        <>        
            <nav className="navbar" style={{height: '15vh'}}>            
                <button className="navbar-brand" style={{background: 'none', border: 'none'}}>
                    <img src={require('../../assets/image/Icon.png')} alt="" onClick={handleNavigateToHome} />
                </button>              
            </nav>
            <div className="container-fluid">
            <div className="row g-0"> 
                <button className="text-end" style={{background: 'none', border: 'none'}}>
                    <img src={require('../../assets/image/edit1.png')} onClick={handleNavigateToEditProfile} alt="" style={{width: '5%'}} />                            
                </button>                      
            </div>                                    
            {users?.map((item, index) => (               
            <div>
                <div className="row g-0 text-center">
                    <img src={item.image} className="rounded-circle border border-3 mx-auto" alt="" style={{ height: '10rem', width:'10rem' }} />                
                </div>
                <div className="row g-0 text-center mt-4">
                    <span style={{fontSize: '24px'}}><b>{item.fullName}</b></span>             
                    <span className="text-white-50" style={{fontSize: '15px'}}>@{item.username}</span>             
                </div>
                <div className="mt-4">
                    <div className="row text-center text-white-50">
                    <div className="col-3 border-end">
                        <span>Post</span>
                    </div>
                    <div className="col-5">
                        <span>Followers</span>
                    </div>
                    <div className="col-4 border-start">
                        <span>Following</span>
                    </div>
                    </div> 
                    {/*  */}
                    <div className="row text-center">
                    <div className="col-3 border-end">
                        <span>{item.post}</span>
                    </div>   
                    {follower?.map((item, index) => (                 
                    <div className="col-5">
                        <span>{item.Follower}</span>
                    </div>
                    ))}
                    {following?.map((item, index) => ( 
                    <div className="col-4 border-start">
                        <span>{item.Following}</span>
                    </div>
                    ))} 
                    </div>                            
                    <div className="row border-bottom g-0 mt-4 pb-4">                
                    <div className="col text-center">
                        <span className="text-muted" style={{fontSize: '14px'}}>{item.bio}</span>
                    </div>
                    </div>
                </div>
            </div>  
            ))}                                                              
                {/*  */}
                <div className="row g-0 mt-4" style={{alignItems: 'center'}}>
                    <div className="col-2">
                        <FontAwesomeIcon icon={faHome} />                  
                    </div>
                <div className="col-10">
                    <button style={{color: 'white', background: 'none', border: 'none'}} onClick={handleNavigateToFeed}>
                        <span className>Feed</span>
                    </button>
                </div>
                </div>
                <div className="row border-bottom g-0 pb-4" style={{alignItems: 'center'}} onClick={handleNavigateToExplore}>                                            
                {/*  */}
                <div className="col-2 mt-4">
                <FontAwesomeIcon icon={faCompass} />                  
                </div>
                <div className="col-10 mt-4">
                    <button style={{color: 'white', background: 'none', border: 'none'}}>
                    <span className>Explore</span>
                    </button>
                </div>
                </div>
                {/*  */}
                <div className="row mt-4 pb-4" style={{alignItems: 'center'}} onClick={logout}>                                
                <div className="col-2">
                    <FontAwesomeIcon icon={faSignOutAlt} />                  
                </div>
                <div className="col-10">
                    <button style={{color: 'white', background: 'none', border: 'none'}} onClick={logout}>
                        <span className>Logout</span>
                    </button>
                </div>                       
                </div>
             
            </div>                 
        </>              
     )
}

export default MainSidebar;