import express from "express";
const router = express.Router();

//CREATE PAGE
router.get("/landing", (req, res) => {
    res.send("This is the landing page");
})

export default router;