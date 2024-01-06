import { useState } from 'react'
import './card.css'
import logo from '../assets/bg1.jpg'
import axios from 'axios'
import EditModal from './EditModal'

function Card({event,setNewEvent}) {
  const [showTools,setShowTools]=useState(false)
  const [openModal,setOpenModal] = useState(false)

  const deleteEvent=async()=>{
    try{
      const response = await axios.delete(`http://127.0.0.1:8000/api/${event.id}`)
      console.log(response)
      setNewEvent(prev=>!prev)
    }catch(e){
      console.log(e)
    }
  }
  const handleClick=()=>{
    console.log("clicked")
    setOpenModal(true)
  }
  const createDate=()=>{
    const date = new Date(event.created_at)
    return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
  }
  return (
    <div className='card'>
        <div className='bg-img'
          onMouseEnter={()=>setShowTools(true)} 
          onMouseLeave={()=>setShowTools(false)} 
          style={{backgroundImage:`url(${event.image ? `http://127.0.0.1:8000/storage/images/${event.image}` : 'https://c0.wallpaperflare.com/preview/325/781/108/events-venue-banquet-hall.jpg'})`}}>
        {/*<div className={showTools ? 'tools' : 'hideTools'}>
          <button onClick={handleClick}><i className="fa-solid fa-pen-to-square"></i></button>
          <button onClick={deleteEvent}><i className="fa-solid fa-x"></i></button>
        </div>*/}
        </div>
        
        <div className='card-text'>
              <div>
                <div className='card-title'>{event.title}</div>
                <div className='border'></div>
                  <div className='card-date'>{createDate()}</div> 
              </div>
              <div className='card-description'>{event.description}</div>
        </div>
        {openModal && <EditModal event={event} setOpenModal={setOpenModal} setNewEvent={setNewEvent}/>}

    </div>
  )
}

export default Card