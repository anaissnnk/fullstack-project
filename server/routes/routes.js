import express from "express";

function generateRouter(routeName) {
    const router = express.Router();
    router.get(`/${routeName}`, (req, res) => {
        res.send(`This is the ${routeName} page`);
    });

    return router;
}

export default generateRouter;
