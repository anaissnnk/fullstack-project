//FETCH DATA 
(async () => {
    const response = await fetch('http://localhost:8000/');
    const ideaList = await response.json();

    const ideaSection = document.querySelector('.idea-list');

    ideaList.forEach(idea => {
        const listItem = document.createElement('li');
        listItem.textContent = `${idea.id}: ${idea.title}: ${idea.description}`;
        ideaSection.appendChild(listItem);

        const deleteButton = document.createElement('button');
        deleteButton.id = idea.id
        deleteButton.type = "submit";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        ideaSection.appendChild(deleteButton);
    });
})();

// //DELETE DATA
// const deleteButton = document.getElementsByClassName("delete-button");
// const buttonsArray = Array.from(deleteButton);

// buttonsArray.forEach(button => {
//     button.addEventListener("click", async() => {
//         await pool.getConnection();
//         const removeIdea = await connect.query(
//             "DELETE FROM ideas WHERE id=?"
//         )
//     })
// })
