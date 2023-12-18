// //IMPORT MARIADB
import mariadb from 'mariadb'
import * as dotenv from 'dotenv'
import cors from 'cors'
import express from "express";
dotenv.config()

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit: 5
})

//IMPORT EXPRESS AND USE APP
const server = express();

server.use(cors());
server.use(express.json());
/*url encoded*/

server.listen(8000, () => {
    console.log("Listening on http://localhost:8000")
});

//SERVER ROUTE
server.get("/", (req, res) => {
    res.send({status:200, msg:"This is the root"})
})

//CONNECTION BETWEEN BACKEND AND FRONTEND
server.get("/show-all", async (req, res) => {
    (async () => {
        let connection;
        try {
            connection = await pool.getConnection();
            const data = await connection.query(`SELECT * FROM brilliant_minds.ideas`);
            console.log(data);
            res.json(data);
        } catch(err) {
            throw err;
        } finally {
            if (connection) connection.end();
        }
    })()
})

