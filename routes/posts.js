const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get("/", (req, res) => {
  res.send("Post")
})

router.post('/', (req,res)=>{
    let post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    post.save()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json({message: "error"})
    })
    // try{
    //     const savedPost = await post.save()
    //     res.json(savedPost)
    // }catch(err){
    //     res.json({message: err})
    // }

    // console.log(req.body);
})

module.exports = router