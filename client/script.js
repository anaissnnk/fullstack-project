//FETCH DATA
(async () => {
    const response = await fetch('http://localhost:8000/');
    const data = await response.json()
    console.log(data);
})()