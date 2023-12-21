(async () => {
    const response = await fetch('http://localhost:8000/');
    const ideaList = await response.json();

    const ideaSection = document.querySelector('.idea-section');

    ideaList.forEach(idea => {
        // listItem.textContent = `${idea.id}: ${idea.title}: ${idea.description}`;
        const ideaCard = document.createElement('section');
        ideaCard.className = ("idea-card");
        ideaSection.appendChild(ideaCard);

        const ideaNameAndID = document.createElement('h2');
        ideaNameAndID.textContent = `${idea.id}: ${idea.title}`
        ideaCard.appendChild(ideaNameAndID);

        const ideaDescription = document.createElement('span');
        ideaDescription.textContent = `${idea.description}`;
        ideaCard.appendChild(ideaDescription);

        const deleteButton = document.createElement('button');
        deleteButton.id = idea.id
        deleteButton.type = "submit";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        ideaSection.appendChild(deleteButton);

        const deleteButtons = document.getElementsByClassName("delete-button");
        const buttonsArray = Array.from(deleteButtons);
        
        buttonsArray.forEach(button => {
            button.addEventListener("click", async (req, res) => {
                try {
                    const id = button.id;
                    const response = await fetch(`http://localhost:8000/delete/${id}`, {
                        method: "DELETE",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                          },
                        body: JSON.stringify({ id: id })
                    });
                    if (response.ok) {
                        console.log('Item deleted successfully!');
                        location.reload();
                    } else {
                        console.error('Failed to delete item.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            });
        });
    });
})();