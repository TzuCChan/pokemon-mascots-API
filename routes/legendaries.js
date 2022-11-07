const express = require('express')
const router = express.Router()
const Legendary = require('../models/legendary')

//Getting all
router.get('/', async (req, res) => {
  try {
    const legendaries = await Legendary.find()
    res.json(legendaries)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//Getting one
router.get('/:id', getLegendary, (req, res) => {
  res.json(res.legendary.name)
})

//Creating one
router.post('/', async (req, res) => {
  const legendary = new Legendary({
    name: req.body.name,
    legendaryType: req.body.legendaryType
  })
  try {
    const newLegendary = await legendary.save()
    res.status(201).json(newLegendary)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

//Updating one
router.patch('/:id', getLegendary, async (req, res) => {
  if (req.body.name != null) {
    res.legendary.name = req.body.name
  }
  if (req.body.legendaryType != null) {
    res.legendary.legendaryType = req.body.legendaryType
  }
  try {
    const updatedLegendary = await res.legendary.save()
    res.json(updatedLegendary)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

//Deleting one
router.delete('/:id', getLegendary, async (req, res) => {
  try {
    await res.legendary.remove()
    res.json({ message: 'Deleted Pokemon' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getLegendary(req, req, next) {
  let legendary
  try {
    legendary = await Legendary.findById(req.params.id)
    if (legendary == null) {
      return res.status(404).json({ message: 'Cannot find legendary' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.legendary = legendary
  next()
}

module.exports = router