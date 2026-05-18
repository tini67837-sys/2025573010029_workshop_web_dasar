const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const error = document.getElementById("error");
const clearCompleted = document.getElementById("clearCompleted");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(currentFilter === "active"){
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if(currentFilter === "completed"){
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.setAttribute("draggable", true);

        li.innerHTML = `
            <div class="task-info">

                <input type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${index})">

                <span ondblclick="editTask(${index})"
                class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>

                <span class="priority ${task.priority}">
                    ${task.priority}
                </span>

            </div>

            <button onclick="deleteTask(${index})">
                Hapus
            </button>
        `;

        addDragEvents(li,index);

        taskList.appendChild(li);

    });

    updateCounter();

    saveTasks();

}

function addTask(){

    const text = taskInput.value.trim();

    if(text === ""){
        error.textContent = "Tugas tidak boleh kosong";
        return;
    }

    if(text.length < 3){
        error.textContent = "Minimal 3 karakter";
        return;
    }

    if(text.length > 100){
        error.textContent = "Maksimal 100 karakter";
        return;
    }

    error.textContent = "";

    tasks.push({
        text:text,
        completed:false,
        priority:priority.value
    });

    taskInput.value = "";

    renderTasks();

}

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    renderTasks();

}

function deleteTask(index){

    tasks.splice(index,1);

    renderTasks();

}

function updateCounter(){

    const activeTasks =
    tasks.filter(task => !task.completed).length;

    counter.textContent =
    `${activeTasks} tugas tersisa`;

}

document.querySelectorAll(".filters button")
.forEach(button=>{

    button.addEventListener("click", ()=>{

        currentFilter =
        button.dataset.filter;

        renderTasks();

    });

});

clearCompleted.addEventListener("click", ()=>{

    tasks =
    tasks.filter(task => !task.completed);

    renderTasks();

});

function editTask(index){

    const li = taskList.children[index];

    const span = li.querySelector("span");

    const input = document.createElement("input");

    input.type = "text";

    input.value = tasks[index].text;

    input.className = "edit-input";

    span.replaceWith(input);

    input.focus();

    input.addEventListener("blur", saveEdit);

    input.addEventListener("keydown", (e)=>{

        if(e.key === "Enter"){
            saveEdit();
        }

    });

    function saveEdit(){

        const newText = input.value.trim();

        if(newText.length >= 3){

            tasks[index].text = newText;

            renderTasks();

        }

    }

}

let dragStartIndex;

function addDragEvents(li,index){

    li.addEventListener("dragstart", ()=>{

        dragStartIndex = index;

    });

    li.addEventListener("dragover",(e)=>{

        e.preventDefault();

    });

    li.addEventListener("drop", ()=>{

        const draggedItem =
        tasks[dragStartIndex];

        tasks.splice(dragStartIndex,1);

        tasks.splice(index,0,draggedItem);

        renderTasks();

    });

}

addBtn.addEventListener("click", addTask);

renderTasks();