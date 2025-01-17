// Function to load messages from JSON
function loadMessages() {
    fetch('https://raw.githubusercontent.com/r3ge/OK/refs/heads/main/adevaruri.json')
        .then(response => response.json())
        .then(data => {
            const messages = data.messages;
            const messageContainer = document.querySelector('.latest-message .message-content');
            const dateContainer = document.querySelector('.latest-message .message-date');
            const calendarContainer = document.getElementById('calendar-container');

            if (messages.length > 0) {
                // Display the newest message
                const newestMessage = messages[messages.length - 1];
                messageContainer.textContent = newestMessage.content;
                dateContainer.textContent = `${new Date(newestMessage.date).toLocaleDateString()}`;

                // Add calendar buttons with the newest message first
                messages.reverse().forEach((message) => {
                    const calendarButton = document.createElement('button');
                    calendarButton.classList.add('calendar-button');
                    calendarButton.textContent = `Teoria zilei ${new Date(message.date).toLocaleDateString()}`;
                    calendarButton.onclick = function() {
                        messageContainer.textContent = message.content;
                        dateContainer.textContent = `${new Date(message.date).toLocaleDateString()}`;
                    };
                    calendarContainer.appendChild(calendarButton);
                });
            }
        })
        .catch(error => console.error('Error loading messages:', error));
}

// Load messages when the page is loaded
window.onload = loadMessages;
