const newTaskInput = document.getElementById("new_task");
const addButton = document.querySelector(".add");
const incompleteTasksHolder = document.getElementById("incomplete_tasks");
const completedTasksHolder = document.getElementById("completed_tasks");

function createElement({ tagName, type, text, className, src }) {
  const newElement = document.createElement(tagName);

  if (type !== undefined) newElement.type = type;
  if (text !== undefined) newElement.innerText = text;
  if (className !== undefined) newElement.className = className;
  if (src !== undefined) newElement.src = src;

  return newElement;
}

const createNewTask = function (taskTitle) {
  const listItem = createElement({ tagName: "li" });
  const checkBox = createElement({ tagName: "input", type: "checkbox" });
  const label = createElement({
    tagName: "label",
    text: taskTitle,
    className: "task",
  });
  const editInput = createElement({
    tagName: "input",
    type: "text",
    className: "task",
  });
  const editButton = createElement({
    tagName: "button",
    text: "Edit",
    className: "edit",
  });
  const deleteButton = createElement({
    tagName: "button",
    className: "delete",
  });
  const deleteButtonImg = createElement({
    tagName: "img",
    src: "./remove.svg",
  });

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
  const listItem = event.currentTarget.parentNode;

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

const deleteTask = function (event) {
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

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.addEventListener("change", toggleTaskStatus);
};

function initializeTaskEvents(tasksContainer) {
  for (const task of tasksContainer.children) {
    bindTaskEvents(task);
  }
}

initializeTaskEvents(incompleteTasksHolder, toggleTaskStatus);
initializeTaskEvents(completedTasksHolder, toggleTaskStatus);
