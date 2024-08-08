document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskNameInput = document.getElementById('task-name');
    const taskDateInput = document.getElementById('task-date');
    const taskTimeInput = document.getElementById('task-time');
    const addTaskButton = document.getElementById('add-task');
    const taskContainer = document.getElementById('task-container');
    const lightThemeButton = document.getElementById('light-theme');
    const darkThemeButton = document.getElementById('dark-theme');

    let tasks = []; // Array to store tasks

    // Add Task
    addTaskButton.addEventListener('click', () => {
        const name = taskNameInput.value;
        const date = taskDateInput.value;
        const time = taskTimeInput.value;
        
        if (name && date && time) {
            tasks.push({ name, date, time });
            renderTasks();
        }
    });

    // Render Tasks
    function renderTasks() {
        taskContainer.innerHTML = ''; // Clear existing tasks

        // Sort tasks by date
        tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Display tasks in cards
        tasks.forEach(task => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${task.name}</h3>
                <p>Date: ${task.date}</p>
                <p>Time: ${task.time}</p>
            `;
            taskContainer.appendChild(card);
        });
    }

    // Theme Switching
    lightThemeButton.addEventListener('click', () => {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    });

    darkThemeButton.addEventListener('click', () => {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    });
});
