const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector(".tasks-container");

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validateInput();

  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskText = document.createElement("p");
  taskText.innerText = inputElement.value;

  taskText.addEventListener("click", () => handleClick(taskText));

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("bx");
  deleteItem.classList.add("bxs-trash");

  deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskText)
  );

  taskItemContainer.appendChild(taskText);
  taskItemContainer.appendChild(deleteItem);

  tasksContainer.appendChild(taskItemContainer);

  inputElement.value = "";

  updateLocalStorage();
};

const handleClick = (taskText) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskText);
    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }

  updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskText) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskText);
    if (currentTaskIsBeingClicked) {
      taskItemContainer.remove();
    }
  }

  updateLocalStorage();
};

const handleInputChange = () => {
  const inputIsValid = validateInput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  if (!tasksFromLocalStorage) return;

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskText = document.createElement("p");
    taskText.innerText = task.description;

    if (task.isCompleted) {
      taskText.classList.add("completed");
    }

    taskText.addEventListener("click", () => handleClick(taskText));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("bx");
    deleteItem.classList.add("bxs-trash");

    deleteItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskText)
    );

    taskItemContainer.appendChild(taskText);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);
  }
};

refreshTasksUsingLocalStorage();

const bg = document.getElementById("bg");

const generateStars = () => {
  const numStars = 500;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("span");
    star.classList = "star";
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 2 + 0.5}s`;

    bg.appendChild(star);
  }
};

generateStars();

addTaskButton.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("change", () => handleInputChange());
