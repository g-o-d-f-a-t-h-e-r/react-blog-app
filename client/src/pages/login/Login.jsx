import "./login.css";
import{Link} from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext, useRef } from "react";
import axios from "axios";

const Login = () => {

  const userRef = useRef();
  const passwordRef = useRef();

  const {dispatch, isFetching} = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});

    try {
      const res = await axios.post("/auth/login", {
        username : userRef.current.value,
        password : passwordRef.current.value,
      })

      dispatch({type: "LOGIN_SUCCESS", payload : res.data});

    } catch (error) {
      dispatch({type: "LOGIN_FAILURE"});
    }
  }


  return (
    <div className="login">

        <span className="loginTitle">Login</span>

        <form action="" className="loginForm" onSubmit={handleSubmit}>

            <label>Username: </label>
            <input type="text" placeholder="Enter Your Username..." 
              ref={userRef}
            />

            <label>Password: </label>
            <input type="password" placeholder="Enter Your Password..." 
              ref={passwordRef}
            />

            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            
        </form>

            <button className="loginRegisterButton"><Link className="linkRegister" to="/register">Not registered yet?</Link></button>
    </div>
  )
}

export default Login