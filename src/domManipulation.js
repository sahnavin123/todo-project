let toggleForm = false;

const displayTheForm = () => {
  if (!toggleForm) {
    document.getElementById("add-todo-form").style.display = "block";
    document.getElementsByClassName("form-container")[0].style.backgroundColor =
      "rgba(229, 226, 215, 0.759)";
    toggleForm = !toggleForm;
  } else {
    document.getElementById("add-todo-form").style.display = "none";
    toggleForm = !toggleForm;
    document.getElementsByClassName("form-container")[0].style.backgroundColor =
      "";
  }
};

const clearForm = () => {
  document.getElementById("add-todo").reset();
};

const displayToDo = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  const projects = document.querySelector(".projects");
  projects.innerHTML = "";

  if (todos.length === 0) {
    const emptyText = document.createElement("p");
    emptyText.textContent = "Hurray!! there are no pending tasks";
    emptyText.id = "empty-todo-text";
    projects.appendChild(emptyText);
    return;
  }

  todos.forEach((todo) => {
    const card = document.createElement("div");
    card.classList.add("card");
    projects.appendChild(card);

    const displayArray = {
      Title: todo.title,
      Description: todo.description,
      DueDate: todo.dueDate,
      Priority: todo.priority,
      ...(todo.notes && { Notes: todo.notes }),
    };

    for (let key in displayArray) {
      const paragraph = document.createElement("p");
      const boldKey = document.createElement("strong");
      boldKey.textContent = key;
      paragraph.appendChild(boldKey);
      paragraph.innerHTML += `: ${displayArray[key]}`;
      card.appendChild(paragraph);
    }

    const deleteToDoButton = document.createElement("button");
    deleteToDoButton.classList.add("btn");
    deleteToDoButton.textContent = "Delete To do";
    card.appendChild(deleteToDoButton);
    deleteToDoButton.addEventListener("click", () => {
      const index = todos.findIndex((item) => item.title === todo.title);
      if (index !== -1) {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        displayToDo();
      }
    });
  });
};

export { displayTheForm, clearForm, displayToDo };
