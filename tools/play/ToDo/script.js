document.addEventListener('DOMContentLoaded', loadTasks); // Ghi nhớ tasks nếu F5 (reload), nhưng khi vào lại trang web (nhập lại ở thanh địa chỉ) thì dữ liệu biến mất.

// Hàm để thêm một công việc mới
function addTask() {
    var taskInput = document.getElementById('taskInput');
    var tasksList = document.getElementById('tasksList');
    var task = taskInput.value;

    if (task.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    var listItem = document.createElement('li');
    listItem.textContent = task;
    listItem.onclick = function() {
        this.parentNode.removeChild(this);
        saveTasks();
    }

    tasksList.appendChild(listItem);
    taskInput.value = '';
    saveTasks();
}

// Hàm để lưu danh sách công việc vào localStorage
function saveTasks() {
    var tasksList = document.getElementById('tasksList');
    var tasks = [];

    for (var i = 0; i < tasksList.children.length; i++) {
        tasks.push(tasksList.children[i].innerText);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Hàm để tải các công việc đã lưu từ localStorage
function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var tasksList = document.getElementById('tasksList');

    tasks.forEach(function(task) {
        var listItem = document.createElement('li');
        listItem.textContent = task;
        listItem.onclick = function() {
            this.parentNode.removeChild(this);
            saveTasks();
        }

        tasksList.appendChild(listItem);
    });
}
