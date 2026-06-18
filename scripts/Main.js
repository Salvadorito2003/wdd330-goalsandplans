import { loadHeaderFooter } from "./utils.mjs";
import { displayGoals } from "./GoalsAndPlans.js";

loadHeaderFooter();

import {
  initializeGoogleAuth,
  signInGoogle,
  createCalendarEvent,
  getAccessToken,
} from "./GoogleCalendar.js";

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

const checkbox = document.getElementById("calendar-reminder");
const reminderLabel = document.getElementById("reminder-date");

checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        reminderLabel.classList.remove("hidden");
    } else {
        reminderLabel.classList.add("hidden");
    }
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
    const goals = JSON.parse(localStorage.getItem("goals")) || [];

    goals.push(goal);
    const token = getAccessToken();
    
        if (token) {
            localStorage.setItem("goals", JSON.stringify(goals));
        }
    

    console.log(goal);
    await createCalendarEvent(goal);
});
await displayGoals();