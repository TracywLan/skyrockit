const deleteForm = document.querySelector("#delete-form");

deleteForm && deleteForm.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent normal form submission
  
  // Create back Drop
  const promptContainer = document.createElement("div");
  promptContainer.setAttribute("id", "prompt-container");

  // Create pop out box 
  const box = document.createElement("div");
  box.style.cssText = "background: white; padding: 2rem; border-radius: 8px; text-align: center;";
  box.innerHTML = `
    <p style="margin: 0 0 1rem 0; font-size: 1.1em;">Are you sure you want to delete this item?</p>
    <div style="display: flex; gap: 1rem; justify-content: center;">
  `;
  
  // Make the button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.cssText = "padding: 0.5rem 1.5rem; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;";
  
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.style.cssText = "padding: 0.5rem 1.5rem; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;";
  
  box.append(deleteButton, cancelButton); // append to box
  promptContainer.appendChild(box); // append box to promptContainer
  
  // Cancel button clicked
  cancelButton.addEventListener("click", () => {
    promptContainer.remove(); // if cancel btn is click, the prompt container is not visible
  });
  
  // Delete button
  deleteButton.addEventListener("click", async () => {
    try {
      console.log("Delete fired");
      const response = await fetch(event.target.action, { method: "DELETE" }); // sends DELETE request to your form's action URL
      // event.target.action = the form's action URL (like /users/6967b9b2ae289d2e2e26130b)

      if (response.ok) { // only redirect if server said "success"
        // Go back to users list (safer than hardcoded splice)
        const urlParts = event.target.action.split("/");
        window.location.href = `/${urlParts[1]}`; // /users
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally { // ALWAYS remove popup (even if delete failed)
      promptContainer.remove();
    }
  });
  
  document.body.appendChild(promptContainer); // Show the popup
});
