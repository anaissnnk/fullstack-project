//MODULES
import mariadb from 'mariadb'
import { config } from "dotenv";
config();
import express from "express";
import cors from 'cors'

//VARIABLES
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";
const app = express();

//USE MODULES
app.use(cors());
app.use(express.json());

//ROUTER
import generateRouter from './routes.js';
const routes = ['create', 'delete', 'landing'];

routes.forEach(route => {
    const router = generateRouter(route);
    app.use(`/${route}`, router);
});

//POOL
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
})

//ROOT
app.get("/", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const data = await connection.query(
            "SELECT * FROM ideas");
        res.json(data);
    } catch(err) {
        throw err;
    } finally {
        if (connection) connection.end();
    }
})

//ROUTES
app.use('/', createRouter);
app.use('/', deleteRouter);
app.use('/', landingRouter);

//LISTEN
app.listen(PORT, () => {
    console.log(`Listening on http://${HOST}:${PORT}`);
})

