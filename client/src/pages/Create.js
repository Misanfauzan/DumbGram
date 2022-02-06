import React, { useState } from "react"

import homeCSS from "../assets/css/Home.css"

import 'bootstrap'
import { Image } from "react-bootstrap"

import Masonry from 'react-masonry-css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faHome, faPlusSquare, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from "react-router-dom"

import MainSidebar from "./helper/MainSidebar"
import Navbar from "./helper/Navbar"

import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

function Create() {
    // useNavigate declare
    const navigate = useNavigate()

    let id = localStorage.id
    let api = API();

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

    const [preview, setPreview] = useState(null); //For image preview
    const [form, setForm] = useState({
      image: "",
      userIdFeed: id,
      caption: "",      
    }); //Store product data

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
      });
  
      // Create image url for preview
      if (e.target.type === "file") {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
      }
    };
  
    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();
  
        // Store data with FormData as object
        const formData = new FormData();
        formData.set("image", form?.image[0], form?.image[0]?.name);
        formData.set("userIdFeed", id);
        formData.set("caption", form.caption);        
  
        // Configuration
        const config = {
          method: "POST",
          headers: {
            Authorization: "Basic " + localStorage.token,
          },
          body: formData,
        };
  
        // Insert product data
        const response = await api.post("/feed", config);
  
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
                        <span style={{fontSize: '36px', fontWeight: 'bold'}}>Create Post</span>
                    </div>   
                <div className="row mb-3">
                    {/* Form */}
                    <form onSubmit={(e) => handleSubmit.mutate(e)} enctype="multipart/form-data">
                    {preview && (
                        <div>
                          <img
                            src={preview}
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
                                <b>Upload Photos or Video</b>
                            </span>                                          
                            </label>                 
                            <input className 
                            type="file" 
                            style={{display: 'none'}} 
                            id="formFile" 
                            name="image" 
                            onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">                        
                            <textarea 
                            className="form-control bg-dark" 
                            placeholder="Caption" 
                            id="exampleFormControlTextarea1" 
                            rows={3} 
                            style={{color: 'white'}} 
                            onChange={handleChange}
                            name="caption" />
                        </div>
                        <div className="mt-5 mb-3 d-flex justify-content-end align-items-end">
                            <button className="text-center" href="../Index Page/Index.html" style={{background: 'linear-gradient(90deg, #4DD4F7 0%, #9090FB 36.46%, #FF6B81 71.35%, #FBDF63 100%)', borderRadius: '5px', border: 'none', color: 'white', textDecoration: 'none', paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '1rem', paddingRight: '1rem'}}>              
                            <span style={{color: 'white', fontSize: '17px'}}>
                                <b>Upload</b>
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

export default Create;