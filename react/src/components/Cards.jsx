import { useContext, useEffect, useRef, useState } from 'react'
import './cards.css'
import Card from './Card'
import { useEventContext } from '../context/context'
import Modal from './Modal'
import axios from 'axios'
import EditModal from './EditModal'
import MyEvents from './MyEvents'

function Cards({filterQuery}) {
  const containerRef =useRef(null)
  const [allEvents,setAllEvents] = useState(useEventContext())
  const[events,setEvents] = useState(allEvents)
  const [openModal,setOpenModal] = useState(false)
  const [newEvent,setNewEvent] = useState(false)
  useEffect(()=>{
    const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/');
          setEvents(response.data);
          setAllEvents(response.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      //scrolling to show the new created item
      containerRef.current.scrollBy({
        left: -containerRef.current.scrollWidth, // Adjust this value according to your scroll width
        behavior: 'smooth',
      });
      fetchData();

      
},[newEvent])

useEffect(()=>{
  if(Array.isArray(events)){
      const filteredItems = allEvents.filter((event) =>
        event.title.toLowerCase().includes(filterQuery.toLowerCase())
      )
      setEvents(filteredItems)
  }
},[filterQuery])

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300, // Adjust this value according to your scroll width
        behavior: 'smooth',
      });
    }
  };
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300, // Adjust this value according to your scroll width
        behavior: 'smooth',
      });
    }
  };
  const handleClick=()=>{
    setOpenModal(true)
  }
  return (
    <div className='card-container'>
      <span>Latest Events..</span>
      <div className="scroll-buttons">
        <button onClick={handleClick}><i className="fa-solid fa-plus"></i></button>
        <button onClick={scrollLeft}><i className="fa-solid fa-chevron-left"></i></button>
        <button onClick={scrollRight}><i className="fa-solid fa-chevron-right"></i></button>
      </div>
      <div ref={containerRef} className='cards'>
        {Array.isArray(events) && events.map((event)=>
          <Card key={event.id} event={event} setNewEvent={setNewEvent} setOpenModal={setOpenModal}/>
         )}
      </div>
      {openModal && <Modal setOpenModal={setOpenModal} setNewEvent={setNewEvent}/>}
    </div>
  )
}

export default Cards