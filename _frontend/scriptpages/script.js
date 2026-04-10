
// Store todos in a local array
let todos = [];

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    todos.forEach((todo, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong style="${todo.completed ? 'text-decoration: line-through; color: #888;' : ''}">${todo.content}</strong> <br>
                <small>${todo.description}</small>
            </div>
            <div>
                <input type="checkbox" ${todo.completed ? 'checked' : ''} data-idx="${idx}" class="complete-checkbox">
                <button class="delete-btn" data-idx="${idx}">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    });

    // Add event listeners for delete and complete
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-idx');
            todos.splice(idx, 1);
            renderTodos();
        });
    });
    document.querySelectorAll('.complete-checkbox').forEach(cb => {
        cb.addEventListener('change', function() {
            const idx = this.getAttribute('data-idx');
            todos[idx].completed = this.checked;
            renderTodos();
        });
    });

    updateSummary();
}

function setupAddTodoForm() {
    const addtodoform = document.getElementById('addTodoForm');
    addtodoform.addEventListener('submit', function(e) {
        e.preventDefault();
        const content = document.getElementById('todoContent').value.trim();
        const description = document.getElementById('todoDescription').value.trim();
        if (content && description) {
            todos.push({ content, description, completed: false });
            renderTodos();
            addtodoform.reset();
        }
    });
}



function updateSummary() {
    document.getElementById('totalTasksCount').textContent = todos.length;
    document.getElementById('completedTasksCount').textContent = todos.filter(t => t.completed).length;
    document.getElementById('pendingTasksCount').textContent = todos.filter(t => !t.completed).length;
}


window.onload = function() {
    setupAddTodoForm();
    renderTodos();
};

