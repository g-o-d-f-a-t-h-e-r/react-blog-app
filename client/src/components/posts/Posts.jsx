import Post from "../post/Post"
import "./posts.css"

const Posts = ({posts}) => {
  return (
    <>
      <div className="postsSec">
        <h2 className="headingPost">Posts...</h2>

        {posts.length ?
          <div className="posts">
            {posts.map((p) => (
              <Post key={p._id} post={p} />
            ))}
          </div>
        :
          <p className="noPostMsg">No posts available...</p>
        }
      </div>
    </>
  )
}

export default Posts