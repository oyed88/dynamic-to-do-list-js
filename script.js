// script.js
// All code runs after DOMContentLoaded per assignment requirements
document.addEventListener('DOMContentLoaded', () => {
  // Required DOM selections (names required by checks)
  const addButton = document.getElementById('add-button');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Extra elements
  const clearAllBtn = document.getElementById('clear-all');
  const taskCount = document.getElementById('task-count');

  const STORAGE_KEY = 'tasks';
  let tasks = [];

  // Load tasks from localStorage and render
  function loadTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      tasks = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(tasks)) tasks = [];
    } catch (e) {
      console.warn('Invalid tasks in localStorage, resetting.', e);
      tasks = [];
      localStorage.removeItem(STORAGE_KEY);
    }
    renderTasks();
  }

  // Save current tasks array to localStorage
  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  // Render tasks array into the DOM
  function renderTasks() {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'task-item';
      empty.innerHTML = `<span class="task-text" style="color:var(--muted)">No tasks — add one above.</span>`;
      taskList.appendChild(empty);
    } else {
      tasks.forEach((t, i) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.index = String(i);

        const left = document.createElement('div');
        left.className = 'task-left';
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = t;
        left.appendChild(span);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.type = 'button';
        removeBtn.textContent = 'Remove';
        // when clicked, remove this task
        removeBtn.onclick = () => removeTask(i);

        li.appendChild(left);
        li.appendChild(removeBtn);
        taskList.appendChild(li);
      });
    }
    taskCount.textContent = `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`;
  }

  // addTask per assignment: reads taskInput, stores in taskText var, alerts if empty
  function addTask() {
    const taskText = String(taskInput.value || '').trim();
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    tasks.push(taskText);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskInput.focus();
  }

  // removeTask by index, update storage and UI
  function removeTask(index) {
    if (index < 0 || index >= tasks.length) return;
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  // Clear all tasks with confirmation
  function clearAllTasks() {
    if (!tasks.length) return;
    if (confirm('Clear all tasks? This cannot be undone.')) {
      tasks = [];
      saveTasks();
      renderTasks();
    }
  }

  // Attach event listeners required by the checks
  addButton.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // prevent form submission if any
      addTask();
    }
  });

  clearAllBtn.addEventListener('click', clearAllTasks);

  // initialize
  loadTasks();
});
