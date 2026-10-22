const newTaskInput = document.getElementById("new_task");
const addButton = document.querySelector(".add");
const incompleteTasksHolder = document.getElementById("incomplete_tasks");
const completedTasksHolder = document.getElementById("completed_tasks");

function createElement(element) {
  const { tagName, type = "", text = "", className = "", src = "" } = element;

  const newElement = document.createElement(tagName);
  if (type !== undefined) element.type = type;
  if (text !== undefined) element.innerText = text;
  if (className !== undefined) element.className = className;
  if (src !== undefined) element.src = src;

  return newElement;
}

const createNewTask = function (taskTitle) {
  const listItem = createElement({ el: "li" });
  const checkBox = createElement({ el: "input", type: "checkbox" });
  const label = createElement({
    el: "label",
    text: taskTitle,
    className: "task",
  });
  const editInput = createElement({
    el: "input",
    type: "text",
    className: "task",
  });
  const editButton = createElement({
    el: "button",
    text: "Edit",
    className: "edit",
  });
  const deleteButton = createElement({ el: "button", className: "delete" });
  const deleteButtonImg = createElement({ el: "img", src: "./remove.svg" });

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

const editTask = function (event) {
  const listItem = event.currentTarget;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("edit_mode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("edit_mode");
};

const deleteTask = function () {
  const listItem = event.currentTarget.parentNode;
  listItem.remove();
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

const bindTaskEvents = function (taskListItem, toggleTaskStatus) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.addEventListener("change", toggleTaskStatus);
};

function initializeTaskEvents(tasksContainer, onStatusChange) {
  for (let i = 0; i < tasksContainer.children.length; i++) {
    bindTaskEvents(tasksContainer.children[i], onStatusChange);
  }
}

initializeTaskEvents(incompleteTasksHolder, toggleTaskStatus);
initializeTaskEvents(completedTasksHolder, toggleTaskStatus);
