'use strict';
const taskTrigger = document.getElementById('task-trigger');
const taskChange = document.getElementById('task-change');
const taskValue = document.getElementById('task-value');
const taskTable = document.getElementById('task-table');
const tasks = [];

const showTasks = () => {
  taskTable.innerText = '';
  tasks.forEach((task) => {
    const taskId = taskTable.rows.length;
    const row = taskTable.insertRow(-1);

    const id = row.insertCell(0);
    const comment = row.insertCell(1);
    const status = row.insertCell(2);
    const remove = row.insertCell(3);

    id.innerText = taskId;
    comment.innerText = task.task;
    createStatusButton(task, status, row);
    createRemoveButton(task, remove, row);
  });
}

const createStatusButton = (task, status, row) => {
  const statusButton = document.createElement('button');
  statusButton.innerText = task.status;
  statusButton.addEventListener('click', () => {
    const index = row.rowIndex - 1;
    if (task.status === '作業中') {
      task.status = '完了';
      taskTable.rows[index].className = 'finish';
    } else {
      task.status = '作業中';
      taskTable.rows[index].className = 'working';
    }
    statusButton.remove();
    createStatusButton(task, status, row);
    displayChange();
  });
  status.appendChild(statusButton);
}

const createRemoveButton = (task, remove, row) => {
  const removeButton = document.createElement('button');
  removeButton.innerText = task.remove;
  removeButton.addEventListener('click', () => {
    const index = row.rowIndex - 1;
    tasks.splice(index,1);
    showTasks();
    displayChange();
  });
  remove.appendChild(removeButton);
}

taskTrigger.addEventListener('click', () => {
  if (taskValue.value !== '') {
    const task = {task: taskValue.value, status: '作業中', remove: '削除'};
    tasks.push(task);
    showTasks();
    displayChange();
    taskValue.value = '';
  }
});

const displayChange = () => {
  for (let i = 0; i < taskTable.rows.length; i++) {
    if (taskTable.rows[i].cells[2].innerText === '作業中') {
      taskTable.rows[i].className = 'working';
    } else if (taskTable.rows[i].cells[2].innerText === '完了') {
      taskTable.rows[i].className = 'finish';
    }
  }
  const workTask = document.querySelectorAll('.working');
  const finishTask = document.querySelectorAll('.finish');
  if (taskChange.group.value === 'working') {
    workTask.forEach(element => {
      element.style.display = '';
    });
    finishTask.forEach(element => {
      element.style.display = 'none';
    });
  } else if (taskChange.group.value === 'finish') {
    workTask.forEach(element => {
      element.style.display = 'none';
    });
    finishTask.forEach(element => {
      element.style.display = '';
    });
  } else {
    workTask.forEach(element => {
      element.style.display = '';
    });
    finishTask.forEach(element => {
      element.style.display = '';
    });
  }
};

taskChange.addEventListener('change', () => {
  displayChange();
});