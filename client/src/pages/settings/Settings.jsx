import "./settings.css"
import Sidebar from "../../components/sidebar/Sidebar"

const Settings = () => {
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>

        <form action="" className="settingsForm">
          <label>Profile Picture: </label>
          <div className="settingsPP">

            <img src="https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-regular fa-circle-user"></i>  
            </label>
            <input type="file" id="fileInput" style={{display: "none"}} />

          </div>

          <label>Username: </label>
          <input type="text" placeholder="John Doe" />
          
          <label>Email: </label>
          <input type="email" placeholder="john@email.com" />

          <label>Password: </label>
          <input type="password" placeholder="Eg: Blog@1234"/>

          <button className="settingsSubmit">Update</button>


        </form>

      </div>
      <Sidebar />
    </div>
  )
}

export default Settings