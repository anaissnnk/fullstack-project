//IMPORT
import express from "express";
import cors from 'cors'
// import { config } from "dotenv";
// config();

app.use(cors());
app.use(express.json());

app.post('/create', function(req, res) {
    //CODE
})

// //LISTEN
// app.listen(PORT, () => {
//     console.log(`Listening on http://${HOST}:${PORT}`);
// })