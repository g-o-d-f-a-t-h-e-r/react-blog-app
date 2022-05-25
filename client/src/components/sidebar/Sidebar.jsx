import axios from "axios";
import { useContext, useEffect, useState } from "react"
import "./sidebar.css"
import {Link} from 'react-router-dom'
import { Context } from "../../context/Context";


const Sidebar = () => {

    const [cats, setCats] = useState([]);

    const { user } = useContext(Context);


    const handleClicks = async(index) => {
        const cat = cats[index];

        try {
            await axios.put('/categories', {
                name : cat.name,
                inc : 1, 
            })
            
        } catch (error) {
           console.log("error updating clicks", error); 
        }
        
    }

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/categories")
            setCats(res.data);
        }
        getCats();
    }, [])


  return (
    <div className="sidebar">
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            {
                user?.profilePic ? 
                    <img className="sidebarImg" src={`http://localhost:5000/images/`+user.profilePic} alt="" /> 
                :
                    <img className="sidebarImg" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="" />
            }
            
            {
                user && <h2 style={{fontSize: '20px'}}>Welcome, <span style={{fontWeight: 800, color: 'tomato'}}>{user?.username} !</span></h2>  
            }
            
            {
                user?.desc && <p>{user.desc}</p> 
            }
        </div>

        <div className="sidebarItem">
            <span className="sidebarTitle">TOP CATEGORIES</span>
            <ul className="sidebarList">
                {   
                    cats.length !== 0 ?
                        cats.map((c, index) => (
                            <Link key={c._id} to={`/?cat=${c.name}`} className="linkOthers">
                                <li onClick={() => handleClicks(index)} className="sidebarListItem">{c.name}</li>
                            </Link>
                        ))
                    :
                        <p>No Categories!</p>

                }
            </ul>
        </div>

        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
                <i className="sidebarIcon fa-brands fa-facebook-square"></i>
                <i className="sidebarIcon fa-brands fa-twitter-square"></i>
                <i className="sidebarIcon fa-brands fa-pinterest-square"></i>
                <i className="sidebarIcon fa-brands fa-instagram-square"></i>
            </div>
        </div>
    </div>
  )
}

export default Sidebar