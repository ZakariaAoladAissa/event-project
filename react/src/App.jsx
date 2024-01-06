import { useEffect, useState } from 'react'
import './style.css'
import MenuBar from './components/MenuBar'
import Cards from './components/Cards'
import ContextProvider from './context/context'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Register from './components/Register'
import SignIn from './components/SignIn'
import MyEvents from './components/MyEvents'
function App() {
  const [filterQuery, setFilterQuery] = useState("")
  const [toggle, setToggle] = useState(false)
  //localStorage.removeItem('token')
 const token = localStorage.getItem('token');
  
 return (
  <ContextProvider>
        {token && <>
          <MenuBar setFilterQuery={setFilterQuery}/>
          <Cards filterQuery={filterQuery}/>
          <MyEvents/>
        </>}
        {
          !token&& !toggle && <SignIn setToggle={setToggle}/>
        }
        {
          !token&& toggle && <Register setToggle={setToggle}/>
        }
  </ContextProvider>
);
}



export default App
