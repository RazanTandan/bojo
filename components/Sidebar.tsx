// components/Sidebar.tsx
'use client';

import React from 'react';
import { Menu, X } from 'lucide-react';
import ChatListItem from './ChatListItem';
import NewChatButton from './NewChatButton';
import { SidebarProps } from '../interfaces';

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
  chatHistory,
  onNewChat,
  onRenameChat,
  onDeleteChat,
  onSelectChat,
  activeChatId,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white shadow-xl flex flex-col p-4 z-40 sidebar
        ${isSidebarOpen ? 'w-64 md:w-72' : 'w-20'} sidebar-transition
        overflow-y-auto custom-scrollbar`} // Keep overflow-y-auto for actual scrollable content
    >
      {/* Sidebar Toggle Button (Always visible) */}
      <div className={`flex items-center ${isSidebarOpen ? 'justify-start' : 'justify-center'} mb-6`}>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {isSidebarOpen && (
          <h2 className="ml-4 text-2xl font-bold whitespace-nowrap">Chats</h2>
        )}
      </div>

      {/* New Chat Button (Always present, but size/text adapts) */}
      <NewChatButton onNewChat={onNewChat} isSidebarOpen={isSidebarOpen} />

      {/* Previous Chats List (Only visible when sidebar is open) */}
      {isSidebarOpen && (
        <div className="mt-6 flex-grow custom-scrollbar">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">
            Previous Chats
          </h3>
          <div className="space-y-2">
            {chatHistory.length > 0 ? (
              chatHistory.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === activeChatId}
                  onSelect={onSelectChat}
                  onRename={onRenameChat}
                  onDelete={onDeleteChat}
                  isSidebarOpen={isSidebarOpen} // Pass sidebar open state
                />
              ))
            ) : (
              <p className="text-gray-400 text-sm italic">No chats yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;