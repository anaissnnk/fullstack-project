// //IMPORT MARIADB
// import mariadb from 'mariadb'
// import * as dotenv from 'dotenv'
// dotenv.config()

// const pool = mariadb.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     connectionLimit: 5
// })

// //USE POOL AND QUERIES
// (async () => {
//     let connection;
//     try {
//         connection = await pool.getConnection();
//         const data = await connection.query(`SELECT * FROM brilliant_minds.ideas`);
//         console.log(data)
//     } catch(err) {
//         throw err;
//     } finally {
//         if (connection) connection.end();
//     }
// })()

//IMPORT EXPRESS
import express from "express";
const PORT = process.env.PORT

//APP
const app = express();
app.use(express.json());

/*url encoded*/

app.listen(PORT, () => {
    console.log("Listening on http://localhost:8000");
})