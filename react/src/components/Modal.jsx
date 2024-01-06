import React, { useState } from "react";
import "./modal.css";
import axios from "axios";

function Modal({ setOpenModal,setNewEvent }) {
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [image,setImage] = useState(null)
  const [error,setError] = useState(false)

  const handleClick=async ()=>{
    console.log(title + description)
   
    try{
      const formData= new FormData();
        formData.append('title', title);
        formData.append('description',description);
        formData.append('image', image);
        const token = localStorage.getItem('token');
        const response= await axios.post("http://127.0.0.1:8000/api/", formData, {
            headers:{
              'Content-Type':"multipart/form-data",
              'Authorization': `Bearer ${token}`
            },
        } );
        console.log(response)
      /*await axios.post("http://127.0.0.1:8000/api/",{
      title:title,
      description:description,
      image:formData
    })*/
      setOpenModal(false)
      setNewEvent((prevState)=> !prevState)
   }catch(e){
      console.log(e)
      setError(true)
    }
    
  }
  const handleFileChange=(e)=>{
    setImage(e.target.files[0])
  }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Create A New Event </h1>
        </div>
        <div className="content">
          {error && <div className="error-msg">Missing Field ! </div>}
          <div className="body">
                <p>Event Title : </p><input onChange={(e)=>setTitle(e.target.value)} type="texte"/>  
                <p>Event Description : </p><textarea onChange={(e)=>setDescription(e.target.value)}></textarea>
                <p >Event Image : </p><div className="upload"><input onChange={handleFileChange} type="file"/>  </div>
          </div>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={handleClick}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;