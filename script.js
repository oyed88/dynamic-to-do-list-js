// Wait for the entire HTML document to load
document.addEventListener('DOMContentLoaded', function () {

    // Select important DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList  = document.getElementById('task-list');

    // Function to add a task
    function addTask() {

        // Get the text entered by the user
        const taskText = taskInput.value.trim();

        // Validate input
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        // Create list item <li>
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // When remove button is clicked → remove the task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Attach remove button to li
        li.appendChild(removeBtn);

        // Add li to <ul>
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Add task when button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Call addTask once (required by instructions)
    addTask();
});
