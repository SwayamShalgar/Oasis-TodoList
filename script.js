let listContainer = document.getElementById('list-container');
let inputBox = document.getElementById('input-box');
let taskIdCounter = 0;  // Initialize a counter for task IDs

function addTask() {
    if (inputBox.value == '') {
        alert('Please Enter the Text');
    } else {
        const task = document.createElement('li');
        task.textContent = inputBox.value;
        task.id = `task-${taskIdCounter++}`;  // Assign a unique ID to the task
        listContainer.appendChild(task);
        let span = document.createElement('span');
        span.textContent = "x";
        task.appendChild(span);
        span.style.right = '0px';

        // Animate new task
        gsap.from(task, {
            scale: 0,
            opacity: 0,
            duration: 1
        });
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === 'SPAN') {
        let taskElement = e.target.parentElement;
        gsap.to(taskElement, {
            scale: 0,
            opacity: 0,
            duration: 1,
            onComplete: function () {
                taskElement.remove();
                saveData();
            }
        });
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
    localStorage.setItem("taskIdCounter", taskIdCounter);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    taskIdCounter = parseInt(localStorage.getItem("taskIdCounter")) || 0;

    // Re-attach the click event listeners to the existing items
    let listItems = listContainer.getElementsByTagName('li');
    for (let i = 0; i < listItems.length; i++) {
        let span = listItems[i].getElementsByTagName('span')[0];
        if (span) {
            span.addEventListener('click', function () {
                let taskElement = span.parentElement;
                gsap.to(taskElement, {
                    scale: 0,
                    opacity: 0,
                    duration: 1,
                    onComplete: function () {
                        taskElement.remove();
                        saveData();
                    }
                });
            });
        }
    }
}

showTask();
