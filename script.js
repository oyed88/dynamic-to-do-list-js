// Wait for the full HTML document to load before running JS
document.addEventListener("DOMContentLoaded", function () {

    // Select important elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and clean text

        // Check if empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create the remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // When clicked, remove the task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Add remove button to task
        li.appendChild(removeBtn);

        // Add task to the list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Add button click event
    addButton.addEventListener("click", addTask);

    // Add task when pressing Enter
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

});
