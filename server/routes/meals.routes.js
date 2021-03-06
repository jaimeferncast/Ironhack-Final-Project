const express = require("express")
const router = express.Router()

const Meal = require("../models/meal.model")

// Date format is flexible, but should include 'z' at the end so JS doesn´t convert it to UTC, i.e '2021 apr 12z' or '2021-04-12z'
router.get("/filter", (req, res) => {
  Meal.find({ $and: [{ date: { $gt: req.query.startDate } }, { date: { $lte: req.query.endDate } }] })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json({ code: 500, message: "Se ha producido un error", err }))
})

router.post("/new", (req, res) => {
  const meal = { ...req.body }

  Meal.create(meal)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json({ code: 500, message: "No se ha podido crear la comida", err }))
})

router.put("/:_id", (req, res) => {
  Meal.findByIdAndUpdate(req.params._id, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json({ code: 500, message: "No se ha podido editar la comida", err }))
})

router.delete("/:_id", (req, res) => {
  Meal.findOneAndDelete({ _id: req.params._id })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json({ code: 500, message: "No se ha podido borrar la comida", err }))
})

module.exports = router
