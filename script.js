document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click",addTask);
taskList.addEventListener("click",handleTaskActions);

function addTask(){
    const taskText = taskInput.value;
    if(taskText === ""){
        alert("Please enter a task!");
        return;
    }
    const task = createTaskElement(taskText);
    taskList.appendChild(task);
    storeTaskInLocalStorage(taskText);
    taskInput.value = "";
}

function handleTaskActions(event){
    if(event.target.classList.contains('delete-btn')){
        removeTask(event.target.parentElement.parentElement);
    }
    else if(event.target.classList.contains('edit-btn')){
        editTask(event.target.parentElement.parentElement);
    }
}

function createTaskElement(taskText){
    const li=document.createElement("li");
    li.className="task";
    li.innerHTML=`
    <span>${taskText}</span>
    <div class='task-btns'>
        <button class='edit-btn'>Edit</button>
        <button class='delete-btn'>Delete</button>
    </div>`;
    return li;
}

function removeTask(taskElement){
    const taskText=taskElement.firstElementChild.textContent;
    taskElement.remove();
    removeTaskFromLocalStorage(taskText);
}

function editTask(taskElement){
    const taskText=taskElement.firstElementChild.textContent;
    taskInput.value=taskText;
    taskElement.remove();
    removeTaskFromLocalStorage(taskText);
}

function storeTaskInLocalStorage(task){
    let tasks=getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function getTasksFromLocalStorage(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    return tasks;
}

function loadTasks(){
    let tasks=getTasksFromLocalStorage();
    tasks.forEach(function(task) {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
}

function removeTaskFromLocalStorage(taskText){
    let tasks=getTasksFromLocalStorage();
    tasks=tasks.filter(function(task){
        return task !== taskText;
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}