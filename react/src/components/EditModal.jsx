import React, { useState } from "react";
import "./modal.css";
import axios from "axios";

function EditModal({ event,setOpenModal,setNewEvent }) {
  const [title,setTitle] = useState(event.title)
  const [description,setDescription] = useState(event.description)
  const [image,setImage] = useState(null)

  const handleClick=async ()=>{
    console.log(title + description)
    try{
      const formData= new FormData();
      formData.append('title', title);
      formData.append('description',description);
      formData.append('image', image);
      formData.append('_method', 'PUT'); // Override method

      const response= await axios.post(`http://127.0.0.1:8000/api/${event.id}`, formData, {
          headers:{'Content-Type':"multipart/form-data"},
      } );
        console.log(response)
    }catch(e){
        console.log(e)
    }
    
    setOpenModal(false)
    setNewEvent((prevState)=> !prevState)
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
          <h1>Edit This Event </h1>
        </div>
        <div className="body">
            
              <p>Edit Event Title : </p><input onChange={(e)=>setTitle(e.target.value)} type="texte" value={title}/>  
                <p>Edit Event Description : </p><textarea onChange={(e)=>setDescription(e.target.value)} value={description}></textarea>
                <p>Change Event Image : </p><input onChange={handleFileChange} type="file"/>  
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
          <button onClick={handleClick}>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;