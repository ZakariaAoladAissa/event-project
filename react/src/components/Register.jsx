import { useState } from 'react'
import './register.css'
import axios from 'axios'

function Register({setToggle}) {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [pwd,setPwd]=useState("")
  const [error,setError]=useState(null)

  const handleClick =async(e)=>{
    e.preventDefault()
    try{const response = await axios.post("http://127.0.0.1:8000/api/register",{
      name:name,
      email:email,
      password:pwd
    })
    setToggle(false)
    window.location.href = '/'
    console.log('account created')
    //console.log(response.data)
  }catch(e){
    console.log(e)
    setError(e.response.data.message)

  }
  }
  const changePage=()=>{
    setToggle(false)
  }
  return (
    <div className="register-contatiner">
        <form action="#" method="post">
        <h2>Register</h2>
        {error && <p style={{color:"red"}}>{error}</p>}

            <p>
                <input placeholder='Name' onChange={(e)=>setName(e.target.value)} id="name" name="name" type="text"/>
            </p>
            <p>
                <input placeholder='Email' onChange={(e)=>setEmail(e.target.value)} id="email" name="email" type="text"/>
            </p>
            <p>
                <input placeholder='Password' onChange={(e)=>setPwd(e.target.value)} id="password" name="password" type="password"/>
            </p>
            <p>
                <input onClick={handleClick} type="submit" value="Register" id="submit"/>
            </p>
            
            <p>Got an account ?<a onClick={changePage}  style={{cursor:"pointer"}}> Sign in</a></p>

        </form>
    </div>
  )
}

export default Register