window.onload = function () {
    const savedTodoList = JSON.parse(localStorage.getItem('todolist'));
    if (savedTodoList) { // savedTodoList(로컬 데이터)가 존재하면 실행
        for (let i = 0; i < savedTodoList.length; i++) {
            console.log(savedTodoList[i]);
            addTodoList(savedTodoList[i]) // 전달인자로 전달
        }
    }

    const todoInput = document.querySelector("#todoInput");
    const addBtn = document.querySelector("#addBtn");
    addBtn.addEventListener("click", function () {
        if (todoInput.value != "") addTodoList();
    });

    const searchInput = document.querySelector("#searchInput");
    const searchBtn = document.querySelector("#searchBtn");
    searchBtn.addEventListener("click", function () {
        searchTodoList(searchInput.value);
    });
    
    searchInput.addEventListener("keydown", function (event) {
        if (event.key == "Enter") {
            searchTodoList(searchInput.value);
        }
    });
}

window.onkeydown = function (event) {
    const todoInput = document.querySelector("#todoInput");
    if (event.key == "Enter") {
        if (todoInput.value != "") addTodoList();
    }
}

function saveItems() { // 로컬에 데이터 저장하기
    const saveItems = []; // 빈 배열 할당
    const listArea = document.querySelector(".listArea");
    for (let node of listArea.children) {
        const textNode = node.querySelector('span');
        const todoObj = {
            todo: textNode.textContent,
            check: textNode.classList.contains('check')
        };
        saveItems.push(todoObj);
    }
    console.log(JSON.stringify(saveItems));

    localStorage.setItem('todolist', JSON.stringify(saveItems));
}

function addTodoList(savedTodo) {
    const listArea = document.querySelector(".listArea");

    const liNode = document.createElement("li");
    const checkBtn = document.createElement("button");
    const todoText = document.createElement("span");
    const delBtn = document.createElement("button");

    liNode.appendChild(checkBtn);
    liNode.appendChild(todoText);
    liNode.appendChild(delBtn);
    listArea.appendChild(liNode);

    if (savedTodo) {
        todoText.innerText = savedTodo.todo;
        if (savedTodo.check) {
            todoText.classList.add("check");
            checkBtn.innerHTML = "✔";
        }
    } else {
        todoText.innerText = document.querySelector("#todoInput").value;
        document.querySelector("#todoInput").value = "";
    }

    delBtn.innerText = "X";

    checkBtn.classList.add("checkBtn");
    todoText.classList.add("todoText");
    delBtn.classList.add("delBtn");
    saveItems()

    checkBtn.addEventListener("click", function () {
        if (checkBtn.innerHTML == "") {
            checkBtn.innerHTML = "✔";
        } else {
            checkBtn.innerHTML = "";
        }
        todoText.classList.toggle("check");
        saveItems();
    })

    delBtn.addEventListener("click", function () {
        liNode.remove();
        saveItems();
    })

    console.log(listArea.lastChild);
}

function searchTodoList(query) {
    const listArea = document.querySelector(".listArea");
    const items = listArea.getElementsByTagName("li");

    for (let item of items) {
        const todoText = item.querySelector('span').textContent.toLowerCase();
        if (todoText.includes(query.toLowerCase())) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    }
}