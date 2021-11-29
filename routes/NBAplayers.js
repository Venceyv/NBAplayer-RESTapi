const express = require("express")
const router = express.Router()
const NBAplayer = require("../models/NBAplayers")

// MIDDLEWARE
const getPlayer = async (req, res, next) => {
  let player
  try {
    player = await NBAplayer.findById(req.params.id)
    if (player == null) {
      return res.status(404).json({ message: "Cannot find player" }) // cannot find err 404
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.player = player
  next()
}

// GET ALL
router.get("/", async (req, res) => {
  try {
    const players = await NBAplayer.find()
    res.json(players)
  } catch (err) {
    res.status(500).json({ message: err.message }) //server err 500
  }
})

// GET SPECIFIC
router.get("/:name", async (req, res) => {
  let player
  try {
    player = await NBAplayer.findOne({ name: req.params.name })
    if (player == null) {
      return res.status(404).json({ message: "Cannot find player" }) // cannot find err 404
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.json(player)
})

// GET BY TEAM
router.get("/team/:team", async (req, res) => {
  let players
  try {
    players = await NBAplayer.find({ team: req.params.team })
    if (players == null) {
      return res.status(404).json({ message: "Cannot find players" }) // cannot find err 404
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.json(players)
})

// GET ONE
router.get("/:id", getPlayer, async (req, res) => {
  res.json(res.player)
})

// POST
router.post("/", async (req, res) => {
  let player = new NBAplayer({
    name: req.body.name,
    team: req.body.team,
    age: req.body.age,
    number: req.body.number,
    injury: req.body.injury,
    championship: req.body.championship,
  })

  try {
    const newPlayer = await player.save()
    res.status(201).json(newPlayer) //success post 201
  } catch (err) {
    res.status(400).json({ message: err.message }) //user err 400
  }
})

// PATCH
router.patch("/:id"),
  getPlayer,
  async (req, res) => {
    if (req.body.name != null) {
      res.player.name = req.body.name
    }
    if (req.body.team != null) {
      res.player.team = req.body.team
    }
    if (req.body.number != null) {
      res.player.number = req.body.number
    }
    if (req.body.age != null) {
      res.player.age = req.body.age
    }
    if (req.body.injury != null) {
      res.player.injury = req.body.injury
    }
    if (req.body.championship != null) {
      res.player.championship = req.body.championship
    }

    try {
      const playerUpdate = await res.player.save()
      res.json(playerUpdate)
    } catch (err) {
      res.status(400).json({ message: err.message }) //user err 400
    }
  }

// DELETE ONE
router.delete("/:id", getPlayer, async (req, res) => {
  try {
    await res.player.remove()
    res.json({ message: "Player deleted" })
  } catch (err) {
    res.status(500).json({ message: err }) //server err 500
  }
})

module.exports = router
