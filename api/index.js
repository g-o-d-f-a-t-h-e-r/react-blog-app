const express = require("express");
const app = express();
const multer = require("multer");  
var cors = require('cors')
const path = require("path")

const dotenv = require("dotenv");
dotenv.config();

// ROUTES
const authRoute = require("./routes/auth"); 
const userRoute = require("./routes/users"); 
const postRoute = require("./routes/posts"); 
const categoryRoute = require("./routes/categories"); 



const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).then(console.log("Connection to the database is successfull")).catch((err)=> {
    console.log("error is : ", err);
});



const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
})


const upload = multer({storage:storage});

app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json("file has been uploaded");
})



// ENDPOINTS
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(5000, () =>{
    console.log("Backend server is running...")
});