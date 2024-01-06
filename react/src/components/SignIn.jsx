import { useState } from 'react'
import './register.css'
import axios from 'axios'

function Register({setToggle}) {
  const [email,setEmail]=useState("")
  const [pwd,setPwd]=useState("")
  const [error,setError]=useState(null)


  const handeClick=async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.post("http://127.0.0.1:8000/api/login",{
      email:email,
      password:pwd
      })
      const token = response.data.token;
      localStorage.setItem('token', token);
      window.location.href = '/'
      console.log(token)
    }catch(e) {
      console.log(e)
      setError("Email or password incorrect")
    }
  }
  const changePage=()=>{
    setToggle(true)
  }
  return (
    <div className="register-contatiner">
        <form action="#" method="post">
            <h2>Sign In</h2>
            {error && <p style={{color:"red"}}>{error}</p>}
                <p>
                <input onChange={(e)=>setEmail(e.target.value)} placeholder='Email' id="email" name="email" type="text"/>
            </p>
            <p>
                <input onChange={(e)=>setPwd(e.target.value)} placeholder='Password' id="password" name="password" type="password"/>
            </p>
            
            <p>
                <input onClick={handeClick} type="submit" value="Sign In" id="submit"/>
            </p>
            <p>No account ?<a onClick={changePage} style={{cursor:"pointer"}}> Register</a></p>

        </form>
    </div>
  )
}

export default Register