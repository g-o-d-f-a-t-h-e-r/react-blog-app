import "./write.css"

const Write = () => {
  return (
    <div className="write">

        <img className="writeImg" src="https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />

        <form action="" className="writeForm">
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <i className="writeIcon fa-solid fa-plus"></i>
                </label>
                <input type="file" id="fileInput" style={{display: "none"}}/>
                <input type="text" placeholder="What's the Title of your story?" className="writeInput" autoFocus={true}/>
            </div>

            <div className="writeFormGroup">
                <textarea placeholder="Write your story here..." type="text" className="writeInput writeText"></textarea>
            </div>

            <button className="writeSubmit">Publish</button>

        </form>
    </div>
  )
}

export default Write