import "./register.css"
import{Link} from "react-router-dom"
import { useContext, useState } from "react"
import axios from 'axios';
import { Context } from "../../context/Context";

const Register = () => {

  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ cnfPassword, setCnfPassword ] = useState("");
  const [ error, setError ] = useState(false);

  const {dispatch} = useContext(Context);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    dispatch({type: "LOGIN_START"});

    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      })
      console.log(res);
      dispatch({type: "LOGIN_SUCCESS", payload : res.data});


    } catch (error) {
      setError(true);
      dispatch({type: "LOGIN_FAILURE"});
    }

  }



  return (
    <div className="register">

        
        <span className="registerTitle">Register</span>

        

        <form action="" className="registerForm" onSubmit={handleSubmit}>

            {
              error && <span className="registerError">Something went wrong!</span>
            }

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