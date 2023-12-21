//IMPORT
import mariadb from 'mariadb'

import { config } from "dotenv";
config();

import express from "express";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: false,
    limit: 10000,
    parameterLimit: 2,
}));

//VARIABLES
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";

//POOL
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
})

//CREATE ROUTES
import generateRouter from './routes/routes.js';
const routes = ['create', 'delete', 'landing'];

routes.forEach(route => {
    const router = generateRouter(route);
    app.get(`/${route}`, router);
});

//SHOW TABLE DATA ON ROOT LEVEL
app.get("/", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection()
        const data = await connection.query(
            "SELECT * FROM ideas;"
        )
        res.send(data)
    } catch (error) {
        throw error
    } finally {
        if (connection) connection.end()
    }
})

//ADD IDEA
app.post('/create', async (req, res) => {
    let connection;
    try {
        const { newIdeaTitle, newIdeaDescription } = req.body;
        if (!newIdeaTitle || newIdeaTitle.trim() === '' || !newIdeaDescription || newIdeaDescription.trim() === '') {
            return res.status(400).send("Title and Description are required.");
        }
        connection = await pool.getConnection();
        const insertNewIdea = await connection.query(
            "INSERT INTO ideas (title, description) VALUES (?, ?)",
            [newIdeaTitle, newIdeaDescription]
        );
        connection.release();
        res.redirect("http://127.0.0.1:5500/client/index.html")
    } catch (error) {
        throw error;
    }
});

// DELETE IDEA
app.delete("/delete/:id", async (req, res) => {
    const deleteID = req.params.id;
    console.log(`Received DELETE request for ID: ${deleteID}`);
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query("DELETE FROM ideas WHERE id=?", [deleteID]);
        res.status(200).send("Deleted!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting the item.");
    } finally {
        if (connection) connection.end();
    }
});


//LISTEN
app.listen(PORT, () => {
    console.log(`Listening on http://${HOST}:${PORT}`);
})

