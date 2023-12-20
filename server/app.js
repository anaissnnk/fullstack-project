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

        // res.send("New idea added successfully!");
        res.redirect("http://127.0.0.1:5500/client/landing.html")
    } catch (error) {
        throw error;
    }
});

// DELETE IDEA
app.delete("/delete/:id", (req, res) => {
    try {
        const deleteID = req.params.id;
        con.query(
            `DELETE FROM ideas WHERE id=?`, [deleteID],
            (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    res.send("Deleted!");
                }
            }
        );
    } catch (error) {
        throw error;
    }
});


// // Assuming you're using Express for the server setup
// app.delete("/delete/:id", async (req, res) => {
//     try {
//         const deleteID = req.params.id;
//         const connection = await pool.getConnection();
//         const result = await connection.query(
//             "DELETE FROM ideas WHERE id = ?",
//             [deleteID]
//         );
//         connection.release();

//         res.send("Deleted!");
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error deleting item.");
//     }
// });



//LISTEN
app.listen(PORT, () => {
    console.log(`Listening on http://${HOST}:${PORT}`);
})

