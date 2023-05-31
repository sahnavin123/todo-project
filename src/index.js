import { createToDo } from "./createToDo.js";
import { displayTheForm, clearForm, displayToDo } from "./domManipulation.js";

displayToDo();

const addNewToDo = document.querySelector("#add-todo-button");
const clearBtn = document.querySelector("#reset-button");
const submitBtn = document.querySelector("#submit-button");

addNewToDo.addEventListener("click", displayTheForm);
clearBtn.addEventListener("click", clearForm);
submitBtn.addEventListener("click", createToDo);
