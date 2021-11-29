require('dotenv').config()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const express = require('express')
const app = express()

// connect to DB
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', ()=>{console.log('Connected to Database')})

// middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())


const NBAplayerRoute = require('./routes/NBAplayers')
app.use('/NBAplayers', NBAplayerRoute)

app.get('/',(req,res)=>{
    res.send('NBA Players Home Page')
})

app.listen(3000, ()=>{console.log("Server Running")})




