const express = require("express")
const router = express.Router()

const Bed = require("../models/bed.model")

router.get("/", (_req, res) => {
  Bed.find()
    .select("code")
    .sort({ code: 1 })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json({ code: 500, message: "Error fetching all beds", err }))
})

router.post("/new", (req, res) => {
  const bed = { ...req.body }

  Bed.create(bed)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json({ code: 500, message: "Error saving bed", err }))
})

router.put("/:_id", (req, res) => {
  const { code, rateType } = req.body
  Bed.findByIdAndUpdate(req.params._id, { code, rateType }, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json({ code: 500, message: "Error editing bed", err }))
})

router.delete("/:_id", (req, res) => {
  Bed.findOneAndDelete({ _id: req.params._id })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json({ code: 500, message: "Error deleting bed", err }))
})

module.exports = router
