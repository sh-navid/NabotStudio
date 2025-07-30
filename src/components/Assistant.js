/* [[NabotStudio/src/components/Assistant.js]] */
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAI } from '../services/aiService';

function Assistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() !== '') {
      const userMessage = { text: input, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput(''); // Clear the input

      try {
        const botResponse = await sendMessageToAI(input);
        setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
      } catch (error) {
        console.error("Could not fetch AI response:", error);
        setMessages(prevMessages => [...prevMessages, { text: "Error fetching AI response.", sender: 'bot' }]);
      }
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
              handleSendMessage();
            }
          }}
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Assistant;
