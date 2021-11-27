require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())


// import routes
const postsRoute = require('./routes/posts')
const userRoute = require('./routes/user')

app.use('/posts', postsRoute)
app.use('/user', userRoute)


//routes
app.get('/',(req,res)=>{
    res.send('Home Page')
})



// connect to DB
mongoose.connect(
  "mongodb+srv://Venceyv:as84pvqyRQEoPEJn@restapi.0e5wm.mongodb.net/myFirstDatabase"
)
app.listen(3000, ()=>{
    console.log("Server Running");
})