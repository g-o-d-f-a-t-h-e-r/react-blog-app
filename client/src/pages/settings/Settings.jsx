import "./settings.css"
import Sidebar from "../../components/sidebar/Sidebar"
import { useContext, useState } from "react"
import { Context } from "../../context/Context"
import axios from "axios"


const Settings = () => {

  const { user, dispatch } = useContext(Context);

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [desc, setDesc] = useState(user.desc); 
  const [success, setSuccess] = useState(false); 


  

  const handleSubmit = async(e) =>{
    e.preventDefault();

    const updatedUser = {
      userId : user._id,
      username : username ? username : user.username,
      email : email ? email : user.email,
      desc : desc ? desc : user.desc,
    }

    if(password) updatedUser.password = password;

    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;

      try {
        await axios.post('/upload', data);
      } catch (error) {
        console.log("Error uploading profilePic", error);
      }

    }
 

    try {
      const res = await axios.put("/users/"+user._id, updatedUser);

      dispatch({type: "LOGIN_START"});

      dispatch({type: "LOGIN_SUCCESS", payload : res.data});
      window.location.reload();
      setSuccess(true);

    } catch (err) {
      console.log("Error updating the user", err);
    }


  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        
        <form action="" className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture: </label>
          <div className="settingsPP">

            {
              user.profilePic || file ? 
                <img src={file? URL.createObjectURL(file) :`http://localhost:5000/images/${user.profilePic}`} alt="" />
              :
                <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="" />
            }
            
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-regular fa-circle-user"></i>  
            </label>
            <input type="file" id="fileInput" style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])} />

          </div>

          <label>Username: </label>
          <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
          
          <label>Email: </label>
          <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password: </label>
          <input type="password" placeholder="Eg : Blog@1234" onChange={(e) => setPassword(e.target.value)} />
          
          <label>Description: </label>
          <textarea value={desc} placeholder="Say something about you..." onChange={(e) => setDesc(e.target.value)} />

          <button className="settingsSubmit" type="submit">Update
            {success && <img className="checkImg" src="https://ibin.co/6huFOSXYDBEM.png" alt="" /> }
            
          </button>
          
          

        </form>

      </div>
      <Sidebar />
    </div>
  )
}

export default Settings