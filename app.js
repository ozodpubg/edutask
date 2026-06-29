// Sahifalarni almashtirish (Tab Switch)
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`${tabName}-tab`).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Tungi/Kunduzgi rejim (Dark/Light Mode)
function toggleTheme() {
    const app = document.getElementById('app');
    const themeBtn = document.getElementById('theme-btn');
    
    if (app.classList.contains('light-mode')) {
        app.classList.remove('light-mode');
        app.classList.add('dark-mode-vars');
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Kunduzgi rejim';
    } else {
        app.classList.remove('dark-mode-vars');
        app.classList.add('light-mode');
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i> Tungi rejim';
    }
}

// Vazifalar bilan ishlash
let tasksDone = 0;

function addTask() {
    const input = document.getElementById('task-input');
    const taskText = input.value.trim();
    
    if (taskText === "") return;
    
    const ul = document.getElementById('task-list');
    const li = document.createElement('li');
    
    li.innerHTML = `
        <div style="display:flex; gap:10px; align-items:center;">
            <input type="checkbox" onchange="toggleTask(this)">
            <span>${taskText}</span>
        </div>
        <button class="delete-btn" onclick="deleteTask(this)"><i class="fa-solid fa-trash"></i></button>
    `;
    
    ul.appendChild(li);
    input.value = "";
}

function toggleTask(checkbox) {
    const li = checkbox.parentElement.parentElement;
    if (checkbox.checked) {
        li.classList.add('completed');
        tasksDone++;
    } else {
        li.classList.remove('completed');
        tasksDone--;
    }
    document.getElementById('done-count').innerText = `${tasksDone} ta`;
}

function deleteTask(btn) {
    const li = btn.parentElement;
    if (li.classList.contains('completed')) {
        tasksDone--;
        document.getElementById('done-count').innerText = `${tasksDone} ta`;
    }
    li.remove();
}
// Sayt ochilganda xotiradagi ma'lumotlarni yuklash
document.addEventListener("DOMContentLoaded", () => {
    loadLessons();
    loadTasks();
});

// Sahifalarni almashtirish
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`${tabName}-tab`).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Dark/Light Mode
function toggleTheme() {
    const app = document.getElementById('app');
    const themeBtn = document.getElementById('theme-btn');
    if (app.classList.contains('light-mode')) {
        app.classList.remove('light-mode');
        app.classList.add('dark-mode-vars');
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Kunduzgi rejim';
    } else {
        app.classList.remove('dark-mode-vars');
        app.classList.add('light-mode');
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i> Tungi rejim';
    }
}

// ====== DINAMIK DARS JADVALI (LOCALSTORAGE BILAN) ======
function addLesson() {
    const time = document.getElementById('lesson-time').value;
    const name = document.getElementById('lesson-name').value.trim();
    const room = document.getElementById('lesson-room').value.trim();

    if (!time || !name || !room) {
        alert("Iltimos, darsning barcha maydonlarini to'ldiring!");
        return;
    }

    const lessons = JSON.parse(localStorage.getItem("lessons") || "[]");
    lessons.push({ time, name, room });
    localStorage.setItem("lessons", JSON.stringify(lessons));

    // Inputlarni tozalash
    document.getElementById('lesson-time').value = "";
    document.getElementById('lesson-name').value = "";
    document.getElementById('lesson-room').value = "";

    loadLessons();
}

function loadLessons() {
    const lessonList = document.getElementById('lesson-list');
    lessonList.innerHTML = "";
    const lessons = JSON.parse(localStorage.getItem("lessons") || "[]");
    
    // Vaqt bo'yicha saralash
    lessons.sort((a, b) => a.time.localeCompare(b.time));

    lessons.forEach((lesson, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <span style="color:#6366F1; font-weight:bold; margin-right:15px;">${lesson.time}</span>
                <strong>${lesson.name}</strong> <span style="color:gray; font-size:14px;">(${lesson.room}-xona)</span>
            </div>
            <button class="delete-btn" onclick="deleteLesson(${index})"><i class="fa-solid fa-trash"></i></button>
        `;
        lessonList.appendChild(li);
    });

    document.getElementById('lesson-count').innerText = `${lessons.length} ta`;
}

function deleteLesson(index) {
    const lessons = JSON.parse(localStorage.getItem("lessons") || "[]");
    lessons.splice(index, 1);
    localStorage.setItem("lessons", JSON.stringify(lessons));
    loadLessons();
}

// ====== VAZIFALAR QISMI (LOCALSTORAGE BILAN) ======
function addTask() {
    const input = document.getElementById('task-input');
    const taskText = input.value.trim();
    if (taskText === "") return;

    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    loadTasks();
}

function loadTasks() {
    const ul = document.getElementById('task-list');
    ul.innerHTML = "";
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    let done = 0;

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
            done++;
        }

        li.innerHTML = `
            <div style="display:flex; gap:10px; align-items:center;">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                <span>${task.text}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
        `;
        ul.appendChild(li);
    });

    document.getElementById('done-count').innerText = `${done} ta`;
}

function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}