import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    try {
      const res = await fetch(`http://localhost:5000/search?q=${input}`);
      const data = await res.json();

      console.log('Backend response:', data); // 🔍 Debug line

      const reply =
        data.length > 0
          ? data.map(d => `${d[1]} - ₹${d[3]}`).join('\n')
          : 'No results found.';

      setMessages([...newMessages, { sender: 'bot', text: reply }]);
    } catch (error) {
      console.error('Fetch error:', error);
      setMessages([...newMessages, { sender: 'bot', text: 'Oops! Something went wrong.' }]);
    }

    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white shadow rounded-xl p-4">
        <h1 className="text-xl font-bold mb-4 text-center">🛍️ E-Commerce Chatbot</h1>
        <div className="h-96 overflow-y-scroll mb-4 border p-2 rounded">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`my-2 p-2 rounded-md max-w-xs ${
                msg.sender === 'user'
                  ? 'ml-auto bg-blue-100 text-right'
                  : 'mr-auto bg-gray-200 text-left'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-grow border rounded px-3 py-2"
            placeholder="Ask me about products..."
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
