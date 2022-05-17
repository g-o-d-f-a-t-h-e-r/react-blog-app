import "./register.css"
import{Link} from "react-router-dom"
import { useState } from "react"
import axios from 'axios';

const Register = () => {

  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ cnfPassword, setCnfPassword ] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios("/auth/register", {
      username,
      email,
      password,
    })
    console.log(res);
  }



  return (
    <div className="register">

        <span className="registerTitle">Register</span>

        <form action="" className="registerForm" onSubmit={handleSubmit}>

            <label>Username: </label>
            <input type="text" placeholder="Enter Your Username..." required
              onChange={e=>{ setUsername(e.target.value);}}
            />
            
            <label>Email: </label>
            <input type="email" placeholder="Enter Your Email..." required
              onChange={e=>{ setEmail(e.target.value);}}
            />

            <label>Password: </label>
            
            <input id="password" type="password" placeholder="Enter Your Password..." required 
              onChange={e=>{ setPassword(e.target.value);}}
            />
            {(password !== cnfPassword) &&
                <p className="passwordMsg">Password and Confirm Password does not match!</p>
            }
            <input type="password" id="cnfPassword" placeholder="Confirm Your Password..." required 
              onChange={e=>{ setCnfPassword(e.target.value);}}
            />

            {
              (password === cnfPassword && cnfPassword !== "") ? <button className="registerButton" type="submit">Register</button>
            :
              <p className="disabledRegisterButton" >Register</p>
            }

            
            
        </form>

            <button className="registerLoginButton"><Link className="linkLogin" to="/login">Already registered? Click here!</Link></button>
    </div>
  )
}

export default Register