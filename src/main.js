'use strict';
const taskTrigger = document.getElementById('task-trigger');
const taskChange = document.getElementById('task-change');
const taskValue = document.getElementById('task-value');
const taskTable = document.getElementById('task-table');
const workTable = document.getElementById('work-table');
const finishTable = document.getElementById('finish-table');
const tasks = [];
const works = [];
const finishes = [];

const showTasks = () => {
  taskTable.innerText = '';
  workTable.innerText = '';
  finishTable.innerText = '';
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

const workTasks = () => {
  taskTable.innerText = '';
  workTable.innerText = '';
  finishTable.innerText = '';
  works.forEach((work) => {
    const workId = workTable.rows.length;
    const row = workTable.insertRow(-1);

    const id = row.insertCell(0);
    const comment = row.insertCell(1);
    const status = row.insertCell(2);
    const remove = row.insertCell(3);

    id.innerText = workId;
    comment.innerText = work.task;
    createStatusButton(work, status);
    createRemoveButton(work, remove, row);
  });
}

const finishTasks = () => {
  taskTable.innerText = '';
  workTable.innerText = '';
  finishTable.innerText = '';
  finishes.forEach((finish) => {
    const finishId = finishTable.rows.length;
    const row = finishTable.insertRow(-1);

    const id = row.insertCell(0);
    const comment = row.insertCell(1);
    const status = row.insertCell(2);
    const remove = row.insertCell(3);

    id.innerText = finishId;
    comment.innerText = finish.task;
    createStatusButton(finish, status);
    createRemoveButton(finish, remove, row);
  });
}

const ifWork = () => {
  works.length = 0;
  const beforeWork = tasks.filter((task) => {
    return task.status === '作業中';
  });
  for (let i = 0; i < beforeWork.length; i++) {
    const work = beforeWork[i];
    works.push(work);
  }
}

const ifFinish = () => {
  finishes.length = 0;
  const beforeFinish = tasks.filter((task) => {
    return task.status === '完了';
  });
  for (let i = 0; i < beforeFinish.length; i++) {
    const finish = beforeFinish[i];
    finishes.push(finish);
  }
}

const ifChange = () => {
  if (taskChange.group.value === 'working') {
    ifWork();
    workTasks();
  } else if (taskChange.group.value === 'finish') {
    ifFinish();
    finishTasks();
  } else {
    showTasks();
  }
}

const createStatusButton = (task, status) => {
  const statusButton = document.createElement('button');
  statusButton.innerText = task.status;
  statusButton.addEventListener('click', () => {
    if (task.status === '作業中') {
      task.status = '完了';
      ifChange();
    } else {
      task.status = '作業中';
      ifChange();
    }
  });
  status.appendChild(statusButton);
}

const createRemoveButton = (task, remove, row) => {
  const removeButton = document.createElement('button');
  removeButton.innerText = task.remove;
  removeButton.addEventListener('click', () => {
    const index = row.rowIndex - 1;
    if (taskChange.group.value === 'working') {
      ifWork();
      const workSplice = works.splice(index,1);
      const foundWork = workSplice.find((work) => work.status === '作業中');
      const taskSplice = tasks.filter((task) => task.task !== foundWork.task);
      tasks.length = 0;
      for (let i = 0; i < taskSplice.length; i++) {
        const taskReunion = taskSplice[i];
        tasks.push(taskReunion);
      }
      workTasks();
    } else if (taskChange.group.value === 'finish') {
      ifFinish();
      const finishSplice = finishes.splice(index,1);
      const foundFinish = finishSplice.find((finish) => finish.status === '完了');
      const taskSplice = tasks.filter((task) => task.task !== foundFinish.task);
      tasks.length = 0;
      for (let i = 0; i < taskSplice.length; i++) {
        const taskReunion = taskSplice[i];
        tasks.push(taskReunion);
      }
      finishTasks();
    } else {
      tasks.splice(index,1);
      showTasks();
    }
  });
  remove.appendChild(removeButton);
}

taskTrigger.addEventListener('click', () => {
  const task = {task: taskValue.value, status: '作業中', remove: '削除'};
  tasks.push(task);
  ifChange();
  taskValue.value = '';
});

taskChange.addEventListener('change', () => {
  ifChange();
});