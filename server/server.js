//IMPORT MARIADB
import mariadb from 'mariadb'
import * as dotenv from 'dotenv'
dotenv.config()

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit: 5
})