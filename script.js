document.addEventListener('DOMContentLoaded', function() {
    // Initialize tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        addTaskToDOM(taskText);
        saveTask(taskText);
        taskInput.value = '';
    }
}

function addTaskToDOM(taskText, completed = false) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    if (completed) {
        taskItem.classList.add('complete');
    }

    taskItem.innerHTML = `
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class="complete-btn" onclick="toggleComplete(this)">Complete</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    taskList.appendChild(taskItem);
}

function toggleComplete(button) {
    const taskItem = button.parentNode.parentNode;
    taskItem.classList.toggle('complete');
    updateTask(taskItem);
}

function deleteTask(button) {
    const taskItem = button.parentNode.parentNode;
    taskItem.remove();
    removeTask(taskItem);
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(taskItem) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const taskText = taskItem.querySelector('span').textContent;
    const task = tasks.find(task => task.text === taskText);
    task.completed = taskItem.classList.contains('complete');
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskItem) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const taskText = taskItem.querySelector('span').textContent;
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
