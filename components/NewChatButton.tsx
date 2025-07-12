// components/NewChatButton.tsx
'use client';

import React from 'react';
import { Edit } from 'lucide-react';

interface NewChatButtonProps {
  onNewChat: () => void;
  isSidebarOpen: boolean; // To control text visibility
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ onNewChat, isSidebarOpen }) => {
  return (
    <button
      onClick={onNewChat}
      className={`flex items-center w-full p-3 my-2 rounded-lg transition-colors duration-200 shadow-md
                  ${isSidebarOpen ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white justify-center'}`}
      aria-label={isSidebarOpen ? "New chat" : "New chat"}
    >
      <Edit size={20} className={isSidebarOpen ? "mr-2" : ""} />
      {isSidebarOpen && <span className="font-semibold text-lg whitespace-nowrap">New chat</span>}
    </button>
  );
};

export default NewChatButton;