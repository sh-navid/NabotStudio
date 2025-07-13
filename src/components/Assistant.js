import React, { useState, useRef, useEffect } from 'react';

function Assistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat messages when new messages are added
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() !== '') {
      // Add user message
      setMessages([...messages, { text: input, sender: 'user' }]);

      // Call the AI service on the server
      try {
        const response = await fetch('http://localhost:4000/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Extract the bot's response content
        const botResponse = data.choices[0].message.content;
        setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
      } catch (error) {
        console.error("Could not fetch AI response:", error);
        setMessages(prevMessages => [...prevMessages, { text: "Error fetching AI response.", sender: 'bot' }]);
      }

      setInput(''); // Clear the input
    }
  };


  return (
    <div className="chat-container">
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}-message`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your prompt..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Assistant;