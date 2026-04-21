const API = 'http://localhost:3000/tasks';

//Load Tasks
async function loadTasks(){
    let res=await axios.get(API);
    let tasks=res.data;
    let list=document.getElementById('taskList');
    list.innerHTML='';
    tasks.forEach(t => {
    let li = document.createElement("li");
    li.innerHTML = `
        <span class="${t.completed ? 'completed' : ''}"> ${t.title}</span>
        <button onclick="toggleTask('${t._id}', ${!t.completed})">
            ${t.completed ? 'Undo' : 'Complete'}
        </button>
        <button onclick="editTask('${t._id}', '${t.title}')">Edit</button> 
        <button onclick="deleteTask('${t._id}')">Delete</button>
    `;
    list.appendChild(li);
});
}
//Add task
async function addTask() {
    let input = document.getElementById('taskInput');
    console.log("Input value:", input.value); // Debugging line

    if (!input.value) {
        alert("Please enter a task!");
        return;
    }

    try {
        // Ensure the key name "title" matches your Model exactly
        await axios.post(API, { 
            title: input.value,
            userId: "123" // Send a dummy ID for now to satisfy the backend
        });
        
        input.value = "";
        loadTasks();
    } catch (err) {
        console.error("Add Task Error:", err.response.data);
    }
}

//Toggle task
async function toggleTask(id,completed){
    await axios.put(`${API}/${id}`,{completed});
    loadTasks();
}

//Delete task
async function deleteTask(id){
    await axios.delete(`${API}/${id}`);
    loadTasks();
}

//Initial load
loadTasks();

//edit tasks
async function editTask(id, currentTitle) {
    const newTitle = prompt("Edit Task Title:", currentTitle);
    if (newTitle && newTitle !== currentTitle) {
        await axios.put(`${API}/${id}`, { title: newTitle });
        loadTasks();
    }
}