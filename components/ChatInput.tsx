'use client';

import React, { useState } from 'react';
import { SendHorizonal } from 'lucide-react'; // Changed to SendHorizonal for the arrow icon
import { ChatInputProps } from '../interfaces';

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading = false }) => {
  const [message, setMessage] = useState<string>('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage(''); // Clear input after sending
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Send message on Enter key, but allow Shift+Enter for new line
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e); // Pass the event object
    }
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="relative w-full max-w-3xl mx-auto p-2 bg-white rounded-2xl shadow-xl border border-gray-200 flex items-end mb-4"
    >
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write a simple counter contract" // Custom placeholder
        rows={1} // Start with one row
        className="flex-grow resize-none overflow-y-auto px-4 py-2 text-base text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none rounded-lg"
        style={{ minHeight: '40px', maxHeight: '150px' }} // Min and max height for textarea
      />
      <button
        type="submit"
        disabled={!message.trim() || isLoading}
        className={`ml-2 p-3 rounded-full transition-colors duration-200
          ${message.trim() && !isLoading ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
        aria-label="Send message"
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <SendHorizonal size={20} />
        )}
      </button>
    </form>
  );
};

export default ChatInput;