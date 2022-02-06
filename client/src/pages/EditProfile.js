import React, { useState } from "react"

import homeCSS from "../assets/css/Home.css"

import 'bootstrap'
import { Image } from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faHome, faPlusSquare, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { useNavigate, useParams } from "react-router-dom"

import MainSidebar from "./helper/MainSidebar"
import Navbar from "./helper/Navbar"

import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

function Edit() {
  let id = localStorage.id
  let api = API();

  // useNavigate declare
    const navigate = useNavigate()

  // Handler Navigate  
  const handleNavigateToHome = () => {
      navigate("/");
  }
  const handleNavigateToMessage = () => {
      navigate("/message");
  }

  const [preview, setPreview] = useState(null); //For image preview
  const [user, setUser] = useState({}); //Store product data
  const [form, setForm] = useState({
    image: "",
    fullName: "",
    username: "",
    bio: "",   
  }); //Store product data

  // Fetching detail product data by id from database
  let { userRefetch } = useQuery("userCache", async () => {
    const config = {
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/user/" + id, config);
    setForm({
      image: response.data.image,
      fullName: response.data.fullName,
      username: response.data.username,
      bio: response.data.bio,
    });
    setUser(response.data);
  });

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });    

    // Create image url for preview
    if (e.target.type === "file") {
      setPreview(e.target.files);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      const formData = new FormData();
      if (preview) {
        formData.set("image", preview[0], preview[0]?.name);
      }
      formData.set("fullName", form.fullName);
      formData.set("username", form.username);
      formData.set("bio", form.bio);

      // Configuration
      const config = {
        method: "PATCH",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
        body: formData,
      };

      // Insert product data
      const response = await api.patch("/user/" + id, config);
      console.log(response)

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
          <MainSidebar/>
        </div> 
        {/* End Left Content */}
        {/* Right Content */}
        <div className="col-8">
          <div className="container">
            <Navbar/>
            <div className="row">
                <div className="col">
                <div className="row mb-3">
                    <span style={{fontSize: '36px', fontWeight: 'bold'}}>Edit Profile</span>
                </div>   
                <div className="row mb-3">
                    {/* Form */}                                        
                    <form onSubmit={(e) => handleSubmit.mutate(e)} enctype="multipart/form-data">
                    {!preview ? (
                        <div>
                          <img
                            src={form.image}
                            style={{
                              maxWidth: "150px",
                              maxHeight: "150px",
                              objectFit: "cover",
                            }}
                            alt="no preview"
                          />
                        </div>
                      ) : (
                        <div>
                          <img
                            src={URL.createObjectURL(preview[0])}
                            style={{
                              maxWidth: "150px",
                              maxHeight: "150px",
                              objectFit: "cover",
                            }}
                            alt="preview"
                          />
                        </div>
                      )}
                      <div className="mb-3 mt-5">       
                          <label htmlFor="formFile" className="form-label text-center text-white" style={{background: 'linear-gradient(90deg, #4DD4F7 0%, #9090FB 36.46%, #FF6B81 71.35%, #FBDF63 100%)', borderRadius: '5px', border: 'none', color: 'white', textDecoration: 'none', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '1rem', paddingRight: '1rem', cursor: 'pointer'}}>                            
                          <span style={{color: 'white'}}>
                              <b>Upload Photos</b>
                          </span>                                          
                          </label>                 
                          <input 
                          onChange={handleChange} 
                          name="image" 
                          type="file" 
                          style={{display: 'none'}} 
                          id="formFile"                               
                          />
                      </div>
                      <div className="mb-3">
                          <input 
                          type="text" 
                          placeholder="Name" 
                          className="bg-dark form-control" 
                          style={{color: 'white'}} 
                          onChange={handleChange}
                          value={form.fullName}
                          name="fullName"
                          />
                      </div>
                      <div className="mb-3">
                          <input 
                          type="text" 
                          placeholder="Username" 
                          className="bg-dark form-control" 
                          style={{color: 'white'}} 
                          onChange={handleChange}
                          value={form.username}
                          name="username"
                          />
                      </div>
                      <div className="mb-3">                        
                          <textarea 
                          placeholder="Bio" 
                          className="form-control bg-dark" 
                          id="exampleFormControlTextarea1" 
                          rows={3} style={{ color: 'white'}} 
                          // defaultValue={''} 
                          onChange={handleChange}
                          defaultValue={form.bio}
                          name="bio"
                          />
                      </div>
                      <div className="mt-5 mb-3 d-flex justify-content-end align-items-end">
                          <button 
                          className="text-center" href="../Index Page/Index.html" 
                          style={{background: 'linear-gradient(90deg, #4DD4F7 0%, #9090FB 36.46%, #FF6B81 71.35%, #FBDF63 100%)', borderRadius: '5px', border: 'none', color: 'white', textDecoration: 'none', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '1rem', paddingRight: '1rem'}}
                          type="submit"
                          >              
                          <span style={{color: 'white', fontSize: '17px'}}>
                              <b>Save</b>
                          </span>              
                          </button> 
                      </div>
                    </form>                                       
                </div>                                                    
                </div>                              
            </div>
          </div>
        </div>                                  
      </div>      
    </>
  )
}

export default Edit;