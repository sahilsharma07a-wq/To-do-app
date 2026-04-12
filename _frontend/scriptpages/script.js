
// Store todos in a local array
// console.log(axios);
let todos = [];
const API_BASE = "http://localhost:4000/users";

// Get token from localStorage
function getToken() {
    return localStorage.getItem("token");
}

// Set token to localStorage
function setToken(token) {
    localStorage.setItem("token", token);
}

// Remove token
function removeToken() {
    localStorage.removeItem("token");
}


async function fetchTodos() {
    const token = getToken();
    if (!token) return;
    // You may need a GET endpoint for fetching todos. Assuming /users/todos GET returns user's todos
    try {
        const res = await axios.get(`${API_BASE}/todos`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        todos = res.data.todos || [];
        renderTodos();
    } catch (err) {
        console.log(err);
        todos = [];
        renderTodos();
    }
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    if (!todoList) return;
    todoList.innerHTML = '';
    todos.forEach((todo, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong style="${todo.completed ? 'text-decoration: line-through; color: #888;' : ''}">${todo.content}</strong> <br>
                <small>${todo.description}</small>
            </div>
            <div>
                <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo._id}" class="complete-checkbox">
                <button class="delete-btn" data-id="${todo._id}">Delete</button>
                <button class="update-btn" data-id="${todo._id}">update</button>
            </div>
        `;
        todoList.appendChild(li);
    });

    // Add event listeners for delete and complete
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async function () {
            const id = this.getAttribute('data-id');
            await deleteTodo(id);
        });
    });
    document.querySelectorAll('.complete-checkbox').forEach(cb => {
        cb.addEventListener('change', async function () {
            const id = this.getAttribute('data-id');
            await completeTodo(id);
        });
    });

    document.querySelectorAll('.update-btn').forEach(btn => {
    btn.addEventListener('click', async function () {
        const id = this.getAttribute('data-id');
        await updateTodo(id);
    });
});

    updateSummary();
}

function setupAddTodoForm() {
    const addtodoform = document.getElementById('addTodoForm');
    if (!addtodoform) return;
    addtodoform.addEventListener('submit', async function (e) {
        e.preventDefault();
        const content = document.getElementById('todoContent').value.trim();
        const description = document.getElementById('todoDescription').value.trim();
        if (content && description) {
            await addTodo(content, description);
            addtodoform.reset();
        }
    });
}


function updateSummary() {
    if (document.getElementById('totalTasksCount'))
        document.getElementById('totalTasksCount').textContent = todos.length;
    if (document.getElementById('completedTasksCount'))
        document.getElementById('completedTasksCount').textContent = todos.filter(t => t.completed).length;
    if (document.getElementById('pendingTasksCount'))
        document.getElementById('pendingTasksCount').textContent = todos.filter(t => !t.completed).length;
}

// --- Todo API Calls ---
async function addTodo(content, description) {
    const token = getToken();
    if (!token) return;
    try {
        await axios.post(`${API_BASE}/todos`, { content, description }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        await fetchTodos();
    } catch (err) {
        alert("Failed to add todo");
    }
}

async function deleteTodo(id) {
    const token = getToken();
    if (!token) return;
    try {
        await axios.post(`${API_BASE}/delete/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        await fetchTodos();
    } catch (err) {
        alert("Failed to delete todo");
    }
}

async function updateTodo(id) {
    const token = getToken();
    if (!token) return;
    const content = prompt("Enter new content")
    const description = prompt("Enter new description");
    if(!content||!description) return;
    try {
        await axios.put(`${API_BASE}/update/${id}`,
            { content, description }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        await fetchTodos();
    } catch (error) {
        alert("failed to update tasks");
    }
}

async function completeTodo(id) {
    const token = getToken();
    if (!token) return;
    try {
        await axios.post(`${API_BASE}/complete/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        await fetchTodos();
    } catch (err) {
        alert("Failed to complete todo");
    }
}


window.onload = function () {
    setupAddTodoForm();
    if (getToken()) {
        fetchTodos();
    }
};

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        await login();
    });
}

const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        await signup();
    });
}


// --- Authentication ---
async function signup() {
    const username = document.getElementById("username").value;
    const Name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        if (email && Name && username && password) {
            const response = await axios.post(`${API_BASE}/register`, {
                username: username,
                email: email,
                password: password,
                name: Name,
            });
            if (response.status >= 200 && response.status <= 299) {
                alert("Signup successful");
                window.location.href = "login.html";
            }
        }
    } catch (error) {
        alert("Something went wrong",);
        console.log(error);
    }
}

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await axios.post(`${API_BASE}/login`, {
            username,
            password
        });

        const { token, user } = response.data;
        console.log(response.data)
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        window.location.href = "index.html";

    } catch (error) {
        console.log(error);
        alert("Login failed");
    }
}

