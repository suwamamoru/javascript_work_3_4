'use strict';
const taskTrigger = document.getElementById('task-trigger');
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
    createStatusButton(task, status);
    createRemoveButton(task, remove, row);
  });
}

const createStatusButton = (task, status) => {
  const statusButton = document.createElement('button');
  statusButton.innerText = task.status;
  statusButton.addEventListener('click', () => {
    if (task.status === '作業中') {
      task.status = '完了';
    } else {
      task.status = '作業中';
    }
    statusButton.remove();
    createStatusButton(task, status);
  });
  status.appendChild(statusButton);
};

const createRemoveButton = (task, remove, row) => {
  const removeButton = document.createElement('button');
  removeButton.innerText = task.remove;
  removeButton.addEventListener('click', () => {
    const index = row.rowIndex - 1;
    tasks.splice(index,1);
    showTasks();
  });
  remove.appendChild(removeButton);
}

taskTrigger.addEventListener('click', () => {
  const task = {task: taskValue.value, status: '作業中', remove: '削除'};
  tasks.push(task);
  showTasks();
  taskValue.value = '';
});