import express from "express";
const router = express.Router();

//DELETE PAGE
router.get("/delete", (req, res) => {
    res.send("This is the delete page");
})

export default router;