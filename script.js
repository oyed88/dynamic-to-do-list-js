// Wait for the HTML document to be fully loaded before running any code
document.addEventListener("DOMContentLoaded", function () {

    // Select DOM elements by ID and store them in constants with the required names
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Define addTask function (responsible for creating and inserting tasks)
    function addTask() {
        // Retrieve and trim input value
        const taskText = taskInput.value.trim();

        // If the trimmed input is empty, alert the user and do not add a task
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item and set its text content
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create the remove button and set its text and class
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // When the remove button is clicked, remove this li from the list
        removeBtn.onclick = function () {
            // More robust: remove the li element directly
            li.remove();
        };

        // Append the remove button to the li, then append the li to the task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input so user can add a new task easily
        taskInput.value = "";
    }

    // Attach event listener to the Add Task button
    addButton.addEventListener("click", addTask);

    // Allow adding tasks by pressing Enter while focused in the input
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // (Optional) If you want to pre-populate or run any start-up logic, do it here.
    // The checklist mentioned invoking code on DOMContentLoaded; we are already inside that
    // event handler so listeners are attached and the page is ready for interaction.
});
s