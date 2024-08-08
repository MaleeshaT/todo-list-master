document.addEventListener('DOMContentLoaded', () => {
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
        } else {
            alert('Please fill out all fields.');
        }
    });

    // Render Tasks
    function renderTasks() {
        taskContainer.innerHTML = ''; // Clear existing tasks

        // Create a dictionary of tasks categorized by date
        const tasksByDate = tasks.reduce((acc, task) => {
            if (!acc[task.date]) {
                acc[task.date] = [];
            }
            acc[task.date].push(task);
            return acc;
        }, {});

        // Get the dates in ascending order
        const sortedDates = Object.keys(tasksByDate).sort((a, b) => new Date(a) - new Date(b));

        // Display tasks in cards
        sortedDates.forEach(date => {
            const dateCard = document.createElement('div');
            dateCard.className = 'card date-card';
            dateCard.innerHTML = `<h2>${new Date(date).toDateString()}</h2>`;
            taskContainer.appendChild(dateCard);

            tasksByDate[date].forEach(task => {
                const taskCard = document.createElement('div');
                taskCard.className = 'card task-card';
                taskCard.innerHTML = `
                    <h3>${task.name}</h3>
                    <p>Time: ${task.time}</p>
                `;
                dateCard.appendChild(taskCard);
            });
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
