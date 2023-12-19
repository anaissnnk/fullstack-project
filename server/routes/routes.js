import express from "express";

function generateRouter(routeName) {
    const router = express.Router();
    //switch to get if needed
    router.use(`/${routeName}`, (req, res) => {
        res.send(`This is the ${routeName} page`);
    });

    return router;
}

export default generateRouter;