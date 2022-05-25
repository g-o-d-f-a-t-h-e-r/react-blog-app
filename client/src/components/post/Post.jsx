import "./post.css"
import { Link } from 'react-router-dom'
import axios from "axios"

const Post = ({post}) => {

  const handleClicks = async(index) => {
    const cat = post.categories[index];

    try {
        await axios.put('/categories', {
            name : cat,
            inc : 1, 
        })
        
    } catch (error) {
       console.log("error updating clicks", error); 
    }
    
}


  return (
    <div className="post">
        {post.photo? 
          <img src={`http://localhost:5000/images/${post.photo}`} alt="" className="postImg" />
        :
          <img src="https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="postImg" />
        }
        <div className="postInfo">
            <div className="postCats">
              {post.categories.map((c, index) => (
                
                <Link to={`/?cat=${c}`} key={index} onClick={() => handleClicks(index)} className="postCat">{c}</Link>

              ))}
            </div>
            
            <Link className="linkOthers" to={`/post/${post._id}`}>
              <div className="postTitle">{post.title}</div>
            </Link>
            <hr />
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>

        </div>
        <p className="postDesc">{post.desc}</p>
        </div>
  )
}

export default Post