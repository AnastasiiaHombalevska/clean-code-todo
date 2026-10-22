const newTaskInput = document.getElementById("new_task");
const addButton = document.querySelector(".add");
const incompleteTasksHolder = document.getElementById("incomplete_tasks");
const completedTasksHolder = document.getElementById("completed_tasks");

function createNewElement(element) {
  const { el, type = "", text = "", className = "", src = "" } = element;

  const newElement = document.createElement(el);
  newElement.type = type;
  newElement.innerText = text;
  newElement.className = className;
  newElement.src = src;

  return newElement;
}

const createNewTask = function (taskString) {
  const listItem = createNewElement({ el: "li" });
  const checkBox = createNewElement({ el: "input", type: "checkbox" });
  const label = createNewElement({
    el: "label",
    text: taskString,
    className: "task",
  });
  const editInput = createNewElement({
    el: "input",
    type: "text",
    className: "task",
  });
  const editButton = createNewElement({
    el: "button",
    text: "Edit",
    className: "edit",
  });
  const deleteButton = createNewElement({ el: "button", className: "delete" });
  const deleteButtonImg = createNewElement({ el: "img", src: "./remove.svg" });

  deleteButton.appendChild(deleteButtonImg);
  listItem.append(checkBox, label, editInput, editButton, deleteButton);

  return listItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;

  const listItem = createNewTask(newTaskInput.value);

  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, toggleTaskStatus);

  newTaskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const containsClass = listItem.classList.contains("edit_mode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("edit_mode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const list = listItem.parentNode;

  list.removeChild(listItem);
};

function toggleTaskStatus(event) {
  const listItem = event.currentTarget.parentNode;

  const tasksContainer = event.currentTarget.checked
    ? completedTasksHolder
    : incompleteTasksHolder;

  tasksContainer.appendChild(listItem);
}

const ajaxRequest = function () {
  console.log("AJAX Request");
};

//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.addEventListener("change", checkBoxEventHandler);
};

function initializeTaskEvents(tasksContainer, onStatusChange) {
  for (let i = 0; i < tasksContainer.children.length; i++) {
    bindTaskEvents(tasksContainer.children[i], onStatusChange);
  }
}

initializeTaskEvents(incompleteTasksHolder, toggleTaskStatus);
initializeTaskEvents(completedTasksHolder, toggleTaskStatus);
