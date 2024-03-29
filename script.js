const newTodoBtn = document.getElementById('newTodoBtn');
const addNewModal = document.getElementById('addNewModal');
const closeAddModal = document.getElementById('closeAddModal');
const createNewTodo = document.getElementById('createNewTodo');
const doneTodoList = document.getElementById('doneTodoList');
const undoneTodoList = document.getElementById('undoneTodoList');
const inputTitle = document.getElementById('inputTitle');
const inputDesc = document.getElementById('inputDesc');

let todos = JSON.parse(localStorage.getItem('todos'))
function getTodos() {
    todos = JSON.parse(localStorage.getItem('todos'))
}
if (!todos) { localStorage.setItem('todos', JSON.stringify([])) }

async function getLocalTodos() {
    todos = JSON.parse(localStorage.getItem('todos'));
    let doneLength = todos.filter(t => t.isDone == true).length;
    let undoneLength = todos.filter(t => t.isDone == false).length;
    doneLength == 0 ? doneTodoList.innerHTML = `<p class="text-center text-slate-700 py-8">There are no done todos</p>` : doneTodoList.innerHTML = '';
    undoneLength == 0 ? undoneTodoList.innerHTML = `<p class="text-center text-slate-700 py-8">There are no undone todos</p>` : undoneTodoList.innerHTML = '';
    if (todos) {
        todos.forEach(todo => {
            if (todo.isDone == false) {
                undoneTodoList.innerHTML += `
                                        <li class="listItem h-fit bg-stone-100 p-4 flex flex-col items-start gap-2 bg-stone rounded-xl shadow-md">
                                        <p class="text-lg font-bold text-slate-700">${todo.title}</p>
                                        <p class="text-md font-semibold text-slate-700">${todo.desc}</p>
                                        <span class="flex items-center gap-3 w-full">
                                        <button id="todoDeleteBtn" todoid="${todo.id}" class="px-4 py-2 text-stone-100 hover:shadow-md font-bold w-2/5 bg-gradient-to-r from-red-500 to-red-600 rounded-md">Delete</button>
                                        <button id="todoDoneBtn" todoid="${todo.id}" class="px-4 py-2 text-stone-100 hover:shadow-md font-bold w-3/5 bg-gradient-to-r from-green-500 to-green-600 rounded-md">Done</button>
                                        </span>
                                    </li>
                                `
            } else {
                doneTodoList.innerHTML += `
                                    <li class="listItem h-fit bg-stone-100 p-4 flex flex-col items-start gap-2 bg-stone rounded-xl shadow-md">
                                        <p class="text-lg font-bold text-slate-700">${todo.title}</p>
                                        <p class="text-md font-semibold text-slate-700">${todo.desc}</p>
                                        <span class="flex items-center gap-3 w-full">
                                            <button id="todoDeleteBtn" todoid="${todo.id}" class="px-4 py-2 text-stone-100 hover:shadow-md font-bold w-2/5 bg-gradient-to-r from-red-500 to-red-600 rounded-md">Delete</button>
                                            <button id="todoUndoneBtn" todoid="${todo.id}" class="px-4 py-2 text-stone-500 hover:shadow-md font-bold w-3/5 bg-gradient-to-r from-green-200 to-green-300 rounded-md">Undone</button>
                                        </span>
                                    </li>
                                `
            }
            
        })
    }
}

function checkTodos() {
    const listItems = document.querySelectorAll('.listItem')
    listItems.forEach(item => {
        item.addEventListener('click', (e) => {
           let button = e.target
           if (button.getAttribute('id') == 'todoDoneBtn') {
            let todo = todos.filter(t => t.id == +button.getAttribute('todoid'))[0]
            let todo_updated = {
                id: todo.id,
                title: todo.title,
                desc: todo.desc,
                isDone: true
            }
            let todos_updated = todos.filter(t => t.id != +button.getAttribute('todoid'))
            todos_updated.push(todo_updated)
            localStorage.setItem('todos', JSON.stringify(todos_updated))
            updatePage()
           } else if(button.getAttribute('id') == 'todoUndoneBtn') {
            let todo = todos.filter(t => t.id == +button.getAttribute('todoid'))[0]
            let todo_updated = {
                id: todo.id,
                title: todo.title,
                desc: todo.desc,
                isDone: false
            }
            let todos_updated = todos.filter(t => t.id != +button.getAttribute('todoid'))
            todos_updated.push(todo_updated)
            localStorage.setItem('todos', JSON.stringify(todos_updated))
            updatePage()
           } else if (button.getAttribute('id') == 'todoDeleteBtn') {
            let todos_updated = todos.filter(t => t.id != +button.getAttribute('todoid'))
            localStorage.setItem('todos', JSON.stringify(todos_updated))
            updatePage()
           } else {}
        })
    })
}

function updatePage() {
    getLocalTodos().then(() => {
        checkTodos()
    }).catch((e) => {
        console.log(e)
    })
}

function CloseAddModal() {
    addNewModal.classList.remove('flex')
    addNewModal.classList.add('hidden')
}

updatePage()

newTodoBtn.addEventListener('click', () => {
    addNewModal.classList.remove('hidden')
    addNewModal.classList.add('flex')
})

closeAddModal.addEventListener('click', () => {
    CloseAddModal()
})

createNewTodo.addEventListener('click', () => {
    let newTodo = {
        id: todos == null ? 0 : todos.length,
        title: inputTitle.value,
        desc: inputDesc.value,
        isDone: false
    }
    todos.push(newTodo)
    localStorage.setItem('todos', JSON.stringify(todos))
    updatePage()
    CloseAddModal()
})



