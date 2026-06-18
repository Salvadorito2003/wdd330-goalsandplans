const CLIENT_ID = "386537200534-22slgkurv1ufrc8k53o6cp3ve5ei4f9j.apps.googleusercontent.com";

let tokenClient;
let accessToken = null;

export function initializeGoogleAuth() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: "https://www.googleapis.com/auth/calendar.events",
        callback: (response) => {
            accessToken = response.access_token;
            console.log("Connected to Google Calendar!");
        },
    });
}

export function signInGoogle() {
    tokenClient.requestAccessToken();
}

export function getAccessToken() {
    return accessToken;
}

async function sendEvent(event, token) {
    const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        }
    );

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", data);

    return response.ok;
}

export async function createCalendarEvent(goal) {
    console.log("createCalendarEvent called");

    const token = getAccessToken();

    if (!token) {
        alert("Please connect your Google Calendar first.");
        return;
    }

    // Evento de la meta final
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

    console.log("Creating GOAL event");
    const goalCreated = await sendEvent(goalEvent, token);

    // Evento de recordatorio
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

        console.log("Creating REMINDER event");
        await sendEvent(reminderEvent, token);
    }

    if (goalCreated) {
        alert("Event(s) created successfully!");
    } else {
        alert("Failed to create goal event.");
    }
}