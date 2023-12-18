//BASILE'S CODE
(async () => {
    const response = await fetch('http://localhost:8000/show-all');
    const data = await response.json()
    console.log(data)
})()

// const options = {
//     method:'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         name: userName // variable with the value you want to send
//     })
// };

// (async () => {
//     const response = await fetch('http://localhost:8000/new-idea', options);
//     const data = await response.json()
//     console.log(data)
// })()

// //DEFINE ROUTE
// server.get("/new-idea", (req, res => {
//     console.log(data);
// }))

// //PORT LISTENING
// server.listen(5500, () => {
//     console.log("Listening on http://localhost:5500")
// });

// //DEFINING ROUTE
// server.get("/show-ideas", (req, res) => {
//     res.send({status:200, msg:"This is the root of FE"})
// })