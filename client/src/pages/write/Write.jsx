import "./write.css"
import {useContext, useState} from 'react'
import axios from "axios"
import { Context } from "../../context/Context"

const Write = () => {

    const [title, setTitle] = useState("")
    const [cat, setCat] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const [dispCat, setDispCat] = useState([])

    const {user} = useContext(Context)


    const handleSubmit = async(e) => {
        e.preventDefault();
        const newPost = {
            username : user.username,
            title,
            cat,
            desc, 
        }


        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post('/upload', data)
            } catch (error) {
                console.log("Error uploading image")
            }
        }

        try {
            const res = await axios.post("/posts", newPost);
            window.location.replace('/post/'+res.data._id);

        } catch (err) {
            console.log("Error Submit the post...");
        }

        try {
            for(let c in dispCat){
                await axios.put('/categories', {
                    name : dispCat[c],
                    inc : 1,
                })
            }
        } catch (error) {
            console.log("Error updating Categories collection from Write page")
        }

    }

  return (
    <div className="write">

        {file && 
            <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        }

        <form action="" className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <i className="writeIcon fa-solid fa-plus"></i>
                </label>
                <input type="file" id="fileInput" style={{display: "none"}} onChange={e => setFile(e.target.files[0])}/>
                <input type="text" placeholder="What's the Title of your story?" onChange={e => setTitle(e.target.value)} className="writeInput" autoFocus={true}/>
            </div>
                
                <input type="text" placeholder="Give a suitable category for your blog (space seperated if their are multiple categories)" onChange={e => { setCat(e.target.value); setDispCat(e.target.value.split(' '))}} className="writeCat"/>

            <div className="writeFormGroup">
                <textarea placeholder="Write your story here..." type="text" className="writeText"  onChange={e => setDesc(e.target.value)}></textarea>
            </div>

            <button className="writeSubmit"type="submit">Publish</button>

        </form>
    </div>
  )
}

export default Write