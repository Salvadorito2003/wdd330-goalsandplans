import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

import {
  initializeGoogleAuth,
  signInGoogle,
  createCalendarEvent,
} from "./googleCalendar.js";

window.addEventListener("load", () => {
  initializeGoogleAuth();
});

document
  .querySelector("#connect-google")
  .addEventListener("click", signInGoogle);

const addTaskButton = document.querySelector("#add-task");
const tasksDiv = document.querySelector("#tasks");
addTaskButton.addEventListener("click", () => {
  const taskContainer = document.createElement("div");
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.classList.add("task-name");
  label.textContent = "Task Name: ";
  label.appendChild(input);
  taskContainer.appendChild(label);
  const cancel = document.createElement("button");
  cancel.textContent = "X";
  cancel.addEventListener("click", () => {
    taskContainer.remove();
  })
  taskContainer.appendChild(cancel);
  tasksDiv.appendChild(taskContainer);
})

const reminderCheckbox = document.querySelector("#calendar-reminder");
const reminderContainer = document.querySelector("#reminder-date");

reminderCheckbox.addEventListener("change", () => {
    reminderContainer.hidden = !reminderCheckbox.checked;
});
const saveButton = document.querySelector("#save-goal");

saveButton.addEventListener("click", async () => {
    const goalTitle =
        document.querySelector("#goal-title").value;

    const goalDate =
        document.querySelector("#goal-date").value;

    const reminder =
        document.querySelector("#calendar-reminder").checked;

    const taskInputs =
        document.querySelectorAll(".task-name");

    const tasks = [];

    taskInputs.forEach(task => {
        tasks.push(task.value);
    });
    const reminderDate = document.querySelector("#reminder-input").value;

    const goal = {
        title: goalTitle,
        endDate: goalDate,
        reminder,
        reminderDate,
        tasks
    };

    console.log(goal);
    await createCalendarEvent(goal);
});