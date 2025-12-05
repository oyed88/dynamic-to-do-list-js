// script.js
// Implements tasks + Local Storage persistence

document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const listEl = document.getElementById('task-list');
  const countEl = document.getElementById('task-count');
  const clearAllBtn = document.getElementById('clear-all');

  // Key used in localStorage
  const STORAGE_KEY = 'tasks';

  // In-memory tasks array
  let tasks = [];

  // Load tasks from localStorage
  function loadTasks() {
    const stored = localStorage.getItem(STORAGE_KEY);
    try {
      tasks = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(tasks)) tasks = [];
    } catch (e) {
      console.warn('Corrupt tasks in localStorage, resetting.', e);
      tasks = [];
      localStorage.removeItem(STORAGE_KEY);
    }
    renderTasks();
  }

  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  // Render the tasks list from the tasks array
  function renderTasks() {
    listEl.innerHTML = '';
    if (tasks.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'task-item';
      empty.innerHTML = `<span class="task-text" style="color:var(--muted)">No tasks — add one above.</span>`;
      listEl.appendChild(empty);
    } else {
      tasks.forEach((taskText, idx) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.index = String(idx);

        const left = document.createElement('div');
        left.className = 'task-left';

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = taskText;

        left.appendChild(span);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.type = 'button';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => removeTask(idx));

        li.appendChild(left);
        li.appendChild(removeBtn);
        listEl.appendChild(li);
      });
    }

    countEl.textContent = `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`;
  }

  // Add a task (text). If `save` true, update storage.
  function addTask(taskText, save = true) {
    const text = String(taskText || '').trim();
    if (!text) return false;

    tasks.push(text);
    if (save) saveTasks();
    renderTasks();
    return true;
  }

  // Remove task by index and update storage
  function removeTask(index) {
    if (index < 0 || index >= tasks.length) return;
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  // Clear all tasks (with confirmation)
  function clearAllTasks() {
    if (!tasks.length) return;
    const ok = confirm('Clear all tasks? This cannot be undone.');
    if (!ok) return;
    tasks = [];
    saveTasks();
    renderTasks();
  }

  // Form submit handler
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const success = addTask(input.value);
    if (success) {
      input.value = '';
      input.focus();
    } else {
      // small feedback for empty input
      input.classList.add('shake');
      setTimeout(() => input.classList.remove('shake'), 300);
    }
  });

  // support pressing Escape to clear the input
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') input.value = '';
  });

  clearAllBtn.addEventListener('click', clearAllTasks);

  // initialize
  loadTasks();
});
