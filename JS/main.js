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
            tasks.push({ name, date, time, completed: false });
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

            tasksByDate[date].forEach((task, index) => {
                const taskCard = document.createElement('div');
                taskCard.className = 'card task-card';
                taskCard.innerHTML = `
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                    <h3 class="${task.completed ? 'completed' : ''}">${task.name}</h3>
                    <p>Time: ${task.time}</p>
                    <button class="delete-task">❌</button>
                `;
                dateCard.appendChild(taskCard);

                // Handle checkbox change
                const checkbox = taskCard.querySelector('.task-checkbox');
                checkbox.addEventListener('change', () => {
                    tasksByDate[date][index].completed = checkbox.checked;
                    renderTasks(); // Re-render tasks to reflect changes
                });

                // Handle delete button click
                const deleteButton = taskCard.querySelector('.delete-task');
                deleteButton.addEventListener('click', () => {
                    tasksByDate[date].splice(index, 1);
                    tasks = tasks.filter(task => task.date !== date || tasksByDate[date].includes(task));
                    renderTasks(); // Re-render tasks after deletion
                });
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

document.addEventListener('DOMContentLoaded', () => {
    const appName = "Task Manager";
    const appNameElement = document.getElementById('app-name');
    let index = 0;

    function typeEffect() {
        if (index < appName.length) {
            appNameElement.innerHTML += appName.charAt(index);
            index++;
            setTimeout(typeEffect, 100); // Adjust the speed here
        }
    }

    typeEffect();
});

