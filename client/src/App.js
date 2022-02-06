import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./context/userContext";

import Home from "./pages/Home"
import Explore from "./pages/Explore"
import Landing from "./pages/Landing"
import Create from "./pages/Create"
import EditProfile from "./pages/EditProfile"
import PeopleProfile from "./pages/PeopleProfile"
import Message from "./pages/Message"
import MessageTrigger from "./pages/MessageTrigger"
import MessageTriggerPeople from "./pages/MessageTriggerPeople"

import { API } from "./config/api";

function App() { 
  let api = API();
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    // Redirect Auth
    if (!state.isLogin) {
      navigate("/landing")
    } else {      
      navigate("/")
    } 
  }, [state]);

  const checkUser = async () => {
    try {
      const config = {
        method: "get",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await api.get("/check-auth", config);

      // If the token incorrect
      if (response.status === "failed") {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // // Get user data
      let payload = response.data.user;
      // // Get token from local storage
      payload.token = localStorage.token;

      // // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);  

  return (
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/landing" element={<Landing/>} />
      <Route exact path="/explore" element={<Explore/>} />
      <Route exact path="/feed" element={<Home/>} />
      <Route exact path="/feed" element={<Home/>} />
      <Route exact path="/create" element={<Create/>} />
      <Route exact path="/edit-profile" element={<EditProfile/>} />
      <Route exact path="/message" element={<Message/>} />
      <Route exact path="/message-user/:id" element={<MessageTrigger/>} />
      <Route exact path="/messageTriggerPeople" element={<MessageTriggerPeople/>} />
      <Route exact path="/people-profile/:id" element={<PeopleProfile/>} />
    </Routes>
  );
}

export default App;
