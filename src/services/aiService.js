/* [[NabotStudio/src/services/aiService.js]] */
export const sendMessageToAI = async (message) => {
    const response = await fetch('http://localhost:4000/ai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
};
