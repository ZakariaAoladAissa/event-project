import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'

const eventsContext = createContext()

const ContextProvider = ({children})=>{
    const [events,setEvents] = useState({})
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await axios.get('http://127.0.0.1:8000/api/');
              setEvents(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
    },[])
    return(
        <eventsContext.Provider value={events}>
            {children}
        </eventsContext.Provider>
    )
}
export default ContextProvider

export const useEventContext =()=>{return useContext(eventsContext)}