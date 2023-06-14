import { displayToDo } from "./domManipulation.js";

export const saveToDoToLocal = (todo) => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  displayToDo();
  return todo;
};
