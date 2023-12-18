//BASILE'S CODE
(async () => {
    const response = await fetch('http://localhost:8000/show-all');
    const data = await response.json()
    console.log(data)
})()