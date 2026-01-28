// Load tasks from localStorage on page load
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks on page load
window.addEventListener('load', renderTasks);

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Add to tasks array
    tasks.push(task);
    saveTasks();
    renderTasks();

    // Clear input
    input.value = "";
    input.focus();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    const emptyMessage = document.getElementById('emptyMessage');
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';

    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;
        taskText.onclick = () => toggleTask(task.id);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Allow adding task by pressing Enter
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && document.activeElement.id === 'taskInput') {
        addTask();
    }
});