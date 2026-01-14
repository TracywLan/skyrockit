console.log("test");

deleteForm.addEventListener('submit', (event)=>{
    event.preventDefault(); // Stopping the default submit
    console.log("stop submitting!");
    const promptContainer = document.createElement('div');
    const deleteButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    promptContainer.textContent = "Are you sure you want to delete this?";
    promptContainer.appendChild(deleteButton);
    promptContainer.appendChild(cancelButton);

    cancelButton.addEventListener('click',(evt)=>{
        promptContainer.innerHTML = ''
    })

    deleteButton.addEventListener('click', (evt)=>{
        fetch(event.target.action)
    })

    deleteForm.appendChild(promptContainer)
    
})
