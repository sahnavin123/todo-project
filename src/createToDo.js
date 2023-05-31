import { parseISO, startOfToday } from "date-fns";
import { clearForm } from "./domManipulation.js";
import { saveToDoToLocal } from "./localStorage.js";

export const createToDo = () => {
  let title = document.getElementById("Title").value;
  let description = document.getElementById("Description").value;
  let dueDate = document.getElementById("DueDate").value;
  let priority = document.getElementById("Priority").value;
  let notes = document.getElementById("Notes").value;

  if (title === "" || description === "" || dueDate === "") {
    alert(
      "Title, Description, and Due Date are required fields, please enter values!"
    );
    return;
  }

  if (title.length > 30 && description.length > 50) {
    alert("please enter title less than 30 character and description less than 50 character");
    return;
  } else if (title.length > 30) {
    alert("please enter title less than 30 character");
    return;
  } else if (description.length > 50) {
    alert("please enter description less than 50 character");
    return;
  }

  if (parseISO(dueDate) < startOfToday()) {
    alert(
      "You have entered a date that has already passed!  Please enter a date greater than or equal to today."
    );
    return;
  }

  const todo = { title, description, dueDate, priority, notes };
  saveToDoToLocal(todo);
  clearForm();

  return todo;
};
