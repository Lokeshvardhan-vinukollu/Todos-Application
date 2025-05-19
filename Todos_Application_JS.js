let todoItemsContainerEl = document.getElementById("todoItemsContainer");
let saveTodoButton = document.getElementById("saveTodoButton");
let addTodoBtn = document.getElementById("addTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

let todosCount = todoList.length;

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxEl = document.getElementById(checkboxId);
    console.log(checkboxEl.checked);
    let labelEl = document.getElementById(labelId);
    labelEl.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function onDeleteTodo(todoId) {
    let todoEl = document.getElementById(todoId);
    todoItemsContainerEl.removeChild(todoEl);
    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteElementIndex, 1);
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoEl = document.createElement("li");
    todoEl.classList.add("todo-item-container", "d-flex", "flex-row");
    todoEl.id = todoId;
    todoItemsContainerEl.appendChild(todoEl);

    let inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    inputEl.id = checkboxId;
    inputEl.checked = todo.isChecked;

    inputEl.classList.add("checkbox-input");
    inputEl.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    todoEl.appendChild(inputEl);

    let labelContainerEl = document.createElement("div");
    labelContainerEl.classList.add("label-container", "d-flex", "flex-row");
    todoEl.appendChild(labelContainerEl);

    let labelEl = document.createElement("label");
    labelEl.setAttribute("for", checkboxId);
    labelEl.id = labelId;
    labelEl.textContent = todo.text;
    labelEl.classList.add("checkbox-label");
    if (todo.isChecked === true) {
        labelEl.classList.add("checked");
    }
    labelContainerEl.appendChild(labelEl);


    let deleteContainerEl = document.createElement("div");
    deleteContainerEl.classList.add("delete-icon-container");
    labelContainerEl.appendChild(deleteContainerEl);
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteContainerEl.appendChild(deleteIcon);
}

for (let eachTodo of todoList) {
    createAndAppendTodo(eachTodo);
}

function onAddTodo() {
    let userInputEl = document.getElementById("todoUserInput");
    let userInputValue = userInputEl.value;
    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }
    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);

    createAndAppendTodo(newTodo);
    userInputEl.value = "";
}

addTodoBtn.onclick = function() {
    onAddTodo();
};