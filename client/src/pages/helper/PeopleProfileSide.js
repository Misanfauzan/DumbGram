import React, { useState, useContext } from "react"

import homeCSS from "../../assets/css/Home.css"

import 'bootstrap'
import { Image } from "react-bootstrap"

import Masonry from 'react-masonry-css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faHome, faPlusSquare, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { useNavigate, useParams, Link } from "react-router-dom"
import { useQuery, useMutation } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

function PeopleProfileSide (){
    // useNavigate declare
    let id = useParams().id
    let userID = localStorage.id
    let api = API();
    const [state, dispatch] = useContext(UserContext);

    const navigate = useNavigate()

    // Handler Navigate  
    const handleNavigateToHome = () => {
        navigate("/");
    }   
    const handleNavigateToMessageTriggerPeople = () => {
        navigate("/messageTriggerPeople ");
    }
    const handleNavigateToEditProfile = () => {
        navigate("/editProfile");
    }
    const handleNavigateToFeed = () => {
        navigate("/feed");
    }
    const handleNavigateToExplore = () => {
        navigate("/explore");
    }
    const logout = () => {
        console.log(state);
        dispatch({
          type: "LOGOUT",
        });
        navigate("/landing");
    };

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

    let { data: followingGet } = useQuery("followingGetCache", async () => {
        const config = {
          method: "GET",
          headers: {
            Authorization: "Basic " + localStorage.token,
          },
        };
        const response = await api.get("/following/" + userID, config);
        // console.log(response.data.following)
        let followingSatu = await response.data.following.filter((item) => {
            return item.fromFollower.id == id
        })
        // console.log(followingSatu)
        return followingSatu;
    });

    const [form, setForm] = useState(); //Store product data
    
    const handleChange = (e) => {
    setForm({
        fromFollow: userID,      
        toFollow: id, 
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
          const response = await api.post("/follow/" + id , config);
    
          navigate("/people-profile/" + id);
        } catch (error) {
          console.log(error);
        }
      });

    // End Handler Navigate    
    return(
        <>
            <nav className="navbar" style={{height: '15vh'}}>            
                <a className="navbar-brand" href style={{ cursor: 'pointer', }}>
                    <img src={require('../../assets/image/Icon.png')} onClick={handleNavigateToHome} />
                </a>              
            </nav>
            <div className="container-fluid">

            {users?.map((item, index) => (               
            <div>
                <div className="row g-0 text-center">
                    <img src={item.image??require('../../assets/image/c5.png')} className="rounded-circle border border-3 mx-auto" alt="" style={{ height: '10rem', width:'10rem' }} />                
                </div>
                <div className="row g-0 text-center mt-4">
                    <span style={{fontSize: '24px'}}><b>{item.fullName}</b></span>             
                    <span className="text-white-50" style={{fontSize: '15px'}}>@{item.username}</span>             
                </div>
                <div className="row mt-4" style={{ alignItems: 'center' }}>
                    <div className="col text-end">
                        <Link to={`/message-user/${item.id}`} style={{background: 'linear-gradient(90deg, #4DD4F7 0%, #9090FB 36.46%, #FF6B81 71.35%, #FBDF63 100%)', borderRadius: '5px', border: 'none', color: 'white', textDecoration: 'none', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '1rem', paddingRight: '1rem', cursor:'pointer',}}>
                            <b>Message</b>
                        </Link> 
                    </div>
                    <div className="col text-start">
                        {followingGet?.length !== 0 ? (                            
                            <Link to className="bg-dark" style={{borderRadius: '5px', border: 'none', color: 'white', textDecoration: 'none', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '1rem', paddingRight: '1rem', cursor:'pointer',}}>
                                <b>Unfollow</b>
                            </Link> 
                        ) : (
                            <form onSubmit={(e) => handleSubmit.mutate(e)}>                        
                                <button type="submit" className="bg-dark" style={{background: 'linear-gradient(90deg, #4DD4F7 0%, #9090FB 36.46%, #FF6B81 71.35%, #FBDF63 100%)',borderRadius: '5px', border: 'none', color: 'white', textDecoration: 'none', paddingTop: '0.35rem', paddingBottom: '0.35rem', paddingLeft: '1rem', paddingRight: '1rem', cursor:'pointer',}}>
                                    <b>Follow</b>
                                </button>   
                            </form>                  
                        )}
                    </div>       
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

            <div className="mt-4">
                    {/*  */}
                    <div className="row g-0 mt-4" style={{alignItems: 'center'}} onClick={handleNavigateToFeed}>
                    <div className="col-2">
                    <FontAwesomeIcon icon={faHome} />                  
                    </div>
                    <div className="col-10">
                        <button style={{color: 'white', background: 'none', border: 'none'}}>
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
                            <button style={{color: 'white', background: 'none', border: 'none'}}>
                            <span className>Logout</span>
                            </button>
                        </div>                       
                    </div>
                </div> 
            </div> 
        </>
    )
}

export default PeopleProfileSide