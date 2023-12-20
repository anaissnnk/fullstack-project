//FETCH DATA 
(async () => {
    const response = await fetch('http://localhost:8000/');
    const toDoList = await response.json();

    const toDoSection = document.querySelector('.to-do-list');

    toDoList.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.textContent = `${todo.id}: ${todo.title}: ${todo.description}`;
        toDoSection.appendChild(listItem);
    });
})();


