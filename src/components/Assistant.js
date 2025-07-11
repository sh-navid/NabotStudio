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

  const sendMessage = () => {
    if (input.trim() !== '') {
      // Add user message
      setMessages([...messages, { text: input, sender: 'user' }]);

      // Simulate bot response (replace with actual AI logic)
      setTimeout(() => {
        const botResponse = getBotResponse(input);
        setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
      }, 500); // Simulate a delay for the bot response

      setInput(''); // Clear the input
    }
  };

  const getBotResponse = (userMessage) => {
    // Replace with actual AI or predefined responses
    userMessage = userMessage.toLowerCase();
    if (userMessage.includes("hello") || userMessage.includes("hi")) {
      return "Hello! How can I help you today?";
    } else if (userMessage.includes("help")) {
      return "Sure, I can help you with code suggestions, debugging, and general programming questions.";
    } else {
      return "I'm here to assist you with your coding needs.";
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
          placeholder="Type your message..."
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