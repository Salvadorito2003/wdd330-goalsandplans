export async function createCalendarEvent(goal) {
    console.log("createCalendarEvent called");

    const token = getAccessToken();

    if (!token) {
        alert("Please connect your Google Calendar first.");
        return;
    }

    // Evento de la meta
    const goalEvent = {
        summary: goal.title,
        description: goal.tasks.join("\n"),
        start: {
            dateTime: `${goal.endDate}T09:00:00`,
            timeZone: "America/Argentina/Buenos_Aires",
        },
        end: {
            dateTime: `${goal.endDate}T10:00:00`,
            timeZone: "America/Argentina/Buenos_Aires",
        },
    };

    // Crear evento final
    const goalResponse = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(goalEvent),
        }
    );

    const goalData = await goalResponse.json();

    console.log("Goal Status:", goalResponse.status);
    console.log("Goal Response:", goalData);

    // Crear evento de recordatorio si corresponde
    if (goal.reminder && goal.reminderDate) {
        const reminderEvent = {
            summary: `Reminder: ${goal.title}`,
            description: goal.tasks.join("\n"),
            start: {
                dateTime: `${goal.reminderDate}T09:00:00`,
                timeZone: "America/Argentina/Buenos_Aires",
            },
            end: {
                dateTime: `${goal.reminderDate}T10:00:00`,
                timeZone: "America/Argentina/Buenos_Aires",
            },
        };

        const reminderResponse = await fetch(
            "https://www.googleapis.com/calendar/v3/calendars/primary/events",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reminderEvent),
            }
        );

        const reminderData = await reminderResponse.json();

        console.log("Reminder Status:", reminderResponse.status);
        console.log("Reminder Response:", reminderData);
    }

    if (goalResponse.ok) {
        alert("Event(s) created successfully!");
    } else {
        alert("Failed to create event.");
    }
}