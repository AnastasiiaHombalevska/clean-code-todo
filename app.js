const newTaskInput = document.getElementById("new_task");
const addButton = document.querySelector(".add");
const incompleteTasksHolder = document.getElementById("incomplete_tasks");
const completedTasksHolder = document.getElementById("completed_tasks");

function createElement({ tagName, type, text, className, src }) {
  const element = document.createElement(tagName);

  if (type !== undefined) element.type = type;
  if (text !== undefined) element.innerText = text;
  if (className !== undefined) element.className = className;
  if (src !== undefined) element.src = src;

  return element;
}

function createNewTask(taskTitle) {
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

  deleteButton.append(deleteButtonImg);
  listItem.append(checkBox, label, editInput, editButton, deleteButton);

  return listItem;
}

function addTask() {
  const taskTitle = newTaskInput.value.trim();

  if (!taskTitle) return;

  const listItem = createNewTask(taskTitle);

  incompleteTasksHolder.append(listItem);
  bindTaskEvents(listItem);

  newTaskInput.value = "";
}

function startEditing(editInput, label, editButton) {
  editInput.value = label.innerText;
  editButton.innerText = "Save";
}

function saveTaskChanges(editInput, label, editButton) {
  label.innerText = editInput.value;
  editButton.innerText = "Edit";
}

function editTask(event) {
  const editButton = event.currentTarget;
  const listItem = editButton.parentNode;
  const editInput = listItem.querySelector('input[type="text"]');
  const label = listItem.querySelector("label");
  const isEditMode = listItem.classList.contains("edit_mode");

  if (isEditMode) {
    saveTaskChanges(editInput, label, editButton);
  } else {
    startEditing(editInput, label, editButton);
  }

  listItem.classList.toggle("edit_mode");
}

function deleteTask(event) {
  const listItem = event.currentTarget.parentNode;
  listItem.remove();
}

function toggleTaskStatus(event) {
  const checkBox = event.currentTarget;
  const listItem = checkBox.parentNode;

  const tasksContainer = checkBox.checked
    ? completedTasksHolder
    : incompleteTasksHolder;

  tasksContainer.append(listItem);
}

function bindTaskEvents(taskListItem) {
  const checkBox = taskListItem.querySelector('input[type="checkbox"]');
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.addEventListener("change", toggleTaskStatus);
}

function initializeTaskEvents(tasksContainer) {
  for (const task of tasksContainer.children) {
    bindTaskEvents(task);
  }
}

function initializeApp() {
  addButton.addEventListener("click", addTask);

  initializeTaskEvents(incompleteTasksHolder);
  initializeTaskEvents(completedTasksHolder);
}

initializeApp();
