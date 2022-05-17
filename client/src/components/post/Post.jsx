import "./post.css"
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  return (
    <div className="post">
        {post.photo? 
          <img src="https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="postImg" />
        :
          <img src="https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="postImg" />
        }
        <div className="postInfo">
            <div className="postCats">
              {post.categories.map((c) => (
                
                <span key={c} className="postCat">{c}</span>

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