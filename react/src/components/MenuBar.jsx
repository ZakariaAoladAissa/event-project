import { useState } from 'react'
import '../style.css'
import axios from 'axios'

function MenuBar({setFilterQuery}) {
  const handleChange=(e)=>{
    setFilterQuery(e.target.value)
  }
  const handleClick =async()=>{
    const token = localStorage.getItem('token');
    console.log(token)
    try{
      const response = await axios.post('http://127.0.0.1:8000/api/logout', null, {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    });
      if(response) localStorage.removeItem('token');
      window.location.href = '/'
      console.log("logged out")
    }catch(e) {console.log(e)}
  }
  return (
    <>
      <div className="container">
        <div className='top-bar'>
          <div className='logo'></div>
          <div className='user-info'>
            {/*<div className='user-name'>Zakaria |</div>*/ }         
            <button onClick={handleClick} className="logout-btn">Logout</button>
        </div>
        </div>
        <div className="menu-text">
          <span>Decide. Plan. </span><br/>
          <span>Post Your Event.</span>
        </div>
        <div className='search-bar'>
          <input onChange={(e)=>handleChange(e)} type="text" placeholder='Search...'/>
          <div className='search-icon'><i className="fa-solid fa-magnifying-glass"></i></div>
        </div>
      </div>
    </>
  )
}

export default MenuBar
