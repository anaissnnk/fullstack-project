import express from "express";
const router = express.Router();

//CREATE PAGE
router.get("/create", (req, res) => {
    res.send("This is the creation page")
})

export default router;