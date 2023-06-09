import { parseISO, startOfToday } from "date-fns";
import { clearForm } from "./domManipulation.js";
import { saveToDoToLocal } from "./localStorage.js";

const showError = (elementId, errorMessage) => {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = errorMessage;
};

const clearError = (elementId) => {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = "";
};

const addFieldListeners = () => {
  const titleField = document.getElementById("title");
  const descriptionField = document.getElementById("description");
  const dueDateField = document.getElementById("dueDate");

  titleField.addEventListener("input", () => {
    clearError("title-error");
  });

  descriptionField.addEventListener("input", () => {
    clearError("description-error");
  });

  dueDateField.addEventListener("input", () => {
    clearError("dueDate-error");
  });
};

export const createToDo = () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;
  const notes = document.getElementById("notes").value;

  const errorFields = [];

  clearError("title-error");
  clearError("description-error");
  clearError("dueDate-error");

  if (title === "") {
    showError(
      "title-error",
      "Title is a required field, please enter a value!"
    );
    errorFields.push("title");
  }

  if (description === "") {
    showError(
      "description-error",
      "Description is a required field, please enter a value!"
    );
    errorFields.push("description");
  }

  if (dueDate === "") {
    showError(
      "dueDate-error",
      "Due date is a required field, please enter a value!"
    );
    errorFields.push("dueDate");
  }

  if (errorFields.length > 0) {
    return;
  }

  if (title.length > 30 && description.length > 50) {
    showError(
      "title-error",
      "Please enter a title with less than 30 characters."
    );
    showError(
      "description-error",
      "Please enter a description with less than 50 characters."
    );
    return;
  } else if (title.length > 30) {
    showError(
      "title-error",
      "Please enter a title with less than 30 characters."
    );
    return;
  } else if (description.length > 50) {
    showError(
      "description-error",
      "Please enter a description with less than 50 characters."
    );
    return;
  }

  if (parseISO(dueDate) < startOfToday()) {
    showError(
      "dueDate-error",
      "You have entered a date that has already passed! Please enter a date greater than or equal to today."
    );
    return;
  }

  const todo = { title, description, dueDate, priority, notes };
  saveToDoToLocal(todo);
  clearForm();

  return todo;
};

addFieldListeners();
