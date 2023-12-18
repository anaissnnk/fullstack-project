//IMPORT
import mariadb from 'mariadb'
import { config } from "dotenv";config();
import express from "express";
import cors from 'cors'
config();


//VARIABLES
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";
const server = express();

//SERVER USE
server.use(cors());
server.use(express.json());

//POOL
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
})

//ROOT
server.get("/", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const data = await connection.query(
            "SELECT * FROM ideas");
        console.log(data);
        res.json(data);
    } catch(err) {
        throw err;
    } finally {
        if (connection) connection.end();
    }
})

//LISTEN
server.listen(PORT, () => {
    console.log(`Listening on http://${HOST}:${PORT}`);
})



