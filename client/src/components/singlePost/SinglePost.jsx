import "./singlePost.css"
import { useLocation, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios";


const SinglePost = () => {

    const location = useLocation();
    const path = location.pathname.split("/")[2];
  
    const [post, setPost] = useState({});
  
  
    useEffect(() => {
      const getPost = async () => {
        const res = await axios.get("/posts/" + path);
        setPost(res.data);
  
      }
  
      getPost();
  
    }, [path])




  return (
    <div className="singlePost">
        
        <div className="singlePostWrapper">
            {post.photo? 
                <img className="singlePostImg" src="https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            :
                <img src="https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="singlePostImg" />
            }
            
            <h1 className="singlePostTitle">{post.title}
            
                <div className="singlePostEdit">
                    <i className="singlePostIcon fa-solid fa-pen-to-square"></i>
                    <i className="singlePostIcon fa-solid fa-trash-can"></i>
                </div>

            </h1>
    
            <div className="singlePostInfo">
                <span className="singlePostAuthor">Author : 
                  <Link to={`/?user=${post.username}`} className="linkOthers">
                    <b className="linkOthers">{post.username}</b>
                  </Link>
                </span>
                <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
            </div>

            <p className="singlePostDesc">{post.desc}</p>
        </div>

    </div>
  )
}

export default SinglePost