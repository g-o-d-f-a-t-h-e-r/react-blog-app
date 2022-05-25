import "./singlePost.css"
import { useLocation, Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { Context } from "../../context/Context"


const SinglePost = () => {

    const location = useLocation();
    const path = location.pathname.split("/")[2];
  
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [cat, setCat] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const [file, setFile] = useState(null);
    const [dispCat, setDispCat] = useState([]);


    const { user } = useContext(Context);
  
    useEffect(() => {
      const getPost = async () => {
        const res = await axios.get("/posts/" + path);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setCat(res.data.categories.join(' '));
        setDispCat(res.data.categories);
        window.scrollTo(0, 0);
        
      }
  
      getPost();
  
    }, [path])


    const handleCancel = () => {
      setUpdateMode(false);
    }


    const handleDelete = async() => {
        try {
          await axios.delete(`/posts/${path}`, {
            data:{username : user?.username}
          });
          window.location.replace('/')
        } catch (error) {
          console.log(error)
        }
    }

    const handleUpdate = async(e) => {
        e.preventDefault();

        if(!title) {
          alert("Title is required!");
          return;
        }

        if(!desc) {
          alert("Description is required!");
          return;
        }

        let photo = "";

        if(file){
          const data = new FormData();
          const filename = Date.now() + file.name;
          data.append("name",filename);
          data.append("file", file);
          photo = filename;

          try {
              await axios.post('/upload', data)
          } catch (error) {
              console.log("Error uploading image")
          }
        }


        try {
          await axios.put(`/posts/${post._id}`, {
            username : user?.username, 
            title, 
            desc,
            cat, 
            photo,
          });
          
        } catch (error) {
          console.log(error)
        }


        try {
          for(let c in dispCat){
            await axios.put('/categories', {
              name : dispCat[c],
              inc : 0,
            })
          }
          window.location.reload();
        } catch (error) {
          console.log("error updating the Categories collection ...", error);
        }

    }


    const handleClicks = async(index) => {
      const cat = dispCat[index];

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
    <div className="singlePost">
        
        <div className="singlePostWrapper">

            {
              updateMode ? (

                    <div>
                      <label className="box" htmlFor="fileInput">
                        {
                          file? 
                              <img className="updateImg" src={URL.createObjectURL(file)} alt="" />
                          : 
                              <>
                                <i className="writeIcon fa-solid fa-plus"></i>
                                <p>Click here to upload image...</p>
                                <span>(Existing image will be removed if not selected!)</span> 
                              </>
                            
                        }
                        
                      </label>
                      
                      <input type="file" id="fileInput" style={{display: "none"}} onChange={e => setFile(e.target.files[0])}/>
                    </div>

                    )
              :

                    post.photo? 
                      <img className="singlePostImg" src={`http://localhost:5000/images/${post.photo}`} alt="" />
                    :
                      <img src="https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="singlePostImg" />
                  
            }
            
            
            {
              updateMode ? <input type="text" placeholder="What's the Title of your stoty?" onChange={(e) => {setTitle(e.target.value)}} value={title} className="singlePostTitleInput" autoFocus required/> :

              <h1 className="singlePostTitle">{post.title}

                  {post.username === user?.username &&
                    <div className="singlePostEdit">
                        <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={(e) => setUpdateMode(true)}></i>
                        <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                    </div>
                  }

              </h1>
            }

                { 
                  updateMode ? ( 
                    <span className="singlePostEditCats">
                      <span>Categories:</span> 
                      <input placeholder="Write Categories (Space Seperated) 'Eg : life music travel'" className="catEdit" type="text" value={cat} onChange = {(e) => {setCat(e.target.value); setDispCat(e.target.value.split(' '))}} />
                    </span>
                    )
                    
                  :
                    dispCat.length !== 0 &&
                    <div className="singlePostCats"> Categories:
                      {
                          dispCat.map((c, index) => (
                            <Link to={`/?cat=${c}`} key={index} onClick={() => handleClicks(index)} className="cat linkOthers"> #{c} </Link>
                          ))
                      } 
                    </div>
                }
            
    
            <div className="singlePostInfo">
                <span className="singlePostAuthor">Author : 
                  <Link to={`/?user=${post.username}`} className="linkOthers">
                    <b className="linkOthers"> {post.username}</b>
                  </Link>
                </span>
                <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            
            {
              updateMode ? <textarea placeholder="Write your story here..." className="singlePostDescInput" value={desc} onChange={(e) => {setDesc(e.target.value)}} required /> :
              <p className="singlePostDesc">{post.desc}</p>
            }

            <div className="editButtons">
  
              {
                updateMode && <button className="editButton cancelButton" onClick={handleCancel}>Cancel</button>
              }
              {
                updateMode && <button className="editButton updateButton" onClick={handleUpdate}>Update</button> 
              }

            </div>
        </div>

    </div>
  )
}

export default SinglePost