export async function displayGoals() {
    const allTasksDiv = document.querySelector("#all-tasks");

    allTasksDiv.innerHTML = "";

    const goals = JSON.parse(localStorage.getItem("goals")) || [];

    goals.forEach(goal => {
        const goalCard = document.createElement("div");

        goalCard.innerHTML = `
            <h3>${goal.title}</h3>
            <p>End Date: ${goal.endDate}</p>
            <p>Tasks:</p>
            <ul>
                ${goal.tasks.map(task => `<li>${task}</li>`).join("")}
            </ul>
        `;

        allTasksDiv.appendChild(goalCard);
    });
}