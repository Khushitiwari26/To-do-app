const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const editModal = document.getElementById("editModal");
const editTaskInput = document.getElementById("editTaskInput");
const saveEditBtn = document.getElementById("saveEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let currentTaskEl = null;

addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskActions);
saveEditBtn.addEventListener("click", saveEditedTask);
cancelEditBtn.addEventListener("click", closeModal);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    const task = createTaskElement(taskText);
    taskList.appendChild(task);
    taskInput.value = "";
}

function handleTaskActions(event) {
    const target = event.target;
    const taskEl = target.closest(".task");

    if (target.classList.contains("delete-btn")) {
        const taskText = taskEl.querySelector("span").textContent;
        if (confirm(`Are you sure you want to delete the task: "${taskText}"?`)) {
            taskEl.remove();
        }
    }

    if (target.classList.contains("edit-btn")) {
        currentTaskEl = taskEl.querySelector("span");
        editTaskInput.value = currentTaskEl.textContent;
        openModal();
    }
}

function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.className = "task";
    li.innerHTML = `
        <span>${taskText}</span>
        <div class='task-btns'>
            <button class='edit-btn'>Edit</button>
            <button class='delete-btn'>Delete</button>
        </div>`;
    return li;
}

function openModal() {
    editModal.style.display = "flex";
}

function closeModal() {
    editModal.style.display = "none";
    currentTaskEl = null;
}

function saveEditedTask() {
    const newText = editTaskInput.value.trim();
    if (newText && currentTaskEl) {
        currentTaskEl.textContent = newText;
    }
    closeModal();
}
