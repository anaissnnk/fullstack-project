//MODULES
import mariadb from 'mariadb'
import { config } from "dotenv";
config();
import express from "express";
import cors from 'cors'

//VARIABLES
const app = express();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";

//MIDDLEWARES
app.use(cors());
app.use(express.json());

//POOL
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
})

//ROUTER
import generateRouter from './routes/routes.js';
const routes = ['create', 'delete', 'landing'];

routes.forEach(route => {
    const router = generateRouter(route);
    app.get(`/${route}`, router);
});

//SHOW TABLE DATA ON ROOT
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

//LISTEN
app.listen(PORT, () => {
    console.log(`Listening on http://${HOST}:${PORT}`);
})

