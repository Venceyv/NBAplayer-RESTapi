const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
  res.send('User Home')
})

router.get('/ming', (req,res)=>{
    res.send('Ming')
})

module.exports = router