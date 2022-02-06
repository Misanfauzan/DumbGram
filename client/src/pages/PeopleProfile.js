import React, { useState } from "react"

import homeCSS from "../assets/css/Home.css"

import 'bootstrap'
import { Modal } from "react-bootstrap"

import Masonry from 'react-masonry-css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faCompass, faHeart, faHome, faPaperPlane, faPlusSquare, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { useNavigate, useParams, Link } from "react-router-dom"

import PeopleProfileSide from "./helper/PeopleProfileSide"
import Navbar from "./helper/Navbar"

import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

function PeopleProfile() {
  let id = useParams().id
  let userId = localStorage.id
  let api = API();

  const title = "People";
  document.title = "DumbGram | " + title;

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

  // Masrony
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };           

  let { data: feedsUser } = useQuery("feedsUserCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/feeds-user/" + id, config);
    return response.data;
  });   

  // Modal
  const [show, setShow] = useState({show: false});    
  const handleClose1 = () => setShow(false);
  let handleShow1 = (item) => setShow({
    ...item, 
    show: true
  });        
    
  // let idComment = document.getElementById("name").value                  
  let idComment = show.feedId
  let { data: feedsComment } = useQuery("feedsCommentCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/comment/" + show.feedId, config);  
    // setComment(response.data);
    return response.data
  });    

  const [form, setForm] = useState({
    comment: "",             
    feedIdComment: "",
    userIdComment: userId,         
  }); //Store product data

  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
        feedIdComment: idComment
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
      const response = await api.post("/comment" , config);

      navigate("/feed");
    } catch (error) {
      console.log(error);
    }
  });

  let { data: likeFeed } = useQuery("likeFeedCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/like/" + show.feedId, config);
    // console.log(response)
    let likeSatu = await response.data.filter((item) => {
        return item.userIdLike == userId  
    })
    // console.log(likeSatu)
    return likeSatu;
  });

  const [like, setLike] = useState(); //Store product data

  const handleChangeLike = (e) => {
    setLike({
      userIdLike: userId,        
    });
        
  };

  const handleSubmitLike = useMutation(async (e) => {
    try {    
      e.preventDefault();
      // Store data with FormData as object
      const body = JSON.stringify(like);       

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
      const response = await api.post("/like/" + show.feedId , config);

      navigate("/feed");
    } catch (error) {
      console.log(error);
    }
  });

  return (        
    <>           
      <div className="row m-0 vh-100">            
        {/* Left Content */}
        <div className="col-4 border-end">
            <PeopleProfileSide/>
        </div>
        {/* End Left Content */}
        {/* Right Content */}
        <div className="col-8">
          <div className="container">
            <Navbar/>
            <div className="row">              
              <div className="col">
                <div className="row mb-3">
                  <span style={{fontSize: '36px', fontWeight: 'bold'}}>
                    Feed
                  </span>
                </div>
                {/* Masonry */}
                <div className="row" >
                {feedsUser?.length !== 0 ? (
                <Masonry breakpointCols={breakpointColumnsObj}> 
                  {feedsUser?.map((item) => (                              
                    <div className="mb-3 pe-4" style={{ fontSize: '14px' }}>
                      <div onClick={() => handleShow1(item) } style={{ cursor:'pointer' }}>
                        <img src={item.imagePost}  class="img-fluid" alt="" />       
                      </div>
                      <div className="row mt-2 p-0 text-muted" style={{ alignItems: 'center' }}>
                        <div className="col">
                          <div className="d-flex justify-content-start" style={{ alignItems: 'center' }}>
                            <img src={item.image} className="rounded-circle" alt="" style={{ height: '1rem', width:'1rem' }} />
                            <Link to={`/people-profile/${item.id}`} className="ps-3" style={{ textDecoration: 'none', color: 'white' }}>
                              {item.username}
                            </Link>
                          </div>
                        </div>
                        <div className="col">
                          <div className="d-flex justify-content-end">
                            <FontAwesomeIcon icon={faHeart} className="me-3"/>
                            <FontAwesomeIcon icon={faComment} className="me-3" />
                            <FontAwesomeIcon icon={faPaperPlane} /> 
                          </div>
                        </div>
                      </div> 
                      <div className="row p-0 text-muted">
                        <div className="d-flex justify-content-end">
                          <span>{item.like} Like</span>
                        </div>
                      </div>                      
                    </div>                                      
                  ))}   
                </Masonry>
                ) : (                  
                <div className="mt-3">No Feed</div>                  
                )}
                </div>            
              </div>                                            
            </div> 
          </div>
        </div>                                  
      </div>  
      {/* Modal */}
      <Modal show={show.show} onHide={handleClose1} size="xl">          
        <Modal.Body className="bg-dark p-0">        
          <div className="row g-0">
            <div className="col-8 d-flex justify-content-center align-items-center">            
              <img className="img-fluid" src={show.imagePost} alt="" style={{width:'100%',height: '95vh', alignItems:'center', borderRadius: '15px'}} />
            </div>
            <div className="col-4 px-4">
              <div className="row d-flex justify-content-end" style={{height: '5vh', alignItems:'flex-end'}}>
                  <button type="button" className="btn-close btn-close-white" onClick={handleClose1} />
              </div>
              <div className="row">
                  <div className="container">
                    <div className="row" style={{alignItems: 'center'}}>
                        <div className="col-1">
                          <img src={show.image} className="rounded-circle" alt="" style={{ height: '1.5rem', width:'1.5rem' }} />
                        </div>
                        <div className="col-11 ps-4">
                          <span>{show.username}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1" />
                        <div className="col-11 ps-4"><span className="text-muted">{show.caption}</span></div>
                    </div>
                    <hr/>
                  </div>                    
                  <div className="overflow-auto" style={{height: '60vh'}}>
                    {feedsComment?.length !== 0 ? ( 
                    <ul className="p-0">                        
                      {feedsComment?.map((item) => (
                      <li style={{listStyle: 'none'}}>                        
                        <div>
                          <div className="row" style={{alignItems: 'center'}}>
                              <div className="col-1">
                                <img src={item.image} className="rounded-circle" alt="" style={{ height: '1.5rem', width:'1.5rem' }} />
                              </div>
                              <div className="col-11 ps-4"> 
                                <span>{item.username}</span>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-1" />
                              <div className="col-11 ps-4">
                                <span className="text-muted">
                                  {item.comment}                                  
                                </span>
                              </div>
                          </div>
                        </div>                          
                      </li>  
                      ))}                                                       
                    </ul>                                           
                    ) : (                  
                    <div className="mt-3 text-center">No Comment</div>                  
                    )}
                  </div>                      
                  <div style={{height: '10vh'}}>
                  <div className="row">
                    {likeFeed?.length !== 0 ? (
                      <div className="mt-2 mb-2 d-flex justify-content-end ">   
                        <button style={{ background: 'none',border: 'none',color: 'white' }}>
                          <FontAwesomeIcon icon={faHeart} className="me-3" style={{ color: 'red' }}/>                          
                        </button>               
                        <button style={{ background: 'none',border: 'none',color: 'white' }}>
                          <FontAwesomeIcon icon={faPaperPlane} />                        
                        </button>                                   
                      </div> 
                      ) : (
                        <div className="mt-2 mb-2 d-flex justify-content-end ">   
                          <form onSubmit={(e) => handleSubmitLike.mutate(e)}>                                                                                          
                            <button type="submit" style={{ background: 'none',border: 'none',color: 'white' }}>
                              <FontAwesomeIcon icon={faHeart} className="me-3"/>                          
                            </button>                
                          </form> 
                          <button style={{ background: 'none',border: 'none',color: 'white' }}>
                            <FontAwesomeIcon icon={faPaperPlane} />                        
                          </button>                                   
                        </div> 
                      )} 
                  </div>
                  <div className="row">
                    <div className="d-flex justify-content-end ">
                      <span>{show.like} Like</span>
                    </div>
                  </div>
                  </div>
                  <div style={{height: '5vh'}}>
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>                                          
                      <input 
                      type="text" 
                      className="form-control bg-dark" 
                      aria-label="Username" 
                      aria-describedby="basic-addon1" 
                      placeholder="Comment" 
                      style={{color: 'white'}} 
                      name="comment" 
                      onChange={handleChange}    
                      />                                     
                    </form>
                  </div>               
              </div>             
            </div>
          </div>
        </Modal.Body>          
      </Modal>    
    </>
  )
}

export default PeopleProfile;